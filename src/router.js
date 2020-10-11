import Vue from 'vue'
import Router from 'vue-router'
 
//组件模块
import AddStudent from './components/AddStudent'
import ListStudents from './components/ListStudents'
import ModifyStudent from './components/ModifyStudent'
import Navbar from './components/Navbar'

 
Vue.use(Router)
 
export default new Router({
  routes: [
    {path:'/AddStudent',component:AddStudent},
    {path:'/ListStudents',component:ListStudents},
    {path:'/',component:ListStudents},
    {path:'/ModifyStudent/:id',component:ModifyStudent},
    {path:'/Navbar',component:Navbar},
    ]
})