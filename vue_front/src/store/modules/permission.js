import { constantRoutes } from "@/router";
import Layout from "@/layout/index";
import router from "@/router";

const state = {
  routers: constantRoutes,
  addRouters: [],
  sidebarRouters: [],
  loadMenus: false,

};

const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers;
    state.routers = constantRoutes.concat(routers);
  },
  SET_SIDEBAR_ROUTERS: (state, routers) => {
    state.sidebarRouters = constantRoutes.concat(routers);
  },
  ADD_ROUTER: (state, routes) => {
    router.addRoutes(state.sidebarRouters)
  }
};

const actions = {
  GenerateRoutes({ commit }, asyncRouter) {
    commit("SET_ROUTERS", asyncRouter);
  },
  SetSidebarRouters({ commit }, sidebarRouter) {
    commit("SET_SIDEBAR_ROUTERS", sidebarRouter);
  },
  updateLoadMenus({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_LOAD_MENUS', true)
    })
  },
  SET_LOAD_MENUS: (state, loadMenus) => {
    state.loadMenus = loadMenus
  }
};

// 遍历后台传来的路由字符串,转换为组件对象
export const filterAsyncRouter = (routers, isRewrite = false) => {
  return routers.filter((router) => {
    if (isRewrite && router.children) {
      router.children = filterChildren(router.children);
    }

    if (router.component) {
      // Layout组件特殊处理
      if (router.component === "Layout") {
        router.component = Layout;
      } else if (router.component === "ParentView") {
        router.component = ParentView;
      } else {
        const component = router.component;
        router.component = loadView(component);
      }
    }

    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children, router, isRewrite);
    }

    return true;
  });
};

function filterChildren(childrenMap) {
  var children = [];

  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === "ParentView") {
        el.children.forEach((c) => {
          c.path = el.path + "/" + c.path;

          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c));

            return;
          }

          children.push(c);
        });

        return;
      }
    }

    children = children.concat(el);
  });

  return children;
}

export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}`], resolve);
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
