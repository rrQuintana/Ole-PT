import { Withdrawal } from "@/logic/interfaces/withdrawal.interface";
import withdrawalsService from "@/logic/services/withdrawal.service";

const addWithdrawal = async (data: Withdrawal) => {
  try {
    const response = await withdrawalsService.withdrawalMoney(data);
    return response;
  } catch (error) {
    console.error("Error adding withdrawal:", error);
    throw error;
  }
}

export default addWithdrawal;
