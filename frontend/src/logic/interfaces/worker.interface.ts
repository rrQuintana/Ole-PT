import { Earning } from "./earning.interface"
import { Withdrawal } from "./withdrawal.interface"

export interface Worker {
    id?: number
    first_name: string
    last_name: string
    phone_number: string
    available_balance?: number
    earnings?: Earning[]
    withdrawals?: Withdrawal[]
}