<style>
    .layout {
        grid-template-rows:
            [primary-nav] auto
            [main] 1fr
            [footer] auto;

        /* grid-template-columns: [full-start] 5% [main-start] auto [main-end] 5% [full-end]; */
    }

    .page-content {
        flex: 1 1 0;
    }
</style>

<div class="relative layout grid gap-2 w-full h-full min-h-screen justify-stretch bg-sf text-txt">
    <header class="w-full flex justify-center border-b-2 border-prim">
        <div class="flex flex-col items-center md:grid md:grid-cols-3 w-full max-w-screen-xl px-[5%]">
            <DarkMode class="hidden md:block" />
            <a class="flex justify-center" href="/">
                <img src="/favicon.png" class="m-2 h-12 md:h-24" alt="Logo" />
            </a>
            <div class="gap-4 flex md:justify-end *:font-bold hover:*:text-prim pb-2 md:pb-0">
                <DarkMode class="md:hidden w-6" />
                <div class="list-none"><a class="" href="/">Start</a></div>
                <div class="list-none"><a class="" href="/wiki">Wiki</a></div>
                <div class="list-none"><a class="" href="/info">Info</a></div>
            </div>
        </div>
    </header>

    <main class="w-full flex justify-center">
        <div class="w-full max-w-screen-xl px-[5%] flex flex-col gap-2">
            <div class="page-header">
                <BreadNav />
            </div>
            <div class="page-content flex-grow w-full">
                <slot />
            </div>
            <div class="page-footer">
                <BreadNav />
            </div>
        </div>
    </main>

    <div
        class:hidden={cookieConsent}
        class="hidden fixed cookie w-full bg-prim p-4 text-center bottom-0 flex justify-center"
    >
        <div class="flex justify-between gap-4 max-w-screen-xl px-[5%]">
            <span class="text-sm">
                Diese Webseite nutzt Cookies, eingebettete Inhalte und externe Dienste zur Darstellung. Genauere
                Informationen sind unter <a href="/datenschutz" class="text-txt underline">Datenschutz</a> zu finden.
            </span>
            <button class="border rounded px-2 py-1 bg-sf2" on:click={setCookieConsent}>OK</button>
        </div>
    </div>

    <footer class="border-t-2 border-prim">
        <div class="flex max-w-screen-xl px-[5%] justify-around gap-4 py-4 flex-wrap">
            <a href="/info">Über die Webseite</a>
            <a href="/datenschutz">Datenschutz</a>
            <a href="/info#Kontakt">Kontakt</a>
            <a href="https://discord.gg/9UH8X2ssh3" target="_blank" class="flex"
                ><Icon icon="DISCORD" class="w-6" /><span>Discord</span></a
            >
        </div>
    </footer>
</div>

<script lang="ts">
    import '../app.postcss';
    import BreadNav from '$lib/components/BreadNav.svelte';
    import DarkMode from '$lib/components/DarkMode.svelte';
    import { onMount } from 'svelte';
    import Discord from '$lib/assets/icons/logos/DISCORD.svg';
    import Icon from '$lib/components/Icon.svelte';

    let cookieConsent = false;
    const cookieItemString = 'cookieConsent';

    function setCookieConsent() {
        cookieConsent = true;
        localStorage.setItem(cookieItemString, 'true');
    }

    onMount(() => {
        const value = localStorage.getItem(cookieItemString);
        cookieConsent = value != null && value === 'true';
    });
</script>
