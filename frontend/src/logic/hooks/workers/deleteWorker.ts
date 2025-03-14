import workersService from "@/logic/services/worker.service";

const deleteWorker = async (id: number) => {
  try {
    const response = await workersService.deleteWorker(id);
    return response;
  } catch (error) {
    console.error("Error updating worker:", error);
    throw error;
  }
};

export default deleteWorker;