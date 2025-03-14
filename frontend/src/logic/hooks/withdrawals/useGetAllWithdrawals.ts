import withdrawalsService from "@/logic/services/withdrawal.service";
import { useQuery } from "@tanstack/react-query";

const useGetAllWithdrawals = () => {
  return useQuery({
    queryKey: ['useGetAllWithdrawals'],
    queryFn: async () => {
      const response = await withdrawalsService.getWithdrawals();
      return response.data;
    }
  })
}

export default useGetAllWithdrawals;