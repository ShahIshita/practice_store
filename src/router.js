import { createRouter, createWebHistory} from 'vue-router';
import SignUp from './components/SignUp.vue';
import SignIn from './components/SignIn.vue';
import  DisplayPage  from './components/DisplayPage.vue';
import NotFound from './components/NotFound.vue';
import store from './store.js';

 const  router = createRouter({
     history: createWebHistory(),

     routes: [  
         {path: '/', redirect:'/signup'},
         {path: '/signup', component:SignUp },
         {
            path: '/signin',
            component:SignIn,
            beforeEnter(_, _2, next){
                console.log(store.getters['isAuth'])
                if(store.getters['isAuth']){
                    next('/display');
                }
                else{
                    next();
                }
            }
        },
         {
            path: '/display',
            component:DisplayPage,
            beforeEnter(_, _2, next){
                console.log(store.getters['isAuth'])
                if(store.getters['isAuth']){
                    next();
                }
                else{
                    next('/signin');
                }
            }
        },
         {path: '/:notfound(.*)', component: NotFound}
      ]
 })

 export default router ;
