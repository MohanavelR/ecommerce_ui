import React, { useState, useMemo, useEffect } from "react";
import Loader from "../../common/Loader";
import formatVariationKey from "../../../utils/formetVariationKey";
import Review from "./productDetail/Review";
import { useGetProductReviews } from "../../../store/review";
import {useDispatch, useSelector} from "react-redux"
const ProductDetailView = ({ product, isLoading,handleAddToCart }) => {
    if (isLoading) {
    return <Loader />;
  }
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentVariation, setCurrentVariation] = useState(null);
  const [isSeleted, setSelected] = useState({ type: null, value: null });
  const [currentImage, setCurrentImage] = useState(null);
  const [variation, setVariation] = useState(null);
  // const [currentSavedAmount, setCurrentSavedAmount] = useState(0);
  const isOutOfStock = currentVariation?.stock <= 0;
  const currentSavedAmount = currentVariation?.price?.original > 0 && currentVariation?.price?.current > 0
  ? parseFloat((currentVariation.price.original - currentVariation.price.current).toFixed(1))
  : 0;
 
  const dispatch=useDispatch()
  const variationList = groupedVariations(
    Array.isArray(product?.variations) && product?.variations.length > 0
      ? product.variations
      : []
  );

  useEffect(() => {
    if (product?.variations?.length > 0) {
      const first = product.variations[0];
      setCurrentVariation(first);
      setCurrentImage(first.image || product.images?.[0] || null);
      // setCurrentSavedAmount(
      //   (first?.price?.original > 0 && first?.price?.current > 0
      //     ? first.price.original - first.price.current
      //     : 0
      //   ).toFixed(1)
      // );
      setSelected({ type: first?.type, value: first?.value });
    } else {
      // reset if product has no variations
      setCurrentVariation(null);
      setCurrentImage(product?.images?.[0] || null);
      // setCurrentSavedAmount(0);
    }
  }, [product]);
 const {reviews,isLoading:reviewLoading}=useSelector(state=>state.review)
