import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAddToCart, useGetCart } from "../../../store/cart";
import { MessageContext } from "../../../context/context";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../common/Loader";

const HomeShopCard = ({ product ,width="w-65" }) => {
  const {messageContextState,setMessageContextState}=useContext(MessageContext)
  const {user,isAuthenticated}=useSelector(state=>state.auth)
  const {isLoading }=useSelector(state=>state.cart)
  const nav =useNavigate()
  const dispatch=useDispatch()
  const [addCartProductId,setAddCartProductId]=useState(null)
  // Use the first variation for initial display information
  const variation = product.variations ? product.variations[0] : null; 
async function handleAddToCart(id) {
    setAddCartProductId(id)
    if(!isAuthenticated){
      return nav("/auth/login")
    }  
    if(user?.isVerified){
      dispatch(useAddToCart({userId:user.id,productId:product._id,variation,quantity:1})).then(res=>{
       if(res.payload?.success){
          setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
          dispatch(useGetCart(user.id))
          setAddCartProductId(null)
         }
       else{
   setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
       }
      })
    }
    else{
        setMessageContextState({...messageContextState,is_show:true,text:"Please Verify Your Account",success:false})
    }
  }  
  // Determine main image preference
  const mainImage = product.images?.[0] || variation?.image; 

  // New Arrival Logic
  const NEW_ARRIVAL_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1000;
  const productCreatedTime = new Date(product.createdAt).getTime();
  const isNewArrival = Date.now() - productCreatedTime < NEW_ARRIVAL_THRESHOLD_MS;

  // Stock Logic
  const totalStock = product.variations?.length
    ? product.variations.reduce((sum, v) => sum + (v.stock || 0), 0)
    : product.stock || 0; // Fallback to product.stock or 0
    
  const isStock = totalStock > 0;

  // Offer Logic
  const isOffer = product.variations?.length
    ? product.variations.some((v) => v.offer > 0)
    : false;



  return (
    // Reduced size: w-72 h-[25rem] -> w-64 h-[22rem]
    <div className={`${width} h-[22rem] bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl flex flex-col`}>
      <Link to={`/shop/products/${product?.sku}`} className="relative h-44">
        {/* Reduced image height: h-52 -> h-44 */}
        <img
          src={mainImage}
          alt={product.productName}
          className="w-full h-full object-cover"
          loading='lazy'
        />

        {/* Status Badges - Reduced text size to 'xs' (was 'text-xs' on the inner span) and used smaller text classes on the outer container if possible*/}
        <div className="absolute top-2 left-2 z-10">
          {isNewArrival && (
            <span className="bg-green-600 text-white text-[0.6rem] font-bold px-1.5 py-0.5 rounded-full flex items-center shadow-md transform -rotate-1">
              <i className="fas fa-star text-[0.5rem] mr-1"></i>
              NEW
            </span>
          )}
        </div>

        <div className="absolute top-2 right-2 z-10">
          {product.isTrending && (
            <span className="bg-red-500 text-white text-[0.6rem] font-bold px-1.5 py-0.5 rounded-full flex items-center shadow-md">
              <i className="fas fa-fire text-[0.5rem] mr-1"></i>
              Trending
            </span>
          )}
        </div>

        <div className="absolute bottom-2 left-2 z-10">
          <span
            className={`px-1.5 py-0.5 rounded-full text-[0.6rem] font-bold flex items-center shadow-md ${
              isStock
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <i
              className={`fas ${
                isStock ? "fa-check-circle" : "fa-times-circle"
              } mr-1`}
            ></i>

            {isStock
              ? `In Stock`
              : "Sold Out"}
          </span>
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-3 flex flex-col flex-grow">
        
        {/* Category & Brand */}
        <div className="flex justify-between truncate items-center mb-1">
          <div className="flex items-center text-xs text-gray-500">
            <span className="bg-blue-100 truncate text-blue-800 text-[0.65rem] px-1.5 py-0.5 rounded mr-1">
              {product.category}
            </span>

            <span className="text-gray-500 truncate text-xs font-medium">
              {product.subCategory}
            </span>
          </div>

          <div className="flex truncate items-center">
            <i className="fas fa-tag text-gray-400 text-xs mr-1"></i>

            <span className="text-xs truncate text-gray-600 font-semibold">
              {product.brand}
            </span>
          </div>
        </div>

        {/* Product Name */}
        <div className="mb-1">
          <h3 className="text-sm font-extrabold text-gray-900 line-clamp-2 leading-tight">
            {product.productName}
          </h3>
        </div>

        {/* Price & Offer */}
        <div className="flex items-center justify-between mb-1 border-t border-gray-100 pt-1">
          <div className="flex items-baseline">
            {/* Reduced price size: text-lg -> text-base */}
            <span className="text-base font-bold text-gray-900">
              {variation?.price.currency}
              {variation?.price?.current}
            </span>
            {variation?.price?.original > 0 && (
              <span className="text-xs text-gray-500 line-through ml-2">
                {variation?.price.currency}
                {variation?.price?.original}
              </span>
            )}
          </div>

          {isOffer && (
            <span className="bg-red-500 -skew-y-6 text-white text-[0.65rem] font-bold px-2 py-0.5 rounded shadow-sm">
             Offer
            </span>
          )}
        </div>

        {/* Description */}
        {/* Ensured this section takes minimal space with line-clamp */}
        <div className="mb-auto">
          <p className="text-xs w-full text-gray-600 line-clamp-1">
            {product?.description?.[0]}
          </p>
        </div>
        
        {/* Action Button */}
        {product?.variations && product?.variations.length > 1 ? (
          <div className="mt-1">
            <Link
              to={`/shop/products/${product?.sku}`}
              // Reduced p-2 to p-1.5 for a smaller button
              className={` w-full p-1.5 py-2.5 flex bg-primary text-accent items-center justify-center gap-1 text-sm font-bold transition-all duration-300 rounded-md shadow-md transform hover:scale-[1.01]`}
            >
              Read More
            </Link>
          </div>
        ) : (
          <div className="flex gap-2 mt-1">
            <button
             onClick={()=>handleAddToCart(product?._id)}
             disabled={!isStock || (isLoading && product._id===addCartProductId )}
             title={!isStock ? "Out of Stock" : "Add to Cart"}
             // Reduced p-2 to p-1.5 for a smaller button
             className={`flex-1 p-1.5 flex items-center justify-center gap-1 text-sm font-bold transition-all duration-300 rounded-md shadow-md transform hover:scale-[1.01] ${
                 !isStock
                     ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                     : 'bg-indigo-600 hover:bg-indigo-700 text-white'
             }`}
            >
              {
                isLoading && addCartProductId===product?._id ?<Loader color="white" />:
              <div className="flex py-1 space-x-3" >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {!isStock ? 'SOLD OUT' : 'ADD TO CART'}
              </div>
              }
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeShopCard;