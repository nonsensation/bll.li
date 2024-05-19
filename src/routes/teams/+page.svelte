<div class="grid grid-cols-2 gap4">
    <div class="">
        {#await data}
            Loading dataDump...
        {:then data}
            DONE!
        {:catch error}
            <p>error loading dataDump: {error.message}</p>
        {/await}
    </div>
</div>

<script lang="ts">
    export let data;
</script>
