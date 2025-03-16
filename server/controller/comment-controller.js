
import Comment from "../model/comment.js";
export const newComment=async(request,response)=>{
    try {
        const comment=await new Comment(request.body);
        comment.save();
        response.status(200).json({msg:'comment saved successfully'})
    } catch (error) {
        response.status(500).json({error:error.message})
    }


}


export const getComments=async(request,response)=>{
    try {
        const comments=await Comment.find({postId: request.params.id});
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json({error:error.message})
    }
}
export const deleteComment = async (request, response) => {
    try {
        // Find the comment by ID
        const comment = await Comment.findById(request.params.id);
        
        // Check if the comment exists
        if (!comment) {
            return response.status(404).json({ msg: "Comment not found" });
        }

        // Delete the comment
        await comment.deleteOne();

        response.status(200).json({ msg: "Comment deleted successfully" });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};
