import {
  followUser,
  getAllUsers,
  getAllUsersName,
  loginUser,
  registerUser,
  unfollowUser,
  updatePassword,
  updateUser,
  updateUserEmail,
  updateUserRole,
} from "@/actions/AuthActions";
import { useUser } from "@/context/user.provider";
import { TFilterProps, TLoggedInUser, TUser } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

// register/create user
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

// login user
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

// get all users
export const useGetAllUser = (params?: TFilterProps) => {
  return useQuery({
    queryKey: ["GET_USER", params],
    queryFn: async () => await getAllUsers(params || {}),
  });
};

// get all user's name for options
export const useGetAllUserName = () => {
  return useQuery({
    queryKey: ["GET_USER_NAME"],
    queryFn: async () => await getAllUsersName(),
  });
};

// follow user
export const useFollowUser = () => {
  const { setUser } = useUser();
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FOLLOW_USER"],
    mutationFn: async (userData) => await followUser(userData),
    onSuccess: ({ decodedUser, data }) => {
      setUser(decodedUser as TLoggedInUser);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_USER"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// unfollow user
export const useUnfollowUser = () => {
  const { setUser } = useUser();
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UNFOLLOW_USER"],
    mutationFn: async (userData) => await unfollowUser(userData),
    onSuccess: ({ decodedUser, data }) => {
      setUser(decodedUser as TLoggedInUser);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_USER"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// update user
export const useUpdateUser = () => {
  const { setUser } = useUser();
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    { userId: string; userData: Partial<TUser> },
    void
  >({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async ({ userId, userData }) =>
      await updateUser(userId, userData),
    onSuccess: ({ decodedUser, data }) => {
      setUser(decodedUser as TLoggedInUser);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_USER"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// update user email
export const useUpdateUserEmail = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    { userId: string; userData: Partial<TUser> },
    void
  >({
    mutationKey: ["UPDATE_USER_EMAIL"],
    mutationFn: async ({ userId, userData }) =>
      await updateUserEmail(userId, userData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_USER"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// update password
export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { userData: any }, void>({
    mutationKey: ["UPDATE_PASSWORD"],
    mutationFn: async ({ userData }) => await updatePassword(userData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_USER"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// update user role
export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    { userId: string; userData: { role: string } }
  >({
    mutationKey: ["UPDATE_USER_ROLE"],
    mutationFn: async ({ userId, userData }) =>
      await updateUserRole(userId, userData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_USER"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
