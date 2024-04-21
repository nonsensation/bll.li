<style lang="postcss">

</style>

<div class="error h-full grid place-content-center">
    <h1>{$page.status}: {$page.error?.message}</h1>
</div>

<script>
    import { page } from '$app/stores';
</script>
