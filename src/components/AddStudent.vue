<template>
  <div id="AddStudent">
    <div class="input-group py-3">
      <div class="input-group-prepend">
        <span class="input-group-text col-sm-12" id="inputGroup-sizing-name">name</span>
      </div>
      <input id="name" ref="nameValue" type="text" class="form-control" v-bind:class="{inputError:isNameError}" aria-label="name" 
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
      <input id="age" ref="ageValue" type="text" class="form-control" v-bind:class="{inputError:isIdError}" aria-label="age" 
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
      <select v-model="gender" class="custom-select">
        <option v-for="(gender,index) in genders" :key="index" v-bind:value="gender.value">
          {{gender.text}}
        </option>
      </select>
      <div class="col-sm-3">     
      </div>
    </div>

    <!-- <input id="nationality" type="text" ref="nationalityValue" placeholder="Nationality" autocomplete="off"> -->

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text col-sm-12" for="inputGroupSelect01">nationality</label>
      </div>
      <select v-model="nationality" class="custom-select">
        <option v-for="(nationality,index) in nationalitys" :key="index" v-bind:value="nationality.value">
          {{nationality.text}}
        </option>
      </select>
      <div class="col-sm-3">     
      </div>
    </div>

    <button id="addButton" class="btn btn-primary" 
    v-bind:disabled="(isNameError&&isIdError)||(!isNameError&&isIdError)||(isNameError&&!isIdError)"
    v-bind:isLoading="true" v-on:click="addStudent()">add</button>

    <transition name="fade">
      <loading v-if="isLoading"></loading>
    </transition>
  </div>
</template>

<script>
import Axios from 'axios'
import Loading from '@/components/loading' 
export default {
  name:'AddStudent',
  components: { 
    Loading
  },
  data () {
    return{
      isLoading: false,
      isNameError:false,
      isIdError:false,
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
    addStudent(){
      let addStudentVue = this;
      Axios.post('http://192.168.0.102:8080/addStudent',{
        id:Math.random().toFixed(6).slice(-6),
        name:this.$refs.nameValue.value,
        age:this.$refs.ageValue.value,
        gender:this.gender,
        nationality:this.nationality
      })
      .then(function (response) {
        console.log(response.data);
        addStudentVue.$router.push({
          path: `/ListStudents`,
        });
        addStudentVue.isLoading = false;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    nameInputOnblur(){
      let nameValue = this.$refs.nameValue.value;
      let re = /[A-Za-z]/;
      if(!(re.test(nameValue))){
        this.isNameError=true;
        
      }else{
        this.isNameError=false;
      }
    },
    ageInputOnblur(){
      let ageValue = this.$refs.ageValue.value;
      let re = /^1?\d\d?$/;
      if(!(re.test(ageValue))){
        this.isIdError=true;
      }else{
        this.isIdError=false;
      }
    }
  },
  mounted(){
    
  }
}
</script>

<style>
#AddStudent{
  width: 80%;
  height: 8em;
  top: 1em;
  margin: 0 auto;
  text-align: center;
}
.input-group-prepend{
  padding: 0;
  margin: 0;
  width: 10em;
  
}
.nameError{
  display: none;
}
.idError{
  display: none;
}
.inputError{
  border-style:solid;
  border-color: red;
	box-shadow: 0 0 15em red;
}

</style>
