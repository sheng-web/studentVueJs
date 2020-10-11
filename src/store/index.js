import Vuex from 'vuex';
import Vue from 'vue';
import students from './modules/students';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules:{
        students
    }
});