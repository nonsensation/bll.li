<style lang="postcss">
    :root {
        --card-height: 50vh;
        --timing: 0.3s;
    }

    .outer {
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
                transform: translate3d(0%, calc(var(--card-height) / -10), calc(var(--card-height) / 4));
            }

            .character {
                transform: translate3d(0%, -50%, calc(var(--card-height) / 4));
                opacity: 1;
            }
        }
    }
</style>

<div class="outer flex h-full w-full items-center justify-center">
    <div class="card relative flex h-full w-full items-end justify-center">
        <div
            class="wrapper absolute -z-10 h-[70%] w-full rounded after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded after:opacity-0"
        >
            <img src={imgPoster} class="poster h-full w-full rounded object-cover" alt="" />
        </div>
        <img src={imgPopup} class="character absolute -z-10 w-full opacity-0" alt="" />
        <a href="/" target="_blank" class="title w-full text-center text-[1.75rem] justify-center font-bold tracking-widest"
            >{name}</a
        >
    </div>
</div>

<script lang="ts">
    export let name: string;
    export let imgPoster: string;
    export let imgPopup: string;
    export let position: string;
</script>
