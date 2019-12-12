<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link v-on:click="viewUpload">
          <v-list-item-action>
            <v-icon>mdi-upload</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Upload</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-on:click="viewDraw">
          <v-list-item-action>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Draw</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="results" link v-on:click="viewResult">
          <v-list-item-action>
            <v-icon>mdi-archive</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Results</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Digit Classifier</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="shrink" v-if="upload">
            <Upload v-if="!loading" />
            <div class="lds-dual-ring" v-if="loading" />
          </v-col>
          <v-col class="shrink" v-if="result">
            <Results />
          </v-col>
          <v-col class="shrink" v-if="draw">
            <Draw v-if="!loading" />
            <div class="lds-dual-ring" v-if="loading" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Upload from "./components/Upload.vue";
import Results from "./components/Results.vue";
import Draw from "./components/Draw.vue";

export default {
  name: "app",
  props: {
    source: String
  },
  components: {
    Upload,
    Results,
    Draw
  },
  data: () => ({
    drawer: null
  }),
  computed: {
    loading() {
      return this.$store.state.waiting;
    },
    results() {
      return this.$store.state.result;
    },
    result() {
      return this.$store.state.view_result;
    },
    draw() {
      return this.$store.state.view_draw;
    },
    upload() {
      return this.$store.state.view_upload;
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    viewUpload: function() {
      this.$store.commit("viewUpload");
    },
    viewResult: function() {
      this.$store.commit("viewResult");
    },
    viewDraw: function() {
      this.$store.commit("viewDraw");
    }
  }
};
</script>
<style>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>