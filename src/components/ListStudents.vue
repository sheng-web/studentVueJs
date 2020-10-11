<template>
<div class="wrapper">
  <!-- <FindStudent v-on:findstudent="findStudent"></FindStudent> -->
  <div>
    <FindStudentsByName class="FindStudentsByName" v-on:findstudentsbyname="findStudentsByName"></FindStudentsByName>
  </div>
  <div class="table-responsive">
    <table id="StudentsTable" class="table">
      <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Nationality</th>
          <th>Modify</th>
          <th>Del</th>
      </tr>
      <Student v-bind:student="students[index]" v-for="(item,index) in students" :key="index" v-on:del-student="delStudent" 
      v-on:modify-student="modifyStudent"></Student>
    </table>
  </div>
  <div class="addButton">
    <button class="btn btn-primary" v-on:click="addbutton()">add</button>
  </div>
  <transition name="fade">
      <loading v-if="isListStudentsErr"></loading>
  </transition>
  <!-- <div v-for="todo in todos" :key="todo.id">{{todo.name}}</div> -->
</div>
</template>  
 
<script>
import Axios from 'axios';
import Student from "./Student";
// import FindStudent from "./FindStudent"
import FindStudentsByName from "./FindStudentsByName";
import Loading from '@/components/loading';
import {mapGetters,mapActions} from "vuex";
export default {
  name: 'ListStudents',
  components: {
    Student,
    // FindStudent,
    FindStudentsByName,
    Loading
  },
  data(){
    return {
      // students:[
      // ],
      isLoading: false
    };
  },
  computed: {...mapGetters(["students","isListStudentsErr"]),
  },
  methods:{
    ...mapActions(["listStudents","findStudentsByName"]),
    // listStudents(){
    //   this.isLoading = true;
    //   var studentsVue=this;
    //   Axios.get('http://192.168.0.102:8080/listStudents')
    //   .then(
    //     response => {this.students=response.data,
    //     studentsVue.isLoading = false},
    //     console.log("todos="+this.todos),
    //       /*function (response) {
    //         console.log(response)
    //         console.log(response.config.method)  
    //         this.things.push({id:112});
    //       }*/ 
    //     // response => (this.things=[...this.things,...response.data])
    //     /*response => (this.things= response.data.filter(
    //              el =>  el.name.indexOf('David')>-1   
    //     ) )*/
    //   )
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    // },
    delStudent(studentId){
      this.isLoading = true;
      var studentsVue=this;
      Axios.get('http://192.168.0.102:8080/deleteStudentByGetMethod/'+studentId,)
      .then(function (response) {
        // studentsVue.listStudents();
        studentsVue.listStudents();
        console.log(response.data);
        // studentsVue.isLoading = false;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    modifyStudent(studentId){
       this.$router.push({
          path: `/ModifyStudent/${studentId}`,
    })
    },
    addbutton(){
      this.$router.push({
          path: `/AddStudent`,
    })
    }
  },
  created(){
    // this.listStudents();
    this.listStudents();
  },
}
</script>

<style>
.wrapper{
  display: grid;
  align-items: center;
  justify-content: center;
}
.FindStudentsByName{
  margin: 10px auto;
}
#StudentsTable{
    border: 1px solid black;
    border-collapse: collapse;
    width: 800px;
    height: 80px;
    display: table;
    margin: 20px auto;
    padding: 10px;
    top: 300px;
}
.addButton{
  text-align: center;
}
th{
    border: 1px solid black;   
}
td{
    border: 1px solid black;
}
</style>
