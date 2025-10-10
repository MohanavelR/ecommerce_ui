import React, { useContext, useState } from 'react';
import StarRating from './StarRating';
import Loader from '../../../common/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateReview, useDeleteReview, useGetProductReviews, useUpdateReview } from '../../../../store/review';
import { MessageContext } from '../../../../context/context';

const Review = ({reviews,isLoading,productId}) => {
  const {messageContextState,setMessageContextState}=useContext(MessageContext)
  const [isEditMode,setIsEditMode]=useState(false)
  const [editId,setEditId]=useState(null)
  const {user}=useSelector(state=>state.auth) 
  const dispatch=useDispatch()
  const [rating, setRating] =useState(0);
  const [reviewMessage, setReviewMessage] = useState("")
  
  function handleRatingChange(star) {
    setRating(star)
  }


  // State to toggle the visibility of the review list
  const [showReviews, setShowReviews] = useState(true);

  // --- Handlers ---

  // Toggles the visibility of the review list
  const handleToggleReviews = () => {
    setShowReviews(!showReviews);
  };

function handleEdit(review){
     setEditId(review?._id)
     setIsEditMode(true)
     setReviewMessage(review?.comment)
     setRating(review?.rating)
}
function clearReview(){
     setEditId(null)
     setIsEditMode(false)
     setReviewMessage("")
     setRating(0)
}
function deleteReview(id){
  if(confirm("Are sure to delete review?")){
    dispatch(useDeleteReview({reviewId:id,userId:user?.id})).then(res=>{
          if(res.payload?.success){
              setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})     
              dispatch(useGetProductReviews(productId))
              setRating(0)
              setReviewMessage("")
          }
          else{
              setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})      
          }
        })
  }
}
  // Handles submitting a new review
  const handleSubmitReview = () => {    
    if(reviewMessage!=="" && rating>0 ){


      dispatch((isEditMode?useUpdateReview({reviewId:editId,comment:reviewMessage ,rating,userId:user?.id}): useCreateReview({comment:reviewMessage ,rating,userId:user?.id, productId}))).then(res=>{
        if(res.payload?.success){
            setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})     
            dispatch(useGetProductReviews(productId))
            setRating(0)
            setReviewMessage("")
            setEditId(null)
            setIsEditMode(false)
        }
        else{
            setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})      
        }
      })
    }
    // Ensure reviews are visible after submission
    if (!showReviews) {
        setShowReviews(true);
    }
  };
  const iconClasses = showReviews ? 'fas fa-angle-up' : 'fas fa-angle-down';

 if(isLoading){
  return <Loader/>
 }

  return (
    // Base container styling
    <div className="p-5 border border-gray-200 rounded-lg shadow-md w-full mx-auto bg-white">
      

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Review</h2>
        <textarea
            value={reviewMessage}
            onChange={(e)=>setReviewMessage(e.target.value)}
            placeholder="Share your thoughts..."
            rows="2" 
            
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 
               focus:border-primary outline-none 
             transition duration-200 ease-in-out resize-none shadow-sm"
/>
        <StarRating handleRatingChange={handleRatingChange} rating={rating} />
        <button 
          onClick={handleSubmitReview}
          disabled={rating === 0 ||reviewMessage.trim() === "" }
          className="px-4 py-2 mt-3 disabled:bg-blue-400 disabled:cursor-not-allowed bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out shadow-md"
        >
          Submit Review
        </button>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* ==================================
        2. Toggle Button with Icon
        ==================================
      */}
      <button 
        onClick={handleToggleReviews}
        className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-150 ease-in-out mb-5 shadow-sm"
      >
        {/* Toggle button text based on state */}
        <span>{showReviews ? 'Hide Reviews' : `Show Reviews`}</span>
        
        {/* Font Awesome <i> tag is used here */}
        <i className={`${iconClasses} text-lg`}></i> 
      </button>

      {/* ==================================
        3. Review List Section (Conditionally Rendered)
        ==================================
      */}
      {showReviews && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Customer Reviews ({reviews.length})</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-500 italic">No reviews yet. Be the first!</p>
          ) : (
            <ul className="space-y-4">
             {
              (reviews && reviews?.length >0)?
              reviews.map((review) => (
<li 
  key={review._id || review.id}
  className="p-4 border border-gray-100 rounded-lg bg-gray-50 shadow-sm flex space-x-4"
>
  {/* Left: Avatar */}
  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
    {review.userId.firstName?.[0]?.toUpperCase() }
  </div>

  {/* Right: Review Content */}
  <div className="flex-1">
    {/* Top: Name and Rating */}
    <div className="flex items-center justify-between mb-1">
      <span className="font-semibold text-gray-800">
        {review.userId?.firstName}
      </span>

      <div className="flex items-center space-x-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <i key={i} className="fas fa-star text-yellow-500"></i>
        ))}
        {review.createdAt && (
          <span className="text-xs text-gray-400 ml-2">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>

    {/* Comment */}
    <p className="text-gray-700 mb-2 italic">"{review.comment}"</p>

    {/* Actions */}
    {user?.email=== review?.userId?.email &&
    <div className="flex space-x-2">
      <button
        onClick={() => handleEdit(review)}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
      >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
      </button>
      <button
        onClick={() => deleteReview(review._id)}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
      </button>
      {
        isEditMode && editId===review._id &&
      <button
        onClick={clearReview}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-yellow-600 text-sm"
      >
        Clear
      </button>
      }
    </div>
    }
  </div>
</li>

 )):"No Comments"
}
</ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Review;