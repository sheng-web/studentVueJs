<template>
  <tr id="Student">
    <td>
        {{student.id}}
    </td>
    <td>
        {{student.name}}
    </td>
    <td>
        {{student.age}}
    </td>
    <td>
        {{student.gender}}
    </td>
    <td>
        {{student.nationality}}
    </td>
    <td>
        <button @click="$emit('modify-student',student.id)" class="btn btn-info btn-md">modify</button>
    </td>
    <td>
        <a class=' btn btn-warning btn-md' @click="$emit('del-student',student.id)">del</a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'Student',
  components:{

  },
  props:{
    student:Object
  }
}
</script>

<style>

</style>
