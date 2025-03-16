import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API } from "../../service/api";
import img from "../../assets/pexels-pixabay-356056.jpg";
import { Edit, Trash2 } from "lucide-react"; // Importing icons
import Comments from "./comments/comments";



const DetailView = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const url = post.picture || img; // Use post image if available, else default image

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await API.getPostById(id);
        if (response?.data) {  
          setPost(response.data);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchData();
  }, [id]);

  // Function to delete post
  const onDeletePost = async () => {
    try {
     let response= await API.deletePost(post._id);
     if (response.isSuccess){ navigate('/'); }
     // Redirect to homepage after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-4">
      {/* Blog Container with Increased Width */}
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
        {/* Blog Image */}
        <img
          src={url}
          alt="blog"
          className="w-full h-80 object-cover rounded-lg"
        />

        {/* Icons directly below the image (Right-Aligned) */}
        <div className="flex justify-end gap-3 mt-3">
          <Link to={`/update/${post._id}`}>
            <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
              <Edit size={20} className="text-blue-500" />
            </button>
          </Link>
          <button
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
            onClick={onDeletePost}
          >
            <Trash2 size={20} className="text-red-500" />
          </button>
        </div>

        {/* Blog Title (Centered & Bold) - Comes after Icons */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mt-4">
          {post.title}
        </h1>

        {/* Blog Meta Information */}
        <div className="flex justify-between text-gray-600 text-sm mt-4 px-4">
          <p>By <span className="font-semibold">{post.username}</span></p>
          <p>{new Date(post.createdDate).toDateString()}</p>
        </div>

        {/* Blog Description */}
        <p className="text-gray-700 mt-4 px-4">{post.description}</p>
      
      </div>  <Comments post={post}/>
    </div>
  );
};

export default DetailView;
