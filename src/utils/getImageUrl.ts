import envConfig from "@/config";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getImageUrl = async (image: any) => {
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${envConfig.API_KEY_IMGBB}`;
    const res = await fetch(url, {
        method: "POST",
        body: formData,
    });
    const data = await res.json();
    return data?.data?.display_url;
};