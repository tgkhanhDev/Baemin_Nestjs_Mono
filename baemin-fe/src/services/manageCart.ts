import { apiInstance } from "../constant/apiInstance";
import { Cart, ViewCart } from "../types/cart";
import { utilsResponse } from "../types/utils";

const api = apiInstance("http://localhost:8080");

export const manageCart = {
  addCartItem: (payload: Cart) =>
    api.post<utilsResponse<Cart>>(`/cart-api`, payload),
  getCart: (payload: string) =>
    api.get<ViewCart>(`/cart-api/${payload}`),
  deleteCart: (cartId: string) =>
    api.delete<Cart>(`/cart-api/delete-item/${cartId}`),
};
