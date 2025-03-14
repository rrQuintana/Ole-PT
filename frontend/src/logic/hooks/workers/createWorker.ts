import workersService from "@/logic/services/worker.service";
import { Worker } from "@/logic/interfaces/worker.interface";

const createWorker = async (data: Worker) => {
  try {
    const response = await workersService.createWorker(data);
    return response;
  } catch (error) {
    console.error("Error creating worker:", error);
    throw error;
  }
};

export default createWorker;