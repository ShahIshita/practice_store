import { createStore } from 'vuex'
import router from './router.js';

const store = createStore({
    state() {
        return {
            token:'',
            userId: '',
            userObj: {},
        }
    },
    mutations: {
        mutDemo(state, payload) {
        
            state.token = payload.token;
            state.userId = payload.userId;
           state.userObj = payload.userObj;
        },
        userObjMut(state, payload){
            state.userObj = payload;
        },
        getLocalData(state){
            state.userId = localStorage.getItem('userId');
        }
    },
    actions: {
        async demo(_, payload) {
            console.log(payload);
            //context.commit('mutDemo', payload);
            // localStorage.setItem("userName", payload.userName);
            // localStorage.setItem("email", payload.email);
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASWW9cVAA2-q73qad4jxwR3j5PxcU1Q74`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    
                    {
                        email: payload.email,
                        password:payload.password,
                        returnSecureToken: true,
                    }
                ),
            });
            const responseData = await response.json();
            console.log(responseData);

            const result = await fetch(`https://practice-store-c7c90-default-rtdb.firebaseio.com/data/${responseData.localId}.json`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    
                    {
                        userName: payload.userName,
                        email: payload.email,
                    }
                ),
            });
            console.log(result);
        },
        async signinDemo(context, payload) {
            console.log(payload);
            //context.commit('mutDemo', payload);
            // localStorage.setItem("userName", payload.userName);
            // localStorage.setItem("email", payload.email);
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASWW9cVAA2-q73qad4jxwR3j5PxcU1Q74`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        email: payload.email,
                        password:payload.password,
                        returnSecureToken: true,
                    }
                ),
            });
            // console.log(response.json());
            const responseData = await response.json();
            console.log(responseData);
            localStorage.setItem('token',responseData.idToken );
            localStorage.setItem('userId',responseData.localId );
            
            context.commit('mutDemo', {
                token:responseData.idToken,
                userId:responseData.localId,
            })

            router.replace('/display');

            // context.dispatch('fetchData');
        },
        async fetchData(context){
            let userId = context.getters.userId;
            console.log(userId);
            const response2 = await fetch(`https://practice-store-c7c90-default-rtdb.firebaseio.com/data/${userId}.json`);
            const responsedata2 = await response2.json();
            console.log(responsedata2);
            let userObj = {};
            for(let userId in responsedata2 ){
                userObj = responsedata2[userId];
            }
            context.commit('userObjMut', userObj);
        },

    },

    getters: {
        token(state) {
            return state.token;
        },
        userId(state) {
            return state.userId;
        },
        userObj(state) {
            return state.userObj;
        },
        isAuth(state){
            if(state.userId){
                return true;
            }
            else{
                return false;
            }
        }
    }

})

export default store;