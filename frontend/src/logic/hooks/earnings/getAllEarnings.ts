import earningsService from "@/logic/services/earning.service";

const getAllEarnings = async (filters = {}) => {
  try {
    const response = await earningsService.listEarnings(filters);
    return response;
  } catch (error) {
    console.error("Error fetching earnings:", error);
    throw error;
  }
};

export default getAllEarnings;