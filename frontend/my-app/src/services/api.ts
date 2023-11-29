import axios from "axios";
import { parseCookies } from "nookies";

export const api = axios.create({
  baseURL: "http://localhost:8080/",
});

export const getDate = () => {
const dataAtual = new Date();

const ano = dataAtual.getFullYear();
const mes = dataAtual.getMonth() + 1; // Os meses começam do zero, então adicionamos 1
const dia = dataAtual.getDate();

return (`${ano}-${mes}-${dia}`)
}

export const authLogin = (email: string, password: string) => {
  const params = {
    "email": email,
    "password": password
  }
  return api.post("/auth/login", params);
};

export const checkToken = () => {
  const { "nextauth.token": token }: any = parseCookies();
  return api.get("/user/read-id", token);
};


export const getUserInfo = () => {
  const { "nextauth.token": token }: any = parseCookies();
  return api.get("/user/read-id", token);
};