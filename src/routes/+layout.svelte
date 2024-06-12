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

<div class="layout relative grid h-full min-h-screen w-full justify-stretch gap-2 bg-sf text-txt">
    <header class="flex w-full justify-center border-b-2 border-prim">
        <div class="flex w-full max-w-screen-xl flex-col items-center px-[5%] md:grid md:grid-cols-3">
            <DarkMode class="hidden md:block" />
            <a class="flex justify-center" href="/">
                <img src="/favicon.png" class="m-2 h-12 md:h-24" alt="Logo" />
            </a>
            <div class="flex gap-4 pb-2 *:font-bold hover:*:text-prim md:justify-end md:pb-0">
                <DarkMode class="w-6 md:hidden" />
                <div class=""><a class="" href="/sm/stats/scorer" title="Scorer"><Icon icon="STATS" /></a></div>
                <div class=""><a class="" href="/" title="Start">Start</a></div>
                <div class=""><a class="" href="/wiki" title="Wiki">Wiki</a></div>
                <div class=""><a class="" href="/info" title="Info">Info</a></div>
            </div>
        </div>
    </header>

    <main class="flex w-full justify-center">
        <div class="flex w-full max-w-screen-xl flex-col gap-2 px-[5%]">
            <div class="page-header">
                <BreadNav />
            </div>
            <div class="page-content w-full flex-grow">
                <slot />
            </div>
            <div class="page-footer">
                <BreadNav />
            </div>
        </div>
    </main>

    <div
        class:hidden={cookieConsent}
        class="cookie fixed bottom-0 flex hidden w-full justify-center bg-prim p-4 text-center"
    >
        <div class="flex max-w-screen-xl justify-between gap-4 px-[5%]">
            <span class="text-sm">
                Diese Webseite nutzt Cookies, eingebettete Inhalte und externe Dienste zur Darstellung. Genauere
                Informationen sind unter <a href="/datenschutz" class="text-txt underline">Datenschutz</a> zu finden.
            </span>
            <button class="rounded border bg-sf2 px-2 py-1" on:click={setCookieConsent}>OK</button>
        </div>
    </div>

    <footer class="border-t-2 border-prim">
        <div class="flex max-w-screen-xl flex-wrap justify-around gap-4 px-[5%] py-4">
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
