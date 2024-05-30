import { getQuestionList } from '@/api/student'
import router from '@/router/index'

const state = {
  paper: '',
  questionList: []
}

const mutations = {
  SET_PAPER: (state, paper) => {
    state.paper = paper
  },
  SET_QUESTION: (state, list) => {
    state.questionList = list
  }
}

const actions = {
  getQuestion({ commit, state }, paper) {
    commit('SET_PAPER', paper)
    return new Promise((resolve, reject) => {
      getQuestionList(state.paper.paperid).then(res => {
        commit('SET_QUESTION', res.data)

        resolve()
      })
    })
    
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
