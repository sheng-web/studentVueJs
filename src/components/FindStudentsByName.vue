<template>
  <div id="FindStudentsByName">
    <div class="input-group col-xs-3">
      <input type="text" class="form-control" v-model="studentName" placeholder="Name" aria-label="Recipient's username" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" id="findButton" @click="$emit('findstudentsbyname',studentName)">Find</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FindStudentsByName',
  components:{

  },
  data(){
      return{
           studentName:""
      }
  }
}
</script>