import { apiInstance } from "../constant/apiInstance";
import { Payment, PaymentHistory } from "../types/payment";
import { utilsResponse } from "../types/utils";

const api = apiInstance("http://localhost:8080");

export const createPayment = {
  createPayment: (payload: Payment) =>
    api.post<utilsResponse<Payment>>(`/payment`, payload),

  getPaymentById: (id: string) =>
    api.get<PaymentHistory[]>(`/payment/${id}`),

  payForPayment: (payment_id: string) => 
    api.patch(`/payment/${payment_id}`)
};
