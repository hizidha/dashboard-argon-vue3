import axios from "axios";

const parseJwt = (token) => {
  const base64Jwt = token.split(".")[1];
  const parsedJwt = JSON.parse(window.atob(base64Jwt));
  return parsedJwt;
};

const setCookies = (name, value, { datetime }) => {
  const d = new Date();
  if (datetime) d.setTime(datetime);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;`;
};

const getCookies = (name) => {
  const cookies = `; ${document.cookie}`;
  const byValue = cookies.split(`; ${name}=`);
  if (byValue.length === 2) return byValue.pop().split(";").shift();
};

const delCookies = (name) => {
  setCookies(name, "", -1);
};

const certCookies = () => {
  const token = getCookies("CERT");
  if (token) {
    const { id, name, role, exp } = parseJwt(token);
    if (!id) return delCookies("CERT");
    return {
      id,
      name,
      role,
      exp,
    };
  }
  return {
    id: undefined,
    name: undefined,
    role: undefined,
    exp: undefined,
  };
};

const http = axios.create({
  baseURL: "https://be.tautan.tk/api",
  headers: {
    "Content-type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = getCookies("CERT");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    else {
      delCookies("CERT");
      delete config.headers["Authorization"];
    }
    return config;
  },
  (error) => {
    throw error;
  }
);

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    switch (error.response.status) {
      case 401:
        delCookies("CERT");
        break;
      default:
        break;
    }
    throw error?.response?.error ?? error?.response?.message ?? error;
  }
);

class TutorialDataService {
  getAll() {
    return http.get("/todo");
  }

  get(id) {
    return http.get(`/todo/${id}`);
  }

  create(data) {
    return http.post("/todo", data);
  }

  update(id, data) {
    return http.put(`/todo/${id}`, data);
  }

  delete(id) {
    return http.delete(`/todo/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new TutorialDataService();
