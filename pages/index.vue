<template>
  <div class="todoLIst">
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <div class="todo-header">
          <h1>todo</h1>
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            @submit.prevent.native
          >
            <el-form-item prop="todo">
              <el-input
                v-model="form.todo"
                placeholder="todo item"
                @keyup.native.enter="addTodo"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="fiterTodo.length > 0" class="todo-body">
          <el-card>
            <ul class="todo">
              <li
                v-for="(item, index) in fiterTodo"
                :key="index"
                :class="{ completed: item.completed }"
                @click="chengeCheckBox(item.id)"
              >
                {{ item.value }}
                <el-button
                  type="danger"
                  circle
                  @click.stop="deleteTodo(index)"
                ></el-button>
              </li>
            </ul>
            <div class="footer">
              <div class="items-left">{{ fiterTodo.length }} items left</div>
              <div class="nav">
                <el-link type="primary" @click="filterTodo('all')">All</el-link>
                <el-link type="primary" @click="filterTodo('active')"
                  >Active</el-link
                >
                <el-link type="primary" @click="filterTodo('completed')"
                  >Completed</el-link
                >
              </div>
              <div class="clear">
                <el-link type="danger" @click="clearItems"
                  >Clear Completed</el-link
                >
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: 'all',

      form: {
        todo: '',
      },
      rules: {
        todo: [{ min: 2 }, { required: true }],
      },
    }
  },
  computed: {
    fiterTodo() {
      let list = []
      if (this.select === 'all') {
        list = this.$store.getters.getTodos
      }
      if (this.select === 'active') {
        list = this.$store.getters.getTodos.filter(
          (el) => el.completed === false
        )
      }
      if (this.select === 'completed') {
        list = this.$store.getters.getTodos.filter(
          (el) => el.completed === true
        )
      }
      return list
    },
  },
  methods: {
    filterTodo(param) {
      this.select = param
    },
    chengeCheckBox(item) {
      this.$store.dispatch('chengeCheckBox', item)
    },
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
    deleteTodo(id) {
      this.$store.dispatch('deleteTodo', id)
    },
    clearItems() {
      this.$store.dispatch('clearItems')
    },
  },
}
</script>

<style lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todo-header {
  h1 {
    font-size: 48px;
    color: rgb(29, 29, 29);
  }
}
.todo-body {
  margin-top: 30px;
  ul {
    padding: 0px;
    li {
      list-style-type: none;
    }
  }
  .todo {
    cursor: pointer;
    padding: 10px 0px;
    li {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.completed {
  text-decoration: line-through;
}
</style>
