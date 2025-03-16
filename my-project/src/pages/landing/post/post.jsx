import React from "react";
import img from "../../../assets/pexels-pixabay-356056.jpg"; // Import default image

const Post = ({ post }) => {
  const url = post.picture && post.picture.trim() !== "" ? post.picture : img;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-80 flex-shrink-0">
      {/* Blog Image */}
      <img src={url} alt="blog" className="w-full h-48 object-cover" />

      {/* Blog Content */}
      <div className="p-4">
        <p className="text-sm text-gray-500 uppercase">{post.categories}</p>
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm">By {post.username}</p>
        <p className="text-gray-700 mt-2 text-sm line-clamp-3">
          {post.description}
        </p>
      </div>
    </div>
  );
};

export default Post;
