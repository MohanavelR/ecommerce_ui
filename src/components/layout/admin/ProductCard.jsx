import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDeleteProduct, useGetAllProducts} from '../../../store/productSlice'
import { MessageContext } from '../../../context/context'

const ProductCard = ({product,isEditMode,openProductForm,setIsEditMode,id,setId}) => {
async  function setIsEditModeMethod(id){
        setIsEditMode(true)
        setId(id)
       openProductForm()
  }
  const {messageContextState,setMessageContextState}=useContext(MessageContext)
  const dispatch=useDispatch()
async function handleProductDelete(id){
 if(confirm("Are Sure To Delete")){
  dispatch(useDeleteProduct(id)).then(res=>{
if(res.payload?.success){
        dispatch(useGetAllProducts())
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
      }
      else{
       
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
      }
  })
 }
}

  return (
    <>
<div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                {/* <!-- Image Section --> */}
                <div class="relative">
                    <img src={product?.images[0]} alt="Product Image" class="w-full h-48 object-cover"/>
                    
                    {/* <!-- Trending Badge --> */}
                    {
                      product?.isTrending &&
                    <div class="absolute top-3 right-3  bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ">
                        <i class="fas fa-fire"></i>
                        <span>Trending</span>
                    </div>
                    }
                    
                    {/* <!-- Offer Badge --> */}
                    {
                      product?.offer &&
                    <div class="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {product?.offer}% OFF
                    </div>
                    }
                    
                    {/* <!-- Action Buttons --> */}
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button onClick={()=>setIsEditModeMethod(product._id)} class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full mx-1 transform transition-transform duration-300 hover:scale-110">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onClick={()=>handleProductDelete(product._id)} class="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full mx-1 transform transition-transform duration-300 hover:scale-110">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                {/* <!-- Product Details --> */}
                <div class="p-5">
                    {/* <!-- Brand --> */}
                    <p class="text-sm text-gray-500 mb-1">{product?.brand}</p>
                    
                    {/* <!-- Product Name --> */}
                    <h3 class="text-lg font-bold text-gray-800 mb-2">{product?.productName}</h3>
                    
                    {/* <!-- Category & SubCategory --> */}
                    <div class="flex gap-2 mb-3">
                        <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{product?.category}</span>
                        <span class="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">{product?.subCategory}</span>
                    </div>
                    
                    {/* <!-- Price Section --> */}
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <span class="text-2xl font-bold text-gray-800">{product?.price?.currency}{product?.price?.current}</span>
                            <span class="text-sm text-gray-500 line-through ml-2">{product?.price.original && (product?.price?.currency +product?.price.original   )}</span>
                        </div>
                        <div class="text-green-600 font-semibold">
                            Save $300
                        </div>
                    </div>
                    
                    
                </div>
            </div>

    </>
  )
}

export default ProductCard