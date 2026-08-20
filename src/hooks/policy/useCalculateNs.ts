import { policiesService } from "@/services/policies.service";
import { ICalculateNsPolicyRequest } from "@/types/policy.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export function useCalculateNs() {
  const queryClient = useQueryClient();

  const [isPromocodeError, setIsPromocodeError] = useState(false);

  const { mutate, isPending, data, isSuccess, isError } = useMutation({
    mutationKey: ["paymentCalculationNs"],
    mutationFn: (data: ICalculateNsPolicyRequest) =>
      policiesService.calculateNsPolicy(data),
    onMutate() {
      setIsPromocodeError(false);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["paymentCalculationNs"],
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 422) {
          setIsPromocodeError(true);
        }
      }
    },
  });

  return {
    mutate,
    isPending,
    data: data?.data.data,
    isSuccess,
    isError,
    isPromocodeError,
  };
}
