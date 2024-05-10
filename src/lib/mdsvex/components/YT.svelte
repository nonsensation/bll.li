<style lang="postcss">
    .video-container {

    }

    iframe {
    }

    button {
        background-image: var(--bg-img);
        background-size: cover;
        background-repeat: no-repeat;
        background-color: #00000088;
    }
</style>

<figure class="video-container w-full h-full relative aspect-video bg-sf2 flex rounded">
    <!-- <button
        on:click={(e) => e.target.classList.toggle('hidden')}
        class="w-full h-full z-10 hidden"
        style="--bg-img: url('https://i.ytimg.com/vi_webp/{id}/maxresdefault.webp')"
    >
        <div class="w-full bg-prim p-4">
            YouTube-Video Abspielen (und damit möglicherweise Daten an Google senden)
        </div>
    </button> -->
    <iframe
        class="w-full h-full absolute left-0 top-0 rounded"
        title=""
        src="https://www.youtube-nocookie.com/embed/{id}?rel=0;modestbranding=1"
        frameborder="0"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    >
    </iframe>
</figure>

<script lang="ts">
    export let id: string;
</script>
