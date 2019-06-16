import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        recipes: [],
        apiUrl: 'https://api.edamam.com/search'
    },
    mutations: {
        setRecipes(state, payload) {
            state.recipes = payload
        },
    },
    actions: {
        async getRecipes({
            state, commit
        }, plan) {
            try {
                let response = await axios.get(`${state.apiUrl}`, {
                    params: {
                        q: plan,
                        app_id: '7526a0f3',
                        app_key: '51faaa9f5954a19906f80b37f77a348e',
                        from: 0,
                        to: 9
                    }
                })
                commit('setRecipes', response.data.hits)
            } catch (error) {
                commit('setRecipes', [])
            }
        }
    }
});

