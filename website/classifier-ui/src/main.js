import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(Vuex);
const store = new Vuex.Store({
  debug: true,
  state: {
    waiting: false,
    view_upload: true,
    view_draw: false,
    view_result: false,
    result: null,
    orig_pic: null,
    shrunk_pic:null,
  },
  mutations:{
    viewUpload(state){
      state.view_upload=true;
      state.view_draw =false;
      state.view_result=false;
    },
    viewDraw(state){
      state.view_upload=false;
      state.view_draw =true;
      state.view_result=false;
    },
    viewResult(state){
      state.view_upload=false;
      state.view_draw =false;
      state.view_result=true;
    },
   setWaitingAction (state,newValue) {
    if (this.debug) console.log('setWaitingAction triggered with', newValue)// eslint-disable-line no-console
    state.waiting = newValue
  },
   clearWaitingAction (state) {
    if (this.debug) console.log('clearWaitingAction triggered')// eslint-disable-line no-console
    state.waiting = null
  },
  setResultAction (state,newValue) {
    if (this.debug) console.log('setResultAction triggered with', newValue)// eslint-disable-line no-console
    state.result = newValue
  },
  setResultAndView(state,newValue){
    if (this.debug) console.log('setResultAction triggered with', newValue)// eslint-disable-line no-console
    state.result = newValue;
    state.view_upload=false;
      state.view_draw =false;
      state.view_result=true;
  },
  clearResultAction (state) {
    if (this.debug) console.log('clearResultAction triggered')// eslint-disable-line no-console
    state.result = null
  },
  setOPicAction (state,newValue) {
    if (this.debug) console.log('setOPicAction triggered with', newValue)// eslint-disable-line no-console
    state.orig_pic = newValue
  },
  clearOPicAction (state) {
    if (this.debug) console.log('clearOPicAction triggered')// eslint-disable-line no-console
    state.orig_pic = null
  },
  setSPicAction (state,newValue) {
    if (this.debug) console.log('setSPicAction triggered with', newValue)// eslint-disable-line no-console
    state.shrunk_pic = newValue
  },
  clearSPicAction (state) {
    if (this.debug) console.log('clearSPicAction triggered') // eslint-disable-line no-console
    state.shrunk_pic = null
  }
},
getters:{
  waiting: state=>state.waiting,
  result: state=>state.result,
  orig_pic: state=>state.orig_pic,
  shrunk_pic: state=>state.shrunk_pic
}
});

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
