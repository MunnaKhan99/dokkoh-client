export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dokkho_image_store");

    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmhphhimd/image/upload",
        {
            method: "POST",
            body: formData,
        }
    );

    if (!res.ok) {
        throw new Error("Cloudinary upload failed");
    }

    const data = await res.json();
    return data.secure_url;
};
