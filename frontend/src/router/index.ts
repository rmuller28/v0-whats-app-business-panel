import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "../stores/auth"

const routes = [
  {
    path: "/login",
    component: () => import("../pages/LoginPage.vue"),
  },
  {
    path: "/register",
    component: () => import("../pages/RegisterPage.vue"),
  },
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: () => import("../pages/DashboardPage.vue"),
      },
      {
        path: "templates",
        component: () => import("../pages/TemplatesPage.vue"),
      },
      {
        path: "messages",
        component: () => import("../pages/MessagesPage.vue"),
      },
      {
        path: "accounts",
        component: () => import("../pages/AccountsPage.vue"),
      },
      {
        path: "webhook-logs",
        component: () => import("../pages/WebhookLogsPage.vue"),
      },
      {
        path: "settings",
        component: () => import("../pages/SettingsPage.vue"),
      },
    ],
  },
  {
    path: "/meta-callback",
    component: () => import("../pages/MetaCallbackPage.vue"),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !authStore.token) {
    next("/login")
  } else if ((to.path === "/login" || to.path === "/register") && authStore.token) {
    next("/")
  } else {
    next()
  }
})

export default router
