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
    result: null,
    orig_pic: null,
    shrunk_pic:null,
  },
  mutations:{
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
