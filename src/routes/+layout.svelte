<style>
    .app {
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;

        color: var(--color-text);
        background-color: var(--color-bg-frame);
        background-color: gainsboro;
        /* padding: 1rem; */
    }

    main {
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
        /* max-height: 100vh; */

        background: var(--color-bg);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        /* margin: 1rem; */
        /* background: white url('http://assets.iceable.com/img/noise-transparent.png') repeat 0 0; */
    }
</style>

<div class="app">
    <main>
        <slot />
    </main>
</div>

<script>
    import './styles.css';
</script>