useEffect(() => {
  if (product && product._id) {
    dispatch(useGetProductReviews(product._id));
  }
}, [product, product?._id, dispatch]);
  

  
  function groupedVariations(variations = []) {
    if (variations.length === 0) {
      return {};
    }
    const obj = variations.reduce((acc, curr) => {
      if (!acc[curr.type]) {
        acc[curr.type] = [];
      }
      acc[curr.type].push({
        ...curr,
      });
      return acc;
    }, {});
    return obj;
  }
  function ChangeVariation(v) {
    setCurrentVariation(v);
    setCurrentImage(v?.image);
    setVariation(formatVariationKey(v));
    setSelected({ value: v.value, type: v.type });
  }
  function changeImage(index = 0, image) {
    setSelectedImageIndex(index);
    setSelected({ type: product.variations[0].type, value:product.variations[0].value });
    setCurrentVariation(product.variations[0]);
    setCurrentImage(image);
    setVariation(null);
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-red-600 border border-red-300 bg-red-50 rounded-lg p-6">
        <h2 className="text-xl font-bold">Error: Product Data Missing</h2>
        <p>
          Could not load product details. Please ensure a valid `product` object
          is passed to the component.
        </p>
      </div>
    );
  }
  // --------------------------------------------------------

  const [activeTab, setActiveTab] = useState("Description");
  const productCreationDate = new Date(product?.createdAt).getTime();
  const isNewArrival =
    !isNaN(productCreationDate) &&
    Date.now() - productCreationDate < 7 * 24 * 60 * 60 * 1000;
  const tabContent = {
    Description: (
      <ul className="space-y-4">
        {Array.isArray(product?.description) &&
          product?.description.map((desc, index) => (
            <li key={index} className="text-gray-700">
              {desc}
            </li>
          ))}
        {!Array.isArray(product?.description) && (
          <li className="text-gray-500 italic">No description available.</li>
        )}
      </ul>
    ),
    Features: (
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {Array.isArray(product?.features) &&
          product?.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        {!Array.isArray(product?.features) && (
          <li className="text-gray-500 italic">No features listed.</li>
        )}
      </ul>
    ),
    "Additional Information": (
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {Array.isArray(product?.additionalInfo) &&
          product?.additionalInfo.map((info, index) => (
            <li key={index}>{info}</li>
          ))}
        {!Array.isArray(product?.additionalInfo) && (
          <li className="text-gray-500 italic">No specifications listed.</li>
        )}
      </ul>
    ),
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery Column */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
            <img
              id="main-image"
              // Safely access the image URL
              src={currentImage}
              alt={product.productName}
              className="w-full h-full object-cover"
            />

            {/* Badges on Main Image */}
            <div className="absolute top-4 left-4 flex space-x-2">
              {isNewArrival && (
                <span className="bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                  NEW
                </span>
              )}
              {currentVariation > 0 && (
                <span className="bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                  -{product?.offer}%
                </span>
              )}
              {product?.isTrending && !isNewArrival && (
                <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                  Trending
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer ${
                    selectedImageIndex === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => changeImage(index, image)}
                >
                  <img
                    src={image}
                    alt={`${product.productName} Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product?.productName}
                </h1>
              </div>
              {/* Trending Badge */}
              {product?.isTrending && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  <svg
                    className="-ml-1 mr-1.5 h-2 w-2 text-red-800"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  Trending
                </span>
              )}
            </div>
          </div>

          {/* Price and Stock */}
          <div className="space-y-2">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">
                {currentVariation?.price?.currency}
                {currentVariation?.price?.current}
              </span>
              {currentVariation?.price?.original > 0 &&
                currentSavedAmount > 0 && (
                  <span className="ml-2 text-xl text-gray-500 line-through">
                    {currentVariation?.price?.currency}
                    {currentVariation?.price?.original}
                  </span>
                )}
              {currentSavedAmount > 0 && (
                <span className="ml-2 text-sm font-medium text-green-600">
                  Save {currentVariation?.price?.currency}
                  {currentSavedAmount}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">Inclusive of all taxes</p>
          </div>

          {/* Stock Status */}
          <div className="flex items-center">
            <i
              className={`h-5 w-5 mr-2 fas ${
                isOutOfStock
                  ? "fa-times-circle text-red-600"
                  : "fa-check-circle text-green-500"
              }`}
            ></i>
            <span
              className={`text-sm font-medium ${
                isOutOfStock ? "text-red-600" : "text-green-600"
              }`}
            >
              {isOutOfStock
                ? "Out of Stock"
                : `In Stock (${currentVariation?.stock} units available)`}
            </span>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <span className="text-gray-500">Category:</span>
              <span className="ml-1 font-medium">{product?.category}</span>
            </div>
            <div>
              <span className="text-gray-500">Subcategory:</span>
              <span className="ml-1 font-medium">{product?.subCategory}</span>
            </div>
            <div>
              <span className="text-gray-500">Brand:</span>
              <span className="ml-1 font-medium">{product?.brand}</span>
            </div>
          </div>
          {currentVariation?.offer > 0 && (
            /* Offer Alert */

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="fas fa-gift h-5 w-5 text-yellow-400"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <span className="font-medium">Special Offer!</span>{" "}
                    {currentVariation?.offer}
                  </p>
                </div>
              </div>
            </div>
          )}

          {product?.variations && product?.variations.length > 0 && (
            /* Variation Selection */
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Select Options
              </h3>
              {Object.entries(variationList).map(([type, variations]) => (
                <div key={type}>
                  <h4 className="text-sm md:text-2xl font-bold text-gray-700 mb-2">
                    {type}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {variations.map((v) => (
                      <button
                        key={v.value}
                        onClick={() => ChangeVariation(v)}
                        disabled={
                          isSeleted.type == v.type && isSeleted.value == v.value
                        }
                        className={`px-4 py-2 border disabled:cursor-default ${
                          isSeleted.type == v.type && isSeleted.value == v.value
                            ? "border-2 bg-primary border-none  text-accent "
                            : "text-gray-500 hover:bg-gray-50"
                        } rounded-md  text-sm font-medium transition border-gray-300 `}
                      >
                        {v.value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="flex space-x-4">
            <button
              onClick={()=>handleAddToCart(product._id,currentVariation,1)}
              disabled={isOutOfStock}
              className={`flex-1 py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition ${
                !isOutOfStock
                  ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isOutOfStock ? "Sold Out" : "Add to Cart"}
            </button>
            <button
              className="p-3 border border-gray-300 rounded-md hover:bg-gray-50"
              title="Add to Wishlist"
            >
              <i className="far fa-heart h-6 w-6 text-gray-600"></i>
            </button>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex space-x-8">
              {product.description && product.description.length > 0 && (
                <button
                  onClick={() => setActiveTab("Description")}
                  className={`text-sm font-medium pb-2 transition ${
                    activeTab === "Description"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
                  }`}
                >
                  Description
                </button>
              )}
              {product.features && product.features.length > 0 && (
                <button
                  onClick={() => setActiveTab("Features")}
                  className={`text-sm font-medium pb-2 transition ${
                    activeTab === "Features"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
                  }`}
                >
                  Features
                </button>
              )}
              {product.additionalInfo && product.additionalInfo.length > 0 && (
                <button
                  onClick={() => setActiveTab("Additional Information")}
                  className={`text-sm font-medium pb-2 transition ${
                    activeTab === "Additional Information"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
                  }`}
                >
                  Additional Information
                </button>
              )}
            </div>

            <div className="mt-4">{tabContent[activeTab]}</div>
          </div>
        </div>
      </div>
        <div className="mt-4">
         <Review reviews={reviews} isLoading={reviewLoading} productId={product?._id} />
        </div>
    </div>
  );
};

export default ProductDetailView;
