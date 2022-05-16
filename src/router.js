import { createRouter, createWebHistory} from 'vue-router';
import SignUp from './components/SignUp.vue';
import  DisplayPage  from './components/DisplayPage.vue';
import NotFound from './components/NotFound.vue';

 const  router = createRouter({
     history: createWebHistory(),

     routes: [  
         {path: '/', redirect:'/signup'},
         {path: '/signup', component:SignUp },
         {path: '/display', component:DisplayPage},
         {path: '/:notfound(.*)', component: NotFound}
      ]
 })

 export default router ;
