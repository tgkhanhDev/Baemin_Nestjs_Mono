export interface Payment {
    delivery_address: string
    message: string
    transactions: Transaction[]
  }
  
  export interface Transaction {
    food_name: string
    food_id: string
    per_price: number
    type: string
    food_thumbnail: string
    quantity: number
    shop_id: string
  }