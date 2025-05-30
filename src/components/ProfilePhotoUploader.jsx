import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUser } from "../context/UserContext";
import { auth } from "../firebase";

const sanitizeFileName = (name) => {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
};

const ProfilePhotoUploader = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { updatePhoto } = useUser();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    if (!auth.currentUser) {
      alert("No authenticated user found. Please log in again.");
      return;
    }

    setUploading(true);

    try {
      // Sanitize filename to avoid invalid characters in storage path
      const cleanFileName = sanitizeFileName(image.name);

      const imageRef = ref(
        storage,
        `profilePhotos/${auth.currentUser.uid}/${cleanFileName}`
      );
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);
      await updatePhoto(downloadURL);

      alert("Profile photo updated!");
      setImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-24 h-24 rounded-full object-cover"
        />
      )}
      <button
        className={`px-4 py-2 rounded text-white ${
          image && !uploading
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleUpload}
        disabled={!image || uploading}
      >
        {uploading ? "Uploading..." : "Upload Photo"}
      </button>
    </div>
  );
};

export default ProfilePhotoUploader;
