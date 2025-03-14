import workersService from "@/logic/services/worker.service";
import { useMutation } from "@tanstack/react-query";
import { Worker } from "@/logic/interfaces/worker.interface";

const useUpdateWorker = () => {
  const mutation = useMutation({
    mutationFn: async (data: Worker) => {
      const response = await workersService.updateWorker(data);
      return response;
    },
  });

  return mutation;
}

export default useUpdateWorker;