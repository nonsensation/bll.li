<style lang="postcss">
</style>

<div class="flex grid-rows-3 flex-col content-stretch">
    <header class="row-auto w-full  bg-black text-white font-bold">
        <nav class="mx-auto flex flex-wrap items-center justify-between p-4 w-full">
            <ul class="flex flex-col sm:flex-row text-center w-full justify-between">
                <li class="grid gap-4 items-center">
                    <a
                        href="/"
                        title="Startseite"
                        class="text-white">
                        Startseite
                    </a>
                </li>

                {#each SeasonTeams as team}
                    <li class="grid gap-4 content-stretch items-center">
                        <a
                            href="/ons~{team.slug}"
                            title={team.name}
                            class="text-white">
                            {team.name}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
    </header>

    <main class="max-w-100 grid flex-grow justify-center p-3.5">
        <slot />
    </main>

    <footer class="row-auto"></footer>
</div>

<script lang="ts">
    import { SeasonTeams } from '$lib/config/TeamInfo';
    import './Tailwind.postcss';
    import './styles.css';
</script>
