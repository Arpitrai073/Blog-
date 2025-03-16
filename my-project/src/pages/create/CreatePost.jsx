import React, { useState, useEffect, useContext } from "react";
import { PlusCircle } from "lucide-react"; // Importing Plus icon from Lucide React
import { useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/pexels-pixabay-356056.jpg";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const CreatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { account } = useContext(DataContext);

  const initialPost = {
    title: "",
    description: "",
    picture: "",
    username: account?.username || "",
    categories: location.search?.split("=")[1] || "All",
    createdDate: new Date(),
  };

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!file) return;

    const getImage = async () => {
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);

      try {
        const response = await API.uploadFile(data);
        if (response?.isSuccess) {
          setPost((prevPost) => ({ ...prevPost, picture: response.data }));
        } else {
          console.error("File upload failed:", response);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };

    getImage();

    // Create a local URL for preview
    const fileURL = URL.createObjectURL(file);
    setSelectedImage(fileURL);

    // Cleanup URL to avoid memory leaks
    return () => {
      if (fileURL) URL.revokeObjectURL(fileURL);
    };
  }, [file]);

  const handleChange = (e) => {
    setPost((prevPost) => ({ ...prevPost, [e.target.name]: e.target.value }));
  };

  const savePost = async () => {
    try {
      const response = await API.createPost(post);
      if (response.isSuccess) {
        navigate("/");
      } else {
        console.error("Post creation failed:", response);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center">
      {/* Image container */}
      <div
        className="w-3/4 h-1/2 bg-no-repeat bg-center rounded-lg"
        style={{
          backgroundImage: `url(${post.picture || selectedImage || img})`,
          backgroundSize: "cover",
        }}
      ></div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="fileInput"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* Plus Icon, Title Input, and Publish Button */}
      <div className="w-3/4 flex items-center justify-between mt-2">
        <div className="flex items-center gap-4">
          <label htmlFor="fileInput" className="cursor-pointer">
            <PlusCircle
              size={30}
              className="text-gray-600 hover:text-blue-500 transition duration-300"
            />
          </label>
          <input
            type="text"
            placeholder="Title..."
            className="w-full text-lg bg-transparent border-b border-gray-400 focus:border-black focus:outline-none"
            onChange={handleChange}
            name="title"
            value={post.title}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={savePost}
        >
          Publish
        </button>
      </div>

      {/* Tell Your Story Input Field */}
      <textarea
        placeholder="Tell your story..."
        className="w-3/4 mt-2 p-3 h-32 bg-transparent border-b border-gray-400 focus:border-black focus:outline-none resize-none"
        onChange={handleChange}
        name="description"
        value={post.description}
      ></textarea>
    </div>
  );
};

export default CreatePost;
