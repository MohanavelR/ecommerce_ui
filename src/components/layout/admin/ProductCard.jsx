import React, { useContext, useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  useDeleteProduct,
  useGetAllProducts,
} from "../../../store/productSlice";
import { MessageContext } from "../../../context/context";
import DeleteConfirmationModal from "../../common/DeleteConfirmationModal";
import EditIcon from "../../common/Icons/EditIcon";
import DeleteIcon from "../../common/Icons/DeleteIcon";

// Assuming a standard image fallback if images are missing
const FALLBACK_IMAGE = "https://via.placeholder.com/300x200?text=No+Image";

const ProductCard = ({
  product,
  isEditMode,
  openProductForm,
  setIsEditMode,
  id,
  setId,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dispatch = useDispatch();
  const { messageContextState, setMessageContextState } =
    useContext(MessageContext);
  const baseVariation = product?.variations?.[0];
  const currentPrice = baseVariation?.price?.current || 0;
  const originalPrice = baseVariation?.price?.original || 0;
  const currency = baseVariation?.price?.currency || "₹";
  const offer = baseVariation?.offer || 0;
  const totalStock =
    product?.variations?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0;
  const isSoldOut = totalStock === 0;

  const allImages = useMemo(() => {
    let images = Array.isArray(product?.images)
      ? product.images.filter((img) => img)
      : [];
    if (baseVariation?.images && Array.isArray(baseVariation.images)) {
      images = images.concat(baseVariation.images.filter((img) => img));
    }
    return [...new Set(images)];
  }, [product?.images, product?.variations]); // Depend on both main list and variations array

  useEffect(() => {
    if (allImages.length < 2) return;
    if (currentImageIndex >= allImages.length) {
      setCurrentImageIndex(0);
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [allImages, currentImageIndex]);

  async function setIsEditModeMethod(productId) {
    setIsEditMode(true);
    setId(productId);
    openProductForm();
  }

  function handleProductDeleteClick(productId) {
    setId(productId);
    setShowDeleteConfirm(true);
  }

  async function executeProductDelete() {
    setShowDeleteConfirm(false);
    dispatch(useDeleteProduct(id)).then((res) => {
      if (res.payload?.success) {
        dispatch(useGetAllProducts());
        setMessageContextState({
          ...messageContextState,
          is_show: true,
          text: res.payload?.message,
          success: true,
        });
      } else {
        setMessageContextState({
          ...messageContextState,
          is_show: true,
          text: res.payload?.message,
          success: false,
        });
      }
    });
    setId(null);
  }
  const savedAmount =
    originalPrice > currentPrice
      ? (originalPrice - currentPrice).toFixed(2)
      : 0;

  const getStockStatus = () => {
    if (totalStock <= 0)
      return { label: `Sold Out`, class: "bg-red-100 text-red-700" };
    if (totalStock <= 10)
      return {
        label: `Low Stock (${totalStock})`,
        class: "bg-yellow-100 text-yellow-700",
      };
    return {
      label: `In Stock (${totalStock})`,
      class: "bg-green-100 text-green-700",
    };
  };
  const stockStatus = getStockStatus();

  return (
    <>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <DeleteConfirmationModal
          name={product.productName}
          onConfirm={executeProductDelete}
          onCancel={() => {
            setShowDeleteConfirm(false);
            setId(null);
          }}
        />
      )}

      {/* Card Container */}
      <div
        className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden 
                        transition-all duration-300 group hover:shadow-lg hover:border-indigo-200 
                        relative flex flex-col h-full"
      >
        <div className="relative aspect-[3/2] overflow-hidden">
          <img
            src={allImages[currentImageIndex] || FALLBACK_IMAGE}
            alt={product?.productName}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {isSoldOut && (
            <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center z-10">
              <span className="text-sm font-black tracking-wider uppercase p-1 border border-white text-white">
                SOLD OUT
              </span>
            </div>
          )}
          {allImages.length > 1 && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-0.5 p-0.5 rounded-full bg-black/50 pointer-events-none z-20">
              {allImages.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 w-1 rounded-full transition-all duration-300 
                                    ${
                                      idx === currentImageIndex
                                        ? "bg-indigo-400 w-3"
                                        : "bg-gray-300"
                                    }
                                `}
                />
              ))}
            </div>
          )}

          {/* Offer Badge (Top Right) */}
          <div className="absolute top-0 right-0 p-1.5 z-20">
            {offer > 0 && (
              <div className="bg-red-600 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold shadow-md">
                -{offer}%
              </div>
            )}
          </div>

          {/* Trending Badge (Top Left) */}
          <div className="absolute top-0 left-0 p-1.5 z-20">
            {product?.isTrending && (
              <div className="bg-pink-600 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center shadow-md">
                <i className="fas fa-bolt mr-0.5 text-yellow-300 text-[8px]"></i>{" "}
                TRENDING
              </div>
            )}
          </div>
        </div>

        {/* Product Details & Price Block */}
        <div className="p-3 flex flex-col flex-grow">
          {/* Name & Brand */}
          <div className="mb-1">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-0.5">
              {product?.brand || "No Brand"}
            </p>
            <h3 className="text-base font-extrabold text-gray-900 line-clamp-2">
              {product?.productName}
            </h3>
          </div>

          {/* Category Tags & Stock Status */}
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
            <div className="flex gap-1">
              <span className="bg-indigo-100 text-indigo-700 text-[10px] px-1 py-0 rounded font-semibold">
                {product?.category}
              </span>
              <span className="bg-indigo-100 text-indigo-700 text-[10px] px-1 py-0 rounded font-semibold">
                {product?.subCategory}
              </span>
            </div>
            {/* Stock Status */}
            <div
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${stockStatus.class}`}
            >
              {stockStatus.label}
            </div>
          </div>

          {/* Price Section with Icons */}
          <div className="mt-auto flex items-end justify-between">
            <div className="flex items-baseline space-x-1">
              {/* Current Price (with Icon) */}
              <span className="text-xl font-black text-indigo-600 flex items-center">
                <i className="fas fa-money-bill-wave text-indigo-400 text-base mr-1"></i>
                {currency}
                {currentPrice}
              </span>

              {/* Original Price (with Icon) */}
              {originalPrice > currentPrice && (
                <span className="text-sm font-medium text-gray-400 line-through flex items-center">
                  <i className="fas fa-tags text-xs mr-0.5"></i>
                  {currency}
                  {originalPrice}
                </span>
              )}
            </div>

            {/* Saved Amount Badge */}
            {savedAmount > 0 && (
              <div className="text-[10px] font-extrabold text-green-700 bg-green-200 px-1.5 py-0.5 rounded-lg shadow-inner">
                SAVE {currency}
                {savedAmount}
              </div>
            )}
          </div>
        </div>

        {/* --- Action Bar --- */}
        <div className="p-2 bg-gray-50 border-t border-gray-100 flex justify-end space-x-1.5">
          <button
            onClick={() => setIsEditModeMethod(product._id)}
            title="Edit Product"
            className="flex items-center gap-1 text-[11px] font-bold transition-all duration-200 px-2 py-1.5 rounded-lg  
                                bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => handleProductDeleteClick(product._id)}
            title="Delete Product"
            className="flex items-center gap-1 text-[11px] font-bold transition-all duration-200 px-2 py-1.5 rounded-lg 
                                border border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 shadow-sm"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
