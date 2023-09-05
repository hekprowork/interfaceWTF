<script>
    export let remind;
</script>
    <div class="mx-10 my-4 bg-white p-5 rounded-lg">
        <h2 class="text-gray-500 text-center text-2xl font-bold">提醒項目</h2>
        <div class="mx-20 my-4 text-red-600">
        {#if remind}
        <pre class="text-center">{remind}</pre>
        {:else}
        <p class="text-center">無提醒</p>
        {/if}
        </div>

    </div>