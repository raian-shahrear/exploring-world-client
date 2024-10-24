import envConfig from "@/config";

const getSingleImageUrl = async (image: File) => {
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

const getMultiImageUrl = async (images: File[]) => {
  const uploadPromises = images.map(async (img) => {
    const formData = new FormData();
    formData.append("image", img);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${envConfig.API_KEY_IMGBB}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.data.display_url;
  });

  const newImgArray = await Promise.all(uploadPromises);
  return newImgArray;
};

export const getImageUrl = {
  getSingleImageUrl,
  getMultiImageUrl,
};
