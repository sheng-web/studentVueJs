<template>
  <div id="FindStudent">
    <input id="id" type="text" v-model="studentIdTest" placeholder="Id" autocomplete="off">
    <button id="findButton" @click="$emit('findstudent',studentIdTest)">find</button>
  </div>
</template>

<script>
export default {
  name: 'FindStudent',
  components:{

  },
  data(){
      return{
           studentIdTest:""
      }
  }
}
</script>