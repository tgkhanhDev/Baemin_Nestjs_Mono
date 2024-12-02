export interface Cart {
  account_id: string;
  food_id: string;
  quantity: number;
}

export interface ViewCart {
  account_id: string;
  cart_item_id: string;
  quantity: number;
  food_id: string;
  food: Food;
}

export interface Food {
  food_id: string;
  food_name: string;
  description: string;
  price: number;
  type: string;
  shop_id: string;
  food_thumbnail: string;
}

export type Update = UpdateCart[]

export interface UpdateCart {
  cart_item_id: string
  quantity: number
}
