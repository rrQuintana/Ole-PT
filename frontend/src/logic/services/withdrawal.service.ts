import { api } from "@/logic/axiosConfig"
import { Withdrawal } from "../interfaces/withdrawal.interface"

const baseUrl = 'withdrawals'

const withdrawalsService = {
  withdrawalMoney: async (withdrawal: Withdrawal) => {
    const response = api.post(baseUrl, withdrawal)
    return response
  },

  getWithdrawals: async () => {
    const response = api.get(baseUrl)
    return response
  }
}

export default withdrawalsService