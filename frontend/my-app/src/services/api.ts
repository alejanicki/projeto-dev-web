import axios from "axios";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";

export const api = axios.create({
  baseURL: "http://localhost:8080/",
});

export const decodeToken = async (token: string) => {
  interface DecodedToken {
    sub: string;
    email: string;
  }
  if (token)
    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.email
    } catch (error: any) {
      console.error("Error decoding JWT:", error.message);
    }
};

export const getDate = () => {
  const dataAtual = new Date();

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth() + 1; // Os meses começam do zero, então adicionamos 1
  const dia = dataAtual.getDate();

  return `${ano}-${mes}-${dia}`;
};

export const authLogin = async (email: string, password: string) => {
  const params = {
    email: email,
    password: password,
  };
  const response = api.post("/auth/login", params);
  console.log((await response).data);
  return response;
};

export const getProduct = () => {
  return api.get("/product");
};

export const addToCart = (productId: string, productQuantity: string) => {
  return api.post(`orders/add-to-cart/${productId}/${productQuantity}`);
};

export const checkout = async () => {
  const { "nextauth.token": token }: any = parseCookies();
  const email = await decodeToken(token)
  console.log(token)
  api.post(`/orders/checkout?email=${email}`).then((ress: any) => {
    console.log(ress)
  })
};
