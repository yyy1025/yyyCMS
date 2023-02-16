import { defineStore } from 'pinia'
const useCounterStore = defineStore('counter', {
  //state、getters、actions
  state: () => ({
    counter: 100
  }),
  getters: {
    //方法里面传入state
    doubleCounter(state) {
      return state.counter * 2
    }
  },
  actions: {
    //直接操作state即可
    changeCounterAction(newCounter: number) {
      this.$state.counter = newCounter
    }
  }
})
export default useCounterStore
