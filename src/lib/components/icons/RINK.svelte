<style>
    svg {
        --rink: var(--color-primary, transparent);
        --rink-opacity: 100%;
        --rink-line: var(--color-text, black);
        --rink-line-width: 1.5;
        --rink-goal: transparent;
    }
</style>

<svg class="w-full h-auto py-4" width="720" height="410" viewBox="0 0 720 410">
    <g transform="translate(-20,-260)">
        <!-- Field -->
        <rect
            width="710"
            height="360"
            x="23"
            y="284"
            ry="50"
            fill="var(--rink,transparent)"
            stroke="var(--rink-line,black)"
            stroke-width="var(--rink-line-width,2)"
            fill-opacity="var(--rink-opacity, 100%)"
        />
        <!-- Left Goal -->
        <rect
            width="73"
            height="95"
            x="71"
            y="415"
            stroke="var(--rink-line,black)"
            stroke-width="var(--rink-line-width,2)"
            fill="var(--rink-goal,transparent)"
        />
        <rect
            width="16"
            height="45"
            x="88"
            y="443"
            stroke="var(--rink-line,black)"
            stroke-width="var(--rink-line-width,2)"
            fill="var(--rink-goal,transparent)"
        />
        <!-- Right Goal -->
        <rect
            width="73"
            height="95"
            x="-687"
            y="415"
            transform="scale(-1,1)"
            stroke="var(--rink-line,black)"
            stroke-width="var(--rink-line-width,2)"
            fill="var(--rink-goal,transparent)"
        />
        <rect
            width="16"
            height="45"
            x="-669"
            y="443"
            transform="scale(-1,1)"
            stroke="var(--rink-line,black)"
            stroke-width="var(--rink-line-width,2)"
            fill="var(--rink-goal,transparent)"
        />
        <!-- center line -->
        <path d="M 370,285 L 370,645" stroke="var(--rink-line,black)" stroke-width="var(--rink-line-width,2)" />
        <!-- center bully -->
        <path d="M 365,465 L 375,465" stroke="var(--rink-line,black)" stroke-width="var(--rink-line-width,2)" />
        <!-- top middle bully -->
        <path d="M 365,335 L 375,335" stroke="var(--rink-line,black)" stroke-width="var(--rink-line-width,2)" />
        <!-- bottom middle bully -->
        <path d="M 365,605 L 375,605" stroke="var(--rink-line,black)" stroke-width="var(--rink-line-width,2)" />
        <!-- bottom left bully -->
        <path d="M 80,605 L 90,605" stroke="var(--rink-line,black)" stroke-width="var(--rink-line-width,2)" />
        <path d="M 85,600 L 85,610" stroke="var(--rink-line,black)" stroke-width="var(--rink-line-width,2)" />
        <!-- top left bully -->
        <path d="M 80,335 L 90,335" stroke="var(--rink-line,black)" stroke-width="var(--rink-line-width,2)" />
        <path d="M 85,330 L 85,340" stroke="var(--rink-line,black)" stroke-width="var(--rink-line-width,2)" />
        <!-- top right bully -->
        <path d="M 665,335 L 675,335" stroke="var(--rink-line,black)" stroke-width="var(--rink-line-width,2)" />
        <path d="M 670,330 L 670,340" stroke="var(--rink-line,black)" stroke-width="var(--rink-line-width,2)" />
        <!-- bottom right bully -->
        <path d="M 665,605 L 675,605" stroke="var(--rink-line,black)" stroke-width="var(--rink-line-width,2)" />
        <path d="M 670,600 L 670,610" stroke="var(--rink-line,black)" stroke-width="var(--rink-line-width,2)" />
    </g>
</svg>

<script lang="ts">
</script>
