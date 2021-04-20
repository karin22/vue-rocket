<template>
  <div id="app">
    <vs-tabs alignment="center">
      <vs-tab label="All">
        <div v-for="(item , index) in data" :key="`item-${index}`">
           <CardRock :data='item' />
        </div>
      </vs-tab>
      <vs-tab label="Launched" @click="launched">
        <div v-for="(item , index) in Launched" :key="`item-${index}`">
           <CardRock :data='item'/>
        </div>
      </vs-tab>
      <vs-tab label="Upcoming" @click="upcoming">
        <div v-for="(item , index) in Upcoming" :key="`item-${index}`">
          <CardRock :data='item'/>
        </div>
      </vs-tab>
 
    </vs-tabs>
  </div>
</template>

<script>
import CardRock from './components/CardRocket' 
export default {
  name: 'App',
  components :{
    CardRock,
  },
  data:()=>({
    data:[],
    Launched:[],
    Upcoming:[]

  }),
  created(){
       this.$vs.loading({color:'#7d0c3f'})
  },
  methods:{
    launched(){
     this.axios.get(`https://api.spacexdata.com/v4/launches/past`).then((response) => {
        this.Launched = response.data
      })
    },
     upcoming(){
     this.axios.get(`https://api.spacexdata.com/v4/launches/upcoming`).then((response) => {
        this.Upcoming = response.data
      })
    }
  },
  mounted(){
  this.axios.get(`https://api.spacexdata.com/v4/launches`).then((response) => {
  if (response.data) {
     this.$vs.loading.close()
  }
   this.data = response.data
})

  },
}
</script>
