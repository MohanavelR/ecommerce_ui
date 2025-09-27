import React, { useContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDeleteProduct, useGetAllProducts} from '../../../store/productSlice'
import { MessageContext } from '../../../context/context'
import DeleteConfirmationModal from '../../common/DeleteConfirmationModal'

// --- NEW COMPONENT: Custom Delete Confirmation Modal ---

// -------------------------------------------------------------

const ProductCard = ({product,isEditMode,openProductForm,setIsEditMode,id,setId}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // --- NEW STATE for Modal ---
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    // ---------------------------
    
    const isSoldOut = product?.stock === 0;

    useEffect(() => {
        if (!product?.images || product.images.length < 2) return;

        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => 
                (prevIndex + 1) % product.images.length
            );
        }, 10000);

        return () => clearInterval(interval);
    }, [product?.images]);

    // Opens the form for editing
    async function setIsEditModeMethod(productId){
        setIsEditMode(true)
        setId(productId)
        openProductForm()
    }
    
    const {messageContextState,setMessageContextState}=useContext(MessageContext)
    const dispatch=useDispatch()

    // --- MODIFIED DELETE HANDLER: Shows modal first ---
    function handleProductDeleteClick(productId) {
        // Set the ID to be deleted and show the confirmation modal
        setId(productId); 
        setShowDeleteConfirm(true);
    }

    // --- NEW FUNCTION: Executes deletion after confirmation ---
    async function executeProductDelete() {
        setShowDeleteConfirm(false); // Close the modal
        
        // Execute the delete action using the stored ID
        dispatch(useDeleteProduct(id)).then(res=>{
            if(res.payload?.success){
                dispatch(useGetAllProducts())
                setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
            }
            else{
                setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
            }
        })
        setId(null); // Clear the ID after action
    }
    // --------------------------------------------------

    // Helper to calculate saved amount
    const savedAmount = (product?.price?.original && product?.price?.current) 
        ? (product.price.original - product.price.current ).toFixed(1)
        : 0;

    // Stock Status Logic Helper
    const getStockStatus = () => {
        if (product?.stock > 10) return { label: `In Stock (${product.stock})`, class: 'bg-green-600 text-white' };
        if (product?.stock > 0) return { label: `Low Stock (${product.stock})`, class: 'bg-yellow-500 text-white' };
        return { label: `Sold Out (0)`, class: 'bg-red-600 text-white' };
    };
    const stockStatus = getStockStatus();

    return (
        <>
        {/* Render the confirmation modal if state is true */}
        {showDeleteConfirm && (
            <DeleteConfirmationModal
                name={product.productName}
                onConfirm={executeProductDelete}
                onCancel={() => {
                    setShowDeleteConfirm(false);
                    setId(null); // Clear ID on cancel
                }}
            />
        )}

        {/* Card Container: Premium styling with pronounced hover effect */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-500 group transform hover:scale-[1.01] hover:shadow-indigo-500/30 relative flex flex-col">
            
            {/* Image Section: Aspect-[4/3] - Main Visual Focus */}
            <div className="relative aspect-[4/3] overflow-hidden">
                
                {/* Image: Uses currentImageIndex for the slider effect */}
                <img 
                    src={product?.images[currentImageIndex]} 
                    alt={product?.productName} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-90"
                />

                {/* --- Sold Out / Not Available Image Overlay --- */}
                {isSoldOut && (
                    <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center z-10 backdrop-blur-sm">
                        <span className="text-white text-2xl font-black tracking-widest uppercase p-4 border-4 border-white transform rotate-[-5deg] shadow-xl">
                            NOT AVAILABLE
                        </span>
                    </div>
                )}
                
                {/* Image Indicator Dots */}
                {product?.images && product.images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 p-0.5 rounded-full bg-black/40 pointer-events-none z-20"> 
                        {product.images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 w-1 rounded-full transition-all duration-300 
                                    ${idx === currentImageIndex ? 'bg-white w-3' : 'bg-gray-400'}
                                `}
                            />
                        ))}
                    </div>
                )}
                
                {/* Badge Container: Top corners for status badges */}
                <div className="absolute top-0 left-0 w-full h-full p-3 flex justify-between items-start pointer-events-none z-20"> 
                    
                    {/* --- Stock Status Badge with Stock Number (Top-Left of Image) --- */}
                    <div className="flex flex-col gap-1 items-start">
                        <div className={`text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg pointer-events-auto ${stockStatus.class}`}>
                            {stockStatus.label}
                        </div>

                        {/* Offer Badge (Below Stock) */}
                        {
                            product?.offer &&
                            <div className="bg-indigo-600 text-white px-2.5 py-1 rounded-full text-xs font-extrabold shadow-lg pointer-events-auto mt-1">
                                -{product?.offer}%
                            </div>
                        }
                    </div>

                    <div className="flex flex-col gap-1 items-end">
                        {/* Trending Badge (Top-Right of Image) */}
                        {
                            product?.isTrending &&
                            <div className="bg-pink-600 text-white px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 shadow-lg pointer-events-auto">
                                <span className="tracking-wider"> TRENDING</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            
            {/* Product Details Block */}
            <div className="px-5 py-2 flex flex-col justify-between flex-grow"> 
                
                {/* Brand & Name */}
                <div className='mb-1'>
                    <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest ">{product?.brand}</p>
                    
                    <h3 className="text-2xl font-extrabold text-gray-900 transition-colors duration-300 ">
                        {product?.productName}
                    </h3>
                </div>
                
                {/* Description Section */}
                {product?.description && (
                    <div className="mb-1">
                        <p className="text-sm text-gray-600 line-clamp-2">
                            {product.description}
                        </p>
                    </div>
                )}
                
                {/* Category Tags */}
                <div className="flex flex-wrap items-center justify-start border-b border-gray-100 pb-3">
                    <div className="flex gap-2">
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-md font-semibold">{product?.category}</span>
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-md font-semibold">{product?.subCategory}</span>
                    </div>
                </div>
                
                {/* Price Section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline space-x-2">
                        {/* Current Price (Larger, boldest) */}
                        <span className="text-3xl font-black text-slate-900">
                            {product?.price?.currency}{product?.price?.current}
                        </span>
                        
                        {/* Original Price (Line-through, only if discounted) */}
                        {product?.price.original > product?.price.current && (
                            <span className="text-lg font-medium text-gray-400 line-through">
                                {product?.price?.currency}{product?.price.original}
                            </span>
                        )}
                    </div>

                    {/* --- Saved Amount Badge --- */}
                    {savedAmount > 0 && (
                        <div className="text-sm font-extrabold text-white bg-green-600 px-3 py-1 rounded-full shadow-lg transform -rotate-2">
                            SAVE {product?.price?.currency}{savedAmount}
                        </div>
                    )}
                </div>
            </div>

            {/* --- Dedicated Action Bar (Absolute Bottom of Card) --- */}
            <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                {/* EDIT Button */}
                <button 
                    onClick={()=>setIsEditModeMethod(product._id)} 
                    title="Edit Product"
                    className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 text-sm font-bold transition-colors duration-200 p-2 rounded-lg hover:bg-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
                    Edit
                </button>
                {/* DELETE Button (Now opens modal) */}
                <button 
                    onClick={()=>handleProductDeleteClick(product._id)} 
                    title="Delete Product"
                    className="flex items-center gap-1.5 text-red-600 hover:text-red-800 text-sm font-bold transition-colors duration-200 p-2 rounded-lg hover:bg-red-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete
                </button>
            </div>
        </div>
        </>
    )
}

export default ProductCard