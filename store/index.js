export const state = () => ({
  todos: [
    { id: 1, value: 'todo 1', completed: true },
    { id: 2, value: 'todo 2', completed: false },
  ],
})
export const getters = {
  getTodos: (state) => state.todos,
}
export const mutations = {
  setTodo(state, payload) {
    state.todos.push({ id: Date.now(), value: payload.todo, completed: false })
  },
  chengeCheckBox(state, payload) {
    state.todos.filter((elem) => {
      if (elem.id === payload) {
        elem.completed = !elem.completed
      }
      return elem
    })
  },
  deleteTodo(state, payload) {
    state.todos.splice(payload, 1)
  },
  clearItems(state) {
    state.todos.forEach((element, index) => {
      if (element.completed) {
        // eslint-disable-next-line no-console
        console.log(element)
        state.todos.splice(index, 1)
      }
    })
  },
}
export const actions = {
  async addTodo({ commit }, payload) {
    try {
      await commit('setTodo', payload)
    } catch (e) {}
  },
  chengeCheckBox({ commit }, payload) {
    commit('chengeCheckBox', payload)
  },
  deleteTodo({ commit }, payload) {
    commit('deleteTodo', payload)
  },
  clearItems({ commit }, payload) {
    commit('clearItems')
  },
}
