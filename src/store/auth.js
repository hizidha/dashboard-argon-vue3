import { defineStore } from "pinia";
import * as s$auth from "@/service/auth";
import { setCookies, certCookies, delCookies } from "@/plugins/cookies";

export const d$auth = defineStore({
  id: "auth",
  state: () => ({
    id: undefined,
    name: undefined,
    role: undefined,
  }),
  actions: {
    async a$setUser() {
      try {
        const { id, name, role } = certCookies();
        this.id = id;
        this.name = name;
        this.role = role;
        return "User Authenticated!";
      } catch ({ message }) {
        this.id = undefined;
        this.name = undefined;
        this.role = undefined;
        throw message;
      }
    },
    async a$register(body) {
      try {
        const response = await s$auth.register(body);
        return response.data;
      } 
      catch ({ error, message }) {
        console.log(error);
        throw message ?? error;
      }
    },
    async a$login(body) {
      try {
        const { data } = await s$auth.login(body);
        setCookies("CERT", data.token, { datetime: data.expiresAt });
        return true;
      } 
      catch ({ error, message }) {
        console.log(error);
        throw message ?? error;
      }
    },
    async a$logout() {
      try {
        delCookies("CERT");
      } 
      catch (error) {
        console.log(error);
        throw message ?? error;
      }
    }
  },
  getters: {
    g$user: ({ id, name, role }) => ({ id, name, role }),
    // determine if user is logged in
    isLoggedIn: ({ id }) => !!id,
  },
});
