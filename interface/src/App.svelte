<script>
  import Worknormal from "./worknormal.svelte";
  import Remind from "./remind.svelte";
  import Scheduledisplay from "./scheduledisplay.svelte";
  import WorkCalendar from "./workcalendar.svelte";

  import { subjectHighlight , worksSort } from "./store";


  const hostname = "http://www.hekpro.com" //window.location.host;
  const className = window.location.pathname.split('/')[2];
  console.log(hostname)

  let works = [] , schedules = [] , remind = "" , title = "" , switchDisplayWork = true;


  const createWorkSort = (works) => {
    const worksSort = new Map();

    works.forEach((/** @type {{ time_limit: string; subject: string; baseWork: string; range: string; WorkOrExam: boolean; }} */ work) => {

      const millionSecondTime = new Date(work.time_limit);

      $subjectHighlight[work.subject] = false;

      let sortTime = worksSort.get(millionSecondTime.getTime());
      if (sortTime){
          sortTime.child.push({
              subject:work.subject,
              baseWork:work.baseWork,
              range:work.range,
              WorkOrExam:work.WorkOrExam,
          })
      }
      else {
          const year = millionSecondTime.getFullYear();
          const day = millionSecondTime.getDay();
          const month = millionSecondTime.getMonth();
          const date = millionSecondTime.getDate();

          worksSort.set(millionSecondTime.getTime() , {
              dateDisplay: {
                  year:year,
                  day:day,
                  month:month,
                  date:date
              },
              child:[
                  {
                      subject:work.subject,
                      baseWork:work.baseWork,
                      range:work.range,
                      WorkOrExam:work.WorkOrExam,
                  },
              ]
          })
      }
      });

      return worksSort;
  }

  

  const fetchData = () =>{ 
    fetch(`${hostname}/api/interface/${className}/` , {
        method:"GET",
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      works = data.works;
      worksSort.set(createWorkSort(works));


      schedules = data.schedules;
      remind = data.remind;
      title = data.title;
    })
  }

  fetchData();




</script>
<header class="border-gray-400 border-b-2 mx-10">
  <button on:click={fetchData} class="text-violet-600 font-bold block mx-auto my-4 px-2 border-2 border-violet-600 w-fit rounded-xl whitespace-nowrap">
    <h1>W</h1><h1>ork</h1>
    <h1>T</h1><h1>o</h1>
    <h1>F</h1><h1>ollow</h1>
  </button>

</header>

<Remind {remind}/>

<div class="text-center h-8">
    <button on:click={() => switchDisplayWork = !switchDisplayWork} class="text-blue-600">
      {#if switchDisplayWork === false}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
      {:else}
      <svg fill="none" class="w-5 h-5" stroke="currentColor" viewBox="0 -2.5 29 29" xmlns="http://www.w3.org/2000/svg"><path d="m1.334 2.666h26.665c.011 0 .024.001.037.001.737 0 1.334-.597 1.334-1.334s-.597-1.334-1.334-1.334c-.013 0-.026 0-.039.001h.002-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002z"/><path d="m1.334 7.999h19.555c.011 0 .024.001.037.001.737 0 1.334-.597 1.334-1.334s-.597-1.334-1.334-1.334c-.013 0-.026 0-.039.001h.002-19.555c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002z"/><path d="m27.999 10.667h-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002 26.665c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333z"/><path d="m27.999 21.333h-26.665c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333h.002 26.665c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333z"/><path d="m1.334 18.666h19.555c.72-.021 1.296-.61 1.296-1.333s-.576-1.312-1.294-1.333h-.002-19.555c-.72.021-1.296.61-1.296 1.333s.576 1.312 1.294 1.333z"/></svg>
      {/if}
    </button>
</div>

{#if switchDisplayWork}
<Worknormal/>
{:else}
<WorkCalendar/>
{/if}
<Scheduledisplay {schedules} />




<style>
  h1{
    display: inline;
  }
</style>

