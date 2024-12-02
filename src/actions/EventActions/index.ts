"use server";
import envConfig from "@/config";
import axiosInstance from "@/lib/AxiosInstance";
import { TFilterProps } from "@/types";
import { buildQueryParams } from "@/utils/buildQueryParams";
import { revalidateTag } from "next/cache";

// create event
export const createEvent = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/events", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    revalidateTag("events");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// get single event
export const getSingleEvent = async (eventId: string): Promise<any> => {
  const fetchOption: RequestInit = {
    cache: "no-store",
  };
  const res = await fetch(
    `${envConfig.API_URL}/events/${eventId}`,
    fetchOption
  );
  if (!res.ok) {
    throw new Error("Failed to fetch event!");
  }
  return res.json();
};

// get all events
export const getAllEvents = async (params: TFilterProps) => {
  const queryString = buildQueryParams(params);
  try {
    const { data } = await axiosInstance.get(`/events?${queryString}`);
    revalidateTag("events");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// update event
export const updateEvent = async (
  eventId: string,
  formData: FormData
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/events/${eventId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    revalidateTag("events");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// create event's host
export const createEventHost = async (
  eventId: string,
  formData: FormData
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/events/create-host/${eventId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    revalidateTag("events");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// create event's guest
export const createEventGuest = async (
  eventId: string,
  formData: FormData
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/events/create-guest/${eventId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    revalidateTag("events");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// delete event
export const deleteEvent = async (eventId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/events/${eventId}`);
    revalidateTag("events");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// delete event's host
export const deleteEventHost = async (
  eventId: string,
  deletedHost: { hostId: string }
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/events/delete-host/${eventId}`,
      deletedHost
    );
    revalidateTag("events");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// delete event's guest
export const deleteEventGuest = async (
  eventId: string,
  deletedGuest: { guestId: string }
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/events/delete-guest/${eventId}`,
      deletedGuest
    );
    revalidateTag("events");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
