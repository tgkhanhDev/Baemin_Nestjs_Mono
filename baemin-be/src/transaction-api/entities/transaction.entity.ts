
export class Transaction {
    transaction_id: string;

    food_id: string;

    quantity: number;

    per_price: number;

    payment_id?: string;

    status: string;
}

export enum transaction_status {
    not_started = 'not_started',
    in_progress = 'in_progress',
    complete = 'complete'
}