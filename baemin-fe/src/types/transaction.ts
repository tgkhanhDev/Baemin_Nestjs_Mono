export interface Transaction {
    transaction_id: string
    food_id: string
    food_name: string
    food_thumbnail: string
    shop_id: string
    type: string
    quantity: number
    per_price: number
    status: string
    payment?: Payment
  }
  
  export interface Payment {
    payment_id: string
    delivery_address: string
    message: string
    status: string
    total_cost: number
  }