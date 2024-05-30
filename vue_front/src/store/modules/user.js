import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    username: '',
    roles: '',
    loadMenus: false,
    userInfo: null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_LOAD_MENUS: (state, loadMenus) => {
    state.loadMenus = loadMenus
  },
  SET_USERINFO: (state, userinfo) => {
    state.userInfo = userinfo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        commit('SET_TOKEN', response.token)
        commit('SET_USERNAME', userInfo.username)
        setToken(response.token)
        commit('SET_USERINFO', response)
        commit('SET_LOAD_MENUS', true)

        resolve()
      }).catch(error => {
        console.log(error)

        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.username).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar, roles } = data

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        commit('SET_USERINFO', null)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateLoadMenus({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_LOAD_MENUS', true)
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

