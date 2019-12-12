<template>
  <v-card
    class="mx-auto"
  >
    <v-card-title>
      <div>
      <span class="title font-weight-light">Upload File</span>
      </div>
    </v-card-title>
  <v-file-input
  class="file-input"
    label="File input"
    ref="file"
    filled
    v-on:change="updateFile"
    prepend-icon="mdi-camera"
  ></v-file-input>

    <v-card-actions>

      <v-btn
        raised
        color="grey"
        v-on:click="upload"
      >
        Upload
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import axios from 'axios';
  import api from '../config.js';
  console.log(api);// eslint-disable-line no-console
  export default {
    name: 'upload',
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      file: '',
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
    methods: {
      upload: function(){
       let formData = new FormData();
        formData.append('file', this.file);
        this.$store.commit('setWaitingAction',true);
        axios.post( 'http://'+api.adr+':'+api.port+'/single-file',
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
      ).then((res)=>{
        console.log('SUCCESS!!'); // eslint-disable-line no-console
        console.log(res.data); // eslint-disable-line no-console
        this.$store.commit('setWaitingAction',false);
        this.$store.commit('setResultAction',res.data.output);
        this.$store.commit('setOPicAction',res.data.orig);
        this.$store.commit('setSPicAction',res.data.shrunk);
      })
      .catch(()=>{
        console.log('FAILURE!!'); // eslint-disable-line no-console
        this.$store.commit('setWaitingAction',false);
      });
      },
      updateFile: function(file){
        console.log(file);// eslint-disable-line no-console
        this.file = file;
      }
    }
  }
</script>
<style scoped>
.mx-auto{
  width: 30vw;
}
.file-input{
  text-align:center;
  width: 80%;
}
</style>