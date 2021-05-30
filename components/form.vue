<template>
  <div class="todo-header">
    <h1>todo</h1>
    <el-form ref="form" :model="form" :rules="rules" @submit.prevent.native>
      <el-form-item prop="todo">
        <el-input
          v-model="form.todo"
          placeholder="todo item"
          @keyup.native.enter="addTodo"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        todo: '',
      },
      rules: {
        todo: [{ min: 2 }, { required: true }],
      },
    }
  },
  methods: {
    addTodo() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const todo = {
            todo: this.form.todo,
          }
          this.$store.dispatch('addTodo', todo)
          this.form.todo = ''
        }
      })
    },
  },
}
</script>
