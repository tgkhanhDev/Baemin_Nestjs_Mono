import { apiInstance } from "../constant/apiInstance";
import { Transaction } from "../types/transaction";

const api = apiInstance("http://localhost:8080/transaction");

export const manageTransaction = {
  getTransaction: (payment_id: string) =>
    api.get<Transaction[]>(`?payment_id=${payment_id}`),
};
