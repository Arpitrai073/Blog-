import { useState, useEffect } from "react";
import { API } from "../../../service/api";
import Post from "./post";
import { useSearchParams, Link } from "react-router-dom";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getAllPosts({ category: category || "" });
                if (response?.isSuccess && response.data) {
                    setPosts(response.data);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchData();
    }, [category]);

    return (
        <div className="flex flex-wrap gap-4 justify-center overflow-x-auto p-4">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <Link 
                    key={post._id} to={`/details/${post._id}`} className="w-full sm:w-80">
                        <Post post={post} />
                    </Link>
                ))
            ) : (
                <div className="text-gray-600 text-lg">No Posts Found</div>
            )}
        </div>
    );
};

export default Posts;
