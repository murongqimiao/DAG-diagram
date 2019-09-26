import Vue from 'vue';
import Vuex from 'vuex';
import dagStore from './modules/dagStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    dagStore
  }
});

export default store;
