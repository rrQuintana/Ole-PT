import { api } from "@/logic/axiosConfig"
import { Earning } from "@/logic/interfaces/earning.interface"

const baseUrl = 'earnings'

const earningsService = {
  addEarning: async (earning: Earning) => {
    const response = api.post(baseUrl, earning)
    return response
  },

  listEarnings: async (filters = {}) => {
    try {
      const response = await api.get(baseUrl, { params: filters });
      return response.data;
    } catch (error) {
      console.error("Error listing earnings:", error);
      throw error;
    }
  }
}

export default earningsService