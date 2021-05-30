export const state = () => ({
  todos: [],
})
export const getters = {
  getTodos: (state) => state.todos,
}
export const mutations = {
  setTodoList(state, payload) {
    state.todos = payload
  },
  setTodo(state, { payload, data }) {
    state.todos.push({
      id: data.name,
      todoItem: payload.todo,
      todoCompleted: false,
    })
  },
  async chengeCheckBox(state, payload) {
    await state.todos.filter(async (elem) => {
      if (elem.id === payload) {
        const isFlug = (elem.todoCompleted = !elem.todoCompleted)

        await this.$axios.$put(
          `https://todo-vue-2393f.firebaseio.com/todo/${payload}/completed.json`,
          `${!isFlug}`,
          {
            headers: {
              'content-type': 'application/json',
            },
          }
        )
      }
      return elem
    })
  },

  async deleteTodo(state, payload) {
    const index = state.todos.findIndex((el) => el.id === payload.id)
    await state.todos.splice(index, 1)
    await this.$axios.$delete(
      `https://todo-vue-2393f.firebaseio.com/todo/${payload.id}.json`
    )
  },
  async clearItems(state) {
    await state.todos.forEach((element, index) => {
      if (element.todoCompleted) {
        state.todos.splice(index, 1)
      }
    })
  },
}
export const actions = {
  async getTodoList({ commit }) {
    try {
      const data = await this.$axios.$get(
        'https://todo-vue-2393f.firebaseio.com/todo.json',
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      const todoList = Object.keys(data).map((key) => {
        return {
          id: key,
          todoItem: data[key].value,
          todoCompleted: data[key].completed,
        }
      })
      commit('setTodoList', todoList)
    } catch (e) {}
  },
  async addTodo({ commit }, payload) {
    try {
      const data = await this.$axios.$post(
        'https://todo-vue-2393f.firebaseio.com/todo.json',
        { value: payload.todo, completed: false },
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      // eslint-disable-next-line no-console
      await commit('setTodo', { payload, data })
    } catch (e) {}
  },
  chengeCheckBox({ commit }, payload) {
    commit('chengeCheckBox', payload)
  },
  deleteTodo({ commit }, { id }) {
    commit('deleteTodo', { id })
  },
  clearItems({ commit }, payload) {
    commit('clearItems')
  },
}
