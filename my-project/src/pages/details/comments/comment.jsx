import { useContext } from 'react';
import { Trash2, UserCircle } from 'lucide-react';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';

const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);
  
  const removeComment = async() => {
    const response = await API.deleteComment(comment._id);
    if(response.isSuccess) {
      setToggle(prev => !prev);
    }
  }
  
  const formatDate = (date) => {
    return new Date(date).toDateString();
  }
  
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
      <div className="flex-shrink-0">
        <UserCircle className="w-10 h-10 text-gray-400" />
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-800">{comment.name}</span>
          <span className="text-sm text-gray-500">{formatDate(comment.date)}</span>
        </div>
        
        <p className="mt-1 text-gray-700">{comment.comments}</p>
      </div>
      
      {comment.name === account.username && (
        <button 
          onClick={removeComment} 
          className="text-red-500 hover:text-red-700 transition"
          aria-label="Delete comment"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

export default Comment;