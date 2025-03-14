import { api } from "@/logic/axiosConfig"
import { Worker } from "../interfaces/worker.interface"

const baseUrl = 'workers'

const workersService = {
  createWorker: async (worker: Worker) => {
    const response = api.post(baseUrl, worker)
    return response
  },

  listWorkers: async () => {
    const response = api.get(baseUrl)
    return response
  },

  getWorker: async (id: number) => {
    const response = api.get(`${baseUrl}/${id}`)
    return response
  },

  updateWorker: async (worker: Worker) => {
    const response = api.put(`${baseUrl}/${worker.id}`, worker)
    return response
  },

  deleteWorker: async (id: number) => {
    const response = api.delete(`${baseUrl}/${id}`)
    return response
  }
}

export default workersService