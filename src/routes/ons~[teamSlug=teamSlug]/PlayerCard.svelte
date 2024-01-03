<style lang="postcss">
    :root {
        --card-height: 50vh;
        --timing: 0.3s;
    }

    a {
        width: calc(var(--card-height) * (9 / 16));
        height: var(--card-height);
        aspect-ratio: 9 / 16;
    }

    .card {
        height: var(--card-height);

        perspective: 100rem;

        .title {
            color: white;
            font-size: clamp(1rem, calc(var(--card-height) / 15), 2rem);
            transition: transform var(--timing);
        }

        .character {
            transition: all var(--timing);
        }

        .wrapper {
            transition: all var(--timing);

            &::after {
                content: '';
                transition: all var(--timing);
                background-image: linear-gradient(to bottom, black 0%, transparent 20%, transparent 50%, black 100%);
            }
        }

        &:hover {
            .wrapper {
                transform: perspective(50rem) translateY(-5%) rotateX(20deg);
                box-shadow: 0 2rem 2rem -0.5rem rgba(0, 0, 0, 0.75);
                /* height: 80%; */

                &::after {
                    opacity: 1;
                }
            }

            .title {
                transform: translate3d(0%, -3rem, calc(var(--card-height) / 4 ));
            }

            .character {
                transform: translate3d(0%, -6rem, calc(var(--card-height) / 4 ));
                opacity: 1;
            }
        }
    }
</style>

<a href="/" target="_blank" class="flex h-full w-full items-center justify-center">
    <div class="card relative flex h-full w-full items-end justify-center">
        <div
            class="wrapper rounded absolute -z-10 w-full h-[70%] after:rounded after:absolute after:left-0 after:top-0 after:h-full after:w-full after:opacity-0"
        >
            <img src={imgPoster} class="poster rounded h-full w-full object-cover" alt="" />
        </div>
        <img src={imgPopup} class="character absolute -z-10 w-full opacity-0" alt="" />
        <div class="title w-full text-center text-[1.75rem] font-bold tracking-widest">{name}</div>
    </div>
</a>

<script lang="ts">
    export let name: string;
    export let imgPoster: string;
    export let imgPopup: string;
    export let position: string;
</script>
