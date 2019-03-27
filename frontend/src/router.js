import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Users from "./views/Users.vue";
import Signup from "./views/Signup.vue";
import UserProfile from "./views/UserProfile.vue";
import EditProfile from "./views/EditProfile.vue";
import UserInbox from "./views/UserInbox.vue";

Vue.use(Router);

export default new Router({
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 }),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/users/:country&:city",
      name: "users",
      component: Users
    },
    {
      path: "/userProfile/:userId",
      name: "userProfile",
      component: UserProfile
    },
    {
      path: "/userProfile/:userId/edit",
      name: "editProfile",
      component: EditProfile
    },
    {
      path: "/userProfile/:userId/inbox",
      name: "userInbox",
      component: UserInbox
    }
  ]
});
