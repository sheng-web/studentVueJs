<template>
  <div id="ModifyStudent">
    <div class="input-group py-3"  style="disabled">
      <div class="input-group-prepend">
        <span class="input-group-text col-sm-12" id="inputGroup-sizing-id">id</span>
      </div>
      <input id="id" v-model="student.id" type="text" style="pointer-events: none;" class="form-control" 
      aria-label="id" aria-describedby="inputGroup-sizing-id">
      <div class="col-sm-3">     
      </div>
    </div>

    <div class="input-group py-3">
      <div class="input-group-prepend">
        <span class="input-group-text col-sm-12" id="inputGroup-sizing-name">name</span>
      </div>
      <input id="name" v-model="student.name" type="text" class="form-control" aria-label="name" v-bind:class="{inputError:isNameError}"
      aria-describedby="inputGroup-sizing-name" v-on:blur="nameInputOnblur()">
      <div class="col-sm-3">
        <small id="nameError" ref="nameError" v-bind:class="{nameError:!isNameError}"  class="text-danger">
          Please enter upper and lower case letters.
        </small>      
      </div>
    </div>

    <div class="input-group py-3">
      <div class="input-group-prepend">
        <span class="input-group-text col-sm-12" id="inputGroup-sizing-age">age</span>
      </div>
      <input id="age" v-model="student.age" type="text" class="form-control" aria-label="age" v-bind:class="{inputError:isIdError}"
      aria-describedby="inputGroup-sizing-age" v-on:blur="ageInputOnblur()">
      <div class="col-sm-3">
        <small id="idError" v-bind:class="{idError:!isIdError}" class="text-danger">
          Please enter 1-3 positive integers.
        </small>      
      </div>
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text col-sm-12" for="inputGroupSelect01">gender</label>
      </div>
      <select v-model="student.gender" class="custom-select">
        <option v-for="(gender,index) in genders" :key="index" v-bind:value="gender.value">
          {{gender.text}}
        </option>
      </select>
      <div class="col-sm-3">     
      </div>
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text col-sm-12" for="inputGroupSelect01">nationality</label>
      </div>
      <select v-model="student.nationality" class="custom-select">
        <option v-for="(nationality,index) in nationalitys" :key="index" v-bind:value="nationality.value">
          {{nationality.text}}
        </option>
      </select>
      <div class="col-sm-3">     
      </div>
    </div>

    <button id="addButton" class="btn btn-primary" v-on:click="modifyStudent()" 
    v-bind:disabled="(isNameError&&isIdError)||(!isNameError&&isIdError)||(isNameError&&!isIdError)" >modify</button>
    <transition name="fade">
      <loading v-if="isListStudentsErr"></loading>
    </transition>
  </div>

</template>
 
<script>
import Axios from 'axios';
import Loading from '@/components/loading';
import {mapGetters,mapActions} from "vuex";
export default {
  name: 'ModifyStudent',
  components:{
    Loading
  },
  computed: {...mapGetters(["student","isListStudentsErr"]),},
  data(){
      return{
          isLoading: false,
          isNameError:false,
          isIdError:false,
          // student:{},
          gender:'male',
          genders:[
            {text:'male',value:'male'},
            {text:'female',value:'female'}
          ],
          nationality:'China',
          nationalitys:[
            {text:'China',value:'China'},
            {text:'America',value:'America'},
            {text:'Japan',value:'Japan'},
            {text:'Russia',value:'Russiade'},
            {text:'Germany',value:'Germany'},
            {text:'England',value:'England'}
          ]
          }
  },
  methods:{
    ...mapActions(["findStudentById"]),
    modifyStudent(){
      this.isLoading = true;
      let modifyStudentVue = this;
      Axios.put('http://192.168.0.102:8080/updateStudent',this.student)
      .then(function (response) {
        console.log(response.data);
        modifyStudentVue.$router.push({
          path: `/ListStudents`,
        });
        modifyStudentVue.isLoading = false
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    nameInputOnblur(){
      let nameValue = this.student.name;
      let re = /[A-Za-z]/;
      if(!(re.test(nameValue))){
        this.isNameError=true;
        
      }else{
        this.isNameError=false;
      }
    },
    ageInputOnblur(){
      let ageValue = this.student.age;
      let re = /^\d{1,3}$/;
      if(!(re.test(ageValue))){
        this.isIdError=true;
      }else{
        this.isIdError=false;
      }
    }
  },
  mounted(){
    // this.isLoading = true;
    // let modifyStudentVue = this;
    // Axios.post('http://192.168.0.102:8080/findStudent',{
    // id:this.$route.params.id,
    // })
    // .then(
    // response => {
    //     this.student=response.data,
    //     modifyStudentVue.isLoading = false
    //     }
    // )
    // .catch(function (error) {
    // console.log(error);
    // })  
    let id = this.$route.params.id;
    this.findStudentById(id);
  },
  
}
</script>

<style>
  #ModifyStudent{
    width: 80%;
    height: 80px;
    top: 10px;
    margin: 0 auto;
    text-align: center;
  }
  .nameError{
  display: none;
  border: 2px dashed red;
  }
  .idError{
    display: none;
  }
  .inputError{
    border-style:solid;
    border-color: red;
    box-shadow: 0 0 15px red;
  }
</style>