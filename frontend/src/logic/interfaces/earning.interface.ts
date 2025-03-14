import { Worker } from "./worker.interface"

export interface Earning {
    id?: number
    worker_id: number
    earning_total: number
    date: string
    worker?: Worker
}