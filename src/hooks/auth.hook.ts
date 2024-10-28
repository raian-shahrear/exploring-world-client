/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  followUser,
  getAllUsers,
  getAllUsersName,
  loginUser,
  registerUser,
  unfollowUser,
} from "@/actions/AuthActions";
import { useUser } from "@/context/user.provider";
import { TLoggedInUser } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["GET_USER"],
    queryFn: async () => await getAllUsers(),
  });
};
export const useGetAllUserName = () => {
  return useQuery({
    queryKey: ["GET_USER_NAME"],
    queryFn: async () => await getAllUsersName(),
  });
};

export const useFollowUser = () => {
  const { setUser } = useUser();
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FOLLOW_USER"],
    mutationFn: async (userData) => await followUser(userData),
    onSuccess: ({ decodedUser }) => {
      setUser(decodedUser as TLoggedInUser);
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["GET_USER"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUnfollowUser = () => {
  const { setUser } = useUser();
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UNFOLLOW_USER"],
    mutationFn: async (userData) => await unfollowUser(userData),
    onSuccess: ({ decodedUser }) => {
      setUser(decodedUser as TLoggedInUser);
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["GET_USER"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
