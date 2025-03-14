import { Earning } from "@/logic/interfaces/earning.interface";
import earningsService from "@/logic/services/earning.service";

const addEarning = async (data: Earning) => {
  try {
    const response = await earningsService.addEarning(data);
    return response;
  } catch (error) {
    console.error("Error adding earning:", error);
    throw error;
  }
};

export default addEarning;