import Post from '../model/post.js';

// ✅ Create a new post
export const createPost = async (request, response) => {
    try {
        const post = new Post(request.body);
        await post.save();  // ✅ Ensure post is saved before responding
        return response.status(200).json({ message: "Post saved successfully" });
    } catch (error) {
        return response.status(500).json({ msg: `Error in saving post: ${error.message}` });
    }
};

// ✅ Fetch all posts (with category filter)
export const getAllPosts = async (request, response) => {
    try {
        const category = request.query.category;
        let posts = category ? await Post.find({ categories: category }) : await Post.find({});
        return response.status(200).json(posts);
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
};

// ✅ Get a single post by ID
export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (!post) {
            return response.status(404).json({ msg: "Post not found" });
        }
        return response.status(200).json(post);
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
};

// ✅ Update a post
export const updatePost = async (request, response) => {
    try {
        // Check if the post exists
        const post = await Post.findById(request.params.id);
        if (!post) {
            return response.status(404).json({ msg: "Post not found" });
        }

        // Update the post
        const updatedPost = await Post.findByIdAndUpdate(
            request.params.id,
            { $set: request.body },
            { new: true }  // Ensures updated post is returned
        );

        return response.status(200).json({ msg: "Post updated successfully", post: updatedPost });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
};

// ✅ Delete a post
export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (!post) {
            return response.status(404).json({ msg: "Post not found" });
        }

        await Post.findByIdAndDelete(request.params.id);
        return response.status(200).json({ msg: "Post deleted successfully" });
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
};
