<template>
  <v-card
    class="mx-auto"
  >
    <v-card-title>
      <div>
      <span class="title font-weight-light">Classifier Results:</span>
       <h1>{{result}}</h1>
      </div>
    </v-card-title>
  

     <v-container fluid>
      <v-row dense>
        <v-col>
          <v-card>
            <v-img
              :src="oimg"
              class="white--text align-end"
             max-width="400px"
              height="auto"
            >
              <v-card-title >Original Image</v-card-title>
            </v-img>
            </v-card>
        </v-col>
             <v-col>
          <v-card>
            <v-img
              :src="simg"
              class="white--text align-end"
              max-width="450px"
              height="auto"
            >
              <v-card-title >Processed Image</v-card-title>
            </v-img>
                        </v-card>

             </v-col>
             </v-row>
     </v-container>
  </v-card>
</template>

<script>
import api from '../config.js';  export default {
    name: 'results',
    props: {
      source: String,
    },
    data: () => ({
       
    }),
    computed: {
        result() {
            return this.$store.state.result
        },
        oimg() {
            return 'http://'+api.adr+':'+api.port+'/'+this.$store.state.orig_pic
        },
        simg(){
            return 'http://'+api.adr+':'+api.port+'/'+this.$store.state.shrunk_pic
        }
    },
    created () {
      this.$vuetify.theme.dark = true
    },
    methods: {
    
    }
  }
</script>
<style scoped>
.mx-auto{
  width: 60vw;
}
.file-input{
  text-align:center;
  width: 80%;
}
</style>