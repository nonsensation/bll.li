<style lang="postcss">
pre {
    white-space: pre-wrap;
    word-break: break-all;
}
input,
option,
select {
    @apply rounded bg-sf;
}
</style>

<div class="flex flex-col">
    <div class="">
        <h1 class="text-center text-3xl font-bold">Wireless Data Mapper</h1>
        <div class="flex flex-wrap gap-4">
            <input
                bind:value="{ipAddress}"
                placeholder="IP Address"
            />
            <input
                bind:value="{port}"
                type="number"
                placeholder="Port"
            />
            <input
                bind:value="{password}"
                type="password"
                placeholder="Password"
            />
            <button
                on:click="{socket ? disconnect : connect}"
                class="rounded border border-sf2 bg-sf3 p-2"
            >
                {socket ? 'Disconnect' : 'Connect'}
            </button>
        </div>
    </div>
    <div class="flex flex-wrap gap-4 *:w-full">
        <div class="">
            <h3 class="">Status Messages</h3>
            <div
                class="flex h-[min(30vh,30rem)] flex-col overflow-y-auto rounded border odd:*:bg-sf3"
            >
                {#each statusMessages as message}
                    <div class="rounded border border-transparent px-2 py-1 hover:border-txt2">
                        {message}
                    </div>
                {/each}
            </div>
        </div>
        <div class="">
            <h3 class="">JSON Output</h3>
            <div class="flex h-[min(30vh,30rem)] flex-col gap-2 overflow-y-auto rounded border p-2">
                {#each jsonMessages as message}
                    <pre
                        class="border-txt3 m-0 whitespace-pre-wrap break-all border text-xs hover:border-txt2">{message}</pre>
                {/each}
            </div>
        </div>
    </div>
</div>

<div class="">{JSON.stringify($wsDeviceStore)}</div>
<div class="">{JSON.stringify($wsMappingStore)}</div>

<div class="flex flex-col gap-4">
    {#each $wsDeviceStore as model}
        <div class="flex flex-col gap-2">
            <div class="font-bold">{model.model}</div>
            <div class="flex flex-col">
                {#each model.fields as field}
                    <div class="">{field}</div>
                {/each}
            </div>
        </div>
    {/each}
</div>

<div class="">
    <div class="flex items-center justify-stretch gap-2 *:w-full">
        <select
            name=""
            id=""
            bind:value="{scoreBoardSelection}"
        >
            {#each scoreboardFields as field}
                <option value="{field}">{field}</option>
            {/each}
        </select>

        <div class="text-center">Data:</div>
        <select
            name=""
            id=""
            bind:value="{deviceModelSelection}"
        >
            {#each deviceModels as model}
                <option value="{model}">{model}</option>
            {/each}
        </select>

        <select
            name=""
            id=""
            bind:value="{deviceFieldSelection}"
        >
            {#each deviceFields as field}
                <option value="{field}">{field}</option>
            {/each}
        </select>
        <button on:click="{() => assignMapping()}">Zuweisen</button>
    </div>

    <div class="">
        {#each $wsMappingStore as mapping, idx}
            <div class="flex gap-2">
                <div class="flex gap-2">
                    <div class="">{mapping.scoreboardField}</div>
                    <div class="">{mapping.deviceModel}</div>
                    <div class="">{mapping.deviceField}</div>
                </div>
                <button on:click="{() => removeMapping(idx)}">X</button>
            </div>
        {/each}
    </div>
</div>

<button on:click="{() => clearAll()}">Clear Devices</button>


<script lang="ts">
import { onMount } from 'svelte';
import { wsDeviceStore, wsMappingStore } from '$lib/stores/wsStore';
import { Scoreboard } from '$lib/types';

let scoreBoardSelection = '';
let deviceModelSelection = '';
let deviceFieldSelection = '';

let socket: WebSocket | null = null;
let statusMessages: string[] = [];
let jsonMessages: string[] = [];
let ipAddress = 'localhost';
let port = '443';
let password = '';
let scoreboardFields = Object.keys(new Scoreboard());
$: deviceModels = Object.values($wsDeviceStore.map(x => x.model)) ?? [];
$: deviceFields = $wsDeviceStore.find(x => x.model === deviceModelSelection)?.fields ?? [];

function clearAll()
{
    $wsDeviceStore = []
    $wsMappingStore = []
    jsonMessages = []
}

function assignMapping() {
    if (!scoreBoardSelection || scoreBoardSelection.length < 1) return;
    if (!deviceModelSelection || deviceModelSelection.length < 1) return;
    if (!deviceFieldSelection || deviceFieldSelection.length < 1) return;

    const idx = $wsMappingStore.findIndex(x => x.scoreboardField === scoreBoardSelection);
    if (idx === -1) {
        const mapping = {
            scoreboardField: scoreBoardSelection,
            deviceModel: deviceModelSelection,
            deviceField: deviceFieldSelection,
        };
        $wsMappingStore.push(mapping);
    } else {
        $wsMappingStore[idx] = {
            scoreboardField: scoreBoardSelection,
            deviceModel: deviceModelSelection,
            deviceField: deviceFieldSelection,
        };
    }

    $wsMappingStore = $wsMappingStore; // to update in sv4
}

function removeMapping(idx) {
    $wsMappingStore = $wsMappingStore.filter((_, i) => i !== idx);
}

function appendStatusMessage(message: string) {
    statusMessages = [...statusMessages, message];
}

function appendJsonMessage(data: any) {
    jsonMessages = [JSON.stringify(data, null, 2), ...jsonMessages];
    if (jsonMessages.length > 50) {
        jsonMessages = jsonMessages.slice(-50);
    }
}

function connect() {
    const url = `ws://${ipAddress}:${port}`;

    socket = new WebSocket(url);

    socket.onopen = () => {
        appendStatusMessage('Connected to server');

        if (password) {
            socket?.send(JSON.stringify({ type: 'auth', password }));
        }
    };

    socket.onmessage = event => {
        try {
            const data = JSON.parse(event.data);
            appendJsonMessage(data);
            updateModels(data);
        } catch (error) {
            console.log(error);
            appendStatusMessage('Received non-JSON data: ' + event.data);
        }
    };

    socket.onclose = () => {
        appendStatusMessage('Disconnected from server');
    };

    socket.onerror = error => {
        appendStatusMessage('Error: ' + (error as ErrorEvent).message);
    };
}

function disconnect() {
    if (socket) {
        socket.close();
        socket = null;
    }
}

function updateModels(newModel: any) {
    const modelIndex = $wsDeviceStore.findIndex(item => item.model === newModel.model);

    if (modelIndex === -1) {
        const fields = Object.keys(newModel);
        $wsDeviceStore = [...$wsDeviceStore, { model: newModel.model, fields }];
    } else {
        const newFields = Object.keys(newModel);
        $wsDeviceStore[modelIndex].fields = [
            ...new Set([...$wsDeviceStore[modelIndex].fields, ...newFields]),
        ];
    }
}

onMount(() => {
    connect();

    return () => {
        if (socket) {
            socket.close();
        }
    };
});
</script>
