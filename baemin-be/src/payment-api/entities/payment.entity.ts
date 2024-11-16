import { payment_status, Transaction } from '.prismas/client-postgres';

export class Payment {
    payment_id: string;

    delivery_address?: string;

    message?: string;

    total_cost: number;

    status: payment_status;

    transactions: Transaction[];
}