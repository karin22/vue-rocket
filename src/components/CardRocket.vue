<template>
    <vs-row vs-justify="center">
     <div vs-type="flex" vs-justify="center" vs-align="center" vs-w="6" class="sesion-card" @click="popupActivo=true">
    <vs-card class="card-rocket">
     <vs-row vs-type="flex" vs-justify="space-between">
        <div class="position">
           <img class="img" :src="data.links.patch.small">
        <h3>
             {{ data.name }}
        </h3>
        </div>
        <div class="position">
            <div class="crews" v-if="data.crew.length!==0"> <span>{{data.crew.length}}crews</span> </div>
           <span class="date"> {{ data.date_local | moment }}</span> 
           <span class="status"  v-if="data.upcoming==true"> Upcoming</span> 
        </div>
       </vs-row>
  
    </vs-card>
  </div>
   <div class="centerx">
    <vs-popup class="holamundo"  title=Rocket :active.sync="popupActivo">
    <div class="popup-set">
    <div  class="popup-header">
      <h2>
       {{ data.name }}

      </h2>
      <span>
        {{ data.date_local | moment }}
      </span>
      </div>
      <hr  v-if="data.crew.length!==0">
      <div class="crews-set">
          <div class="position">
       <div class="crews crews-popup" v-if="data.crew.length!==0"> <span>Crews</span> </div>
       </div>
       <div class="position">
       <div class="crows-profile"  v-for="(item , index) in crews" :key="`item-${index}`">
           
           <img class="img" :src="item.image" alt="" height="40" width="40">
           <span>{{item.name}}</span>
           
       </div>
       </div>
      </div>
       <hr v-if="data.rocket!==''">
       <div class="crews-set">
        <div class="position">
       <div class="crews crews-popup" v-if="data.rocket!==''"> <span>Rocket</span></div>
         </div>
        <div class="crows-profile">
        
           <h4>{{rocketname.name}}</h4> 
            <div v-for="(img , index) in rocketname.flickr_images" :key="`img-${index}`" >
            <img  :src="img" alt="" height="200" width="200">
            </div>
       </div>
      </div> 
    </div> 
    </vs-popup>
  </div>
</vs-row>
</template>

<script>

import moment from "moment";
export default {
    name:'CardRocket',
    props :{
        data :{
            type : [Array ,Object] , 
            default : ()=>{}
        }
    },
    data:()=>({  
        popupActivo:false,
        crews : [],
        rocketname :{}
        }),
    mounted(){
        if (this.data.crew.length!==0) {
         for (const key in this.data.crew) {
        this.axios.get(`https://api.spacexdata.com/v4/crew/${this.data.crew[key]}`).then((response) => {   
         this.crews.push(response.data)
                })
             }
        }
        if (this.data.rocket!=='') {
        this.axios.get(`https://api.spacexdata.com/v4/rockets/${this.data.rocket}`).then((response) => {   
        this.rocketname = response.data
                }) 
        }
    },
     filters: {
    moment(date) {
      return moment(date)
        .format("ddd ll")
        .replace(",", "");
    },
  },
}
</script>

<style>
.crows-profile{
    display: grid;
}
.img{
    border-radius: 50%;
}
.popup-header{
    padding: 10px;
}
.crews-popup{
    width: 70px;
}
.sesion-card{
    width: 100%;
    max-width: 780px;
    cursor: pointer;
}
.popup-set{
    text-align: center;
}
.crews-set{
    display: inline-block;
    justify-content: center;
     padding: 10px;
}
.img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 10px;
}
.position {
    display: flex;
    align-items: center;
     justify-content: center;
}
.vs-card--content{
    width: 100% !important;
}
.card-rocket{
    display: flex !important;
    justify-content: space-between !important;
}
.date , .status{
    margin-right: 10px;
}
.status{
    color: blue;
}
.crews{
    margin-right: 20px;
    padding: 10px;
    background-color: blue;
    color: white;
    border-radius: 20px;
}
</style>