import {
  createEvent,
  createEventGuest,
  createEventHost,
  deleteEvent,
  deleteEventGuest,
  deleteEventHost,
  getAllEvents,
  getSingleEvent,
  updateEvent,
} from "@/actions/EventActions";
import { TFilterProps } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// create event
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_EVENT"],
    mutationFn: async (eventData) => await createEvent(eventData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_EVENTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// get single event
export const useGetSingleEvent = (eventId: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_EVENT", eventId],
    queryFn: () => getSingleEvent(eventId),
    enabled: !!eventId,
  });
};

// get all events
export const useGetAllEvents = (params?: TFilterProps) => {
  return useQuery({
    queryKey: ["GET_EVENTS", params],
    queryFn: async () => await getAllEvents(params || {}),
    staleTime: 0,
  });
};

// update event
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    { eventId: string; eventData: FormData },
    void
  >({
    mutationKey: ["UPDATE_EVENT"],
    mutationFn: async ({ eventId, eventData }) =>
      await updateEvent(eventId, eventData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_EVENTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// create event's host
export const useCreateEventHost = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    { eventId: string; hostData: FormData },
    void
  >({
    mutationKey: ["CREATE_EVENT_HOST"],
    mutationFn: async ({ eventId, hostData }) =>
      await createEventHost(eventId, hostData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_EVENTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// create event's guest
export const useCreateEventGuest = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    { eventId: string; guestData: FormData },
    void
  >({
    mutationKey: ["CREATE_EVENT_GUEST"],
    mutationFn: async ({ eventId, guestData }) =>
      await createEventGuest(eventId, guestData),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_EVENTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// delete event
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_EVENT"],
    mutationFn: async (eventId: string) => await deleteEvent(eventId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_EVENTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// delete event's host
export const useDeleteEventHost = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    { eventId: string; deletedHost: { hostId: string } },
    void
  >({
    mutationKey: ["DELETE_EVENT_HOST"],
    mutationFn: async ({ eventId, deletedHost }) =>
      await deleteEventHost(eventId, deletedHost),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_EVENTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// delete event's guest
export const useDeleteEventGuest = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    { eventId: string; deletedGuest: { guestId: string } },
    void
  >({
    mutationKey: ["DELETE_EVENT_GUEST"],
    mutationFn: async ({ eventId, deletedGuest }) =>
      await deleteEventGuest(eventId, deletedGuest),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GET_EVENTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
