import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            obj: {}
        }
    },
    mutations: {
        mutDemo(state, payload) {
            state.obj = payload;
            state.userName = payload.userName;
            state.email = payload.email;
        }
    },
    actions: {
        async demo(context, payload) {
            console.log(payload);
            context.commit('mutDemo', payload);
            localStorage.setItem("userName", payload.userName);
            localStorage.setItem("email", payload.email);

            const result = await fetch(`https://practice-store-c7c90-default-rtdb.firebaseio.com/data.json`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    payload,
                ),
            });
            console.log(result);
        }
    },
    getters: {
        test(state) {
            return state.obj;
        }
    }

})

export default store;