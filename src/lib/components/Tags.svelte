{#if tags}
    <div class="flex tags flex-wrap m-4 text-center gap-2 justify-center text-[75%]">
        {#each tags as tag}
            {#if tag != null}
                <a
                    href="/wiki/tags/{tag}"
                    class="category rounded border-sf2 px-1 pt-[0.2rem] pb-[0.1rem] leading-4 border hover:bg-transparent hover:no-underline hover:border-prim hover:shadow"
                >
                    <div class="dark">&num;{tag}</div>
                </a>
            {/if}
        {/each}
    </div>
{/if}

<script lang="ts">
    export let tags: string[];
</script>
