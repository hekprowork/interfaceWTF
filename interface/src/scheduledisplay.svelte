<script>
    export let schedules;
    import { subjectHighlight , dateHighlight } from "./store";

    let dayHighlight = 0;

    $: {
        if (!$dateHighlight){
            dayHighlight = 0;
            break $;
        }

        console.log($dateHighlight);
        dayHighlight = new Date($dateHighlight).getDay();
    }
</script>

<div class="mx-10 bg-white rounded-lg pb-4">
    <h1 class="text-center text-2xl py-4">課表</h1>
    <table class="mx-auto">
        <tr>
            <th class="w-1/6"></th>
            <th class="{dayHighlight === 1 && "bg-orange-100"}">一</th>
            <th class="{dayHighlight === 2 && "bg-orange-100"}">二</th>
            <th class="{dayHighlight === 3 && "bg-orange-100"}">三</th>
            <th class="{dayHighlight === 4 && "bg-orange-100"}">四</th>
            <th class="{dayHighlight === 5 && "bg-orange-100"}">五</th>
        </tr>
        {#each Array(schedules.length / 5) as _ , row}
            <tr>
                <td>{row+1}</td>
                {#each Array(5) as _ , grid}

                    <td class="{$subjectHighlight[schedules[row*5+grid]] && "!bg-blue-100 text-blue-600"} {grid+1 === dayHighlight && "bg-orange-100"}">
                        <button on:click={() => $subjectHighlight[schedules[row*5+grid]] = !$subjectHighlight[schedules[row*5+grid]]}>{schedules[row*5+grid]}</button>
                    </td>
                {/each}
            </tr>
        {/each}
    </table>
</div>


<style>
    td , th {
        min-width:50px;
        min-height: 50px;
        padding:1em;
    }

    table , td , th {
        border: 1px dashed #ccc;
    }
</style>