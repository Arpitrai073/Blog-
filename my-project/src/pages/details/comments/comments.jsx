import { useState, useEffect, useContext } from 'react';
import { UserCircle, Send } from 'lucide-react';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';

// Components
import Comment from './comment';

const initialValue = {
  name: '',
  postId: '',
  date: new Date(),
  comments: ''
}

const Comments = ({ post }) => {
  const [comment, setComment] = useState(initialValue);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { account } = useContext(DataContext);

  useEffect(() => {
    const getData = async () => {
      const response = await API.getAllComments(post._id);
      if (response.isSuccess) {
        setComments(response.data);
      }
    }
    getData();
  }, [toggle, post]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value
    });
  }

  const addComment = async() => {
    await API.newComment(comment);
    setComment(initialValue);
    setToggle(prev => !prev);
  }
  
  return (
    <div className="w-full">
      {/* Comment Input Section */}
      <div className="mt-24 flex items-start gap-4">
        <div className="flex-shrink-0">
          <UserCircle className="w-12 h-12 text-gray-400" />
        </div>
        
        <textarea 
          className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="what's on your mind?"
          onChange={handleChange} 
          value={comment.comments}
        />
        
        <button 
          className="px-4 py-2 h-10 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
          onClick={addComment}
        >
          <Send className="w-4 h-4 mr-1" /> Post
        </button>             
      </div>
      
      {/* Comments Display */}
      <div className="mt-6 space-y-4">
        {comments && comments.length > 0 && comments.map(comment => (
          <Comment key={comment._id} comment={comment} setToggle={setToggle} />
        ))}
        
        {(!comments || comments.length === 0) && (
          <p className="text-gray-500 italic text-center mt-6">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  )
}

export default Comments;