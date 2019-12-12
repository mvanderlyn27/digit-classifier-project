<template>
  <v-card class="mx-auto">
    <v-card-title>
      <div>
        <span class="title font-weight-light">Draw a Digit</span>
      </div>
    </v-card-title>
    <div id="app">
      <canvas
        id="canvas"
        v-on:mousedown="handleMouseDown"
        v-on:mouseup="handleMouseUp"
        v-on:mousemove="handleMouseMove"
        width="400px"
        height="400px"
      ></canvas>
    </div>

    <v-card-actions>
      <v-btn raised color="grey" v-on:click="upload">Upload</v-btn>
    <v-btn raised color="grey" v-on:click="clear">Clear</v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import api from "../config.js";
console.log(api); // eslint-disable-line no-console
export default {
  name: "draw",
  props: {
    source: String
  },
  data: function() {
    return {
      mouse: {
        current: {
          x: 0,
          y: 0
        },
        previous: {
          x: 0,
          y: 0
        },
        down: false
      }
    };
  },
  computed: {
    currentMouse: function() {
      var c = document.getElementById("canvas");
      var rect = c.getBoundingClientRect();

      return {
        x: this.mouse.current.x - rect.left,
        y: this.mouse.current.y - rect.top
      };
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    draw: function(event) {
      console.log(event); // eslint-disable-line no-console
      // requestAnimationFrame(this.draw);
      if (this.mouse.down) {
        var c = document.getElementById("canvas");

        var ctx = c.getContext("2d");

        ctx.clearRect(0, 0, 400, 400); 
        ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
        ctx.fillStyle = "white";

        ctx.strokeStyle = "#FF7F00";
        ctx.lineWidth = 30;
        ctx.stroke();
      }
    },
    handleMouseDown: function(event) {
      this.mouse.down = true;
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      };

      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");

      ctx.moveTo(this.currentMouse.x, this.currentMouse.y);
    },
    handleMouseUp: function() {
      this.mouse.down = false;
    },
    handleMouseMove: function(event) {
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      };

      this.draw(event);
    },
    clear: function(){
        var canvas = document.getElementById("canvas");

        const context = canvas.getContext('2d');
        context.beginPath();
        context.clearRect(0, 0, canvas.width, canvas.height);
    },
    upload: function() {
      var canvas = document.getElementById("canvas");
      var dataURL = canvas.toDataURL("image/png");
      console.log("test", dataURL); // eslint-disable-line no-console
      let formData = new FormData();
      formData.append("file", this.dataURItoBlob(dataURL));
      this.$store.commit("setWaitingAction", true);
      axios
        .post("http://" + api.adr + ":" + api.port + "/single-file-drawn", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log("SUCCESS!!"); // eslint-disable-line no-console
          console.log(res.data); // eslint-disable-line no-console
          this.$store.commit("setWaitingAction", false);

          this.$store.commit("setOPicAction", res.data.orig);
          this.$store.commit("setSPicAction", res.data.shrunk);
            this.$store.commit("setResultAndView", res.data.output);

        })
        .catch(() => {
          console.log("FAILURE!!"); // eslint-disable-line no-console
          this.$store.commit("setWaitingAction", false);
        });
    },
    dataURItoBlob: function(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(",")[1]);

      // separate out the mime component
      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      //Old Code
      //write the ArrayBuffer to a blob, and you're done
      //var bb = new BlobBuilder();
      //bb.append(ab);
      //return bb.getBlob(mimeString);

      //New Code
      return new Blob([ab], { type: mimeString });
    }
  },
  ready: function() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.translate(0.5, 0.5);
    ctx.imageSmoothingEnabled = false;
    // this.draw();
  }
};
</script>
<style scoped>
.mx-auto {
  width: 100%;
}
.file-input {
  text-align: center;
  width: 80%;
}
</style>