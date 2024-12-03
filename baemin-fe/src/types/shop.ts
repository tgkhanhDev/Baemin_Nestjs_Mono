import { Food } from "./food";

export interface FilterParams {
  name?: string;
  location?: string;
  label?: string;
  type?: string;
}

export interface Shop {
  shop_id: string;
  shop_name: string;
  shop_address: string;
  shop_thumbnail: string;
  category: string;
  label: string;
  location: string;
  rating: number;
  open_time: string;
  close_time: string;
  price_start: number;
  price_end: number;
  is_open: boolean;
}

export interface ShopDetail {
  shop_id: string;
  shop_name: string;
  shop_address: string;
  shop_thumbnail: string;
  category: string;
  label: string;
  location: string;
  rating: number;
  open_time: string;
  close_time: string;
  price_start: number;
  price_end: number;
  is_open: boolean;
  food: Food[];
}
