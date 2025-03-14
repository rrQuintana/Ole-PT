import workersService from "@/logic/services/worker.service";
import { useMutation } from "@tanstack/react-query";

const useFindWorker = () => {
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await workersService.getWorker(id);
      return response;
    },
  });

  return mutation;
}

export default useFindWorker;