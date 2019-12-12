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
  import axios from 'axios'
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
        axios.post( 'http:/localhost:3000/single-file',
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
      ).then(function(){
        console.log('SUCCESS!!'); // eslint-disable-line no-console
      })
      .catch(function(){
        console.log('FAILURE!!'); // eslint-disable-line no-console
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