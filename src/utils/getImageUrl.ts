"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api_key_imgbb } from "@/config";

export const getImageUrl = async (image: any) => {
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${api_key_imgbb}`;
    const res = await fetch(url, {
        method: "POST",
        body: formData,
    });
    const data = await res.json();
    return data?.data?.display_url;
};