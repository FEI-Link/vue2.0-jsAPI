const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  routers: state => state.permission.routers,
  sidebarRouters: state => state.permission.sidebarRouters,
  userInfo: state => state.user.userInfo,
  loadMenus: state => state.user.loadMenus,
  questionList: state => state.question.questionList,
  paper: state => state.question.paper
}
export default getters
