export interface Payment {
  delivery_address: string;
  message: string;
  account_id: string;
  transactions: Transaction[];
}

export interface Transaction {
  food_name: string;
  food_id: string;
  per_price: number;
  type: string;
  food_thumbnail: string;
  quantity: number;
  shop_id: string;
}

export interface PaymentHistory {
  payment_id: string;
  delivery_address: string;
  message: string;
  total_cost: number;
  account_id: string;
  status: string;
}
