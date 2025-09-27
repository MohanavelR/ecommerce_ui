import React, { useState, useMemo } from 'react';

// --- UPDATED Example Product Data (Matching your Schema) ---
const exampleProduct = {
    productName: "Supreme Leather Comfort Boots", // Updated
    stock: 45,     
    sku: "FASH-FTW-LB-03", 
    price: {
      current: 4999,
      original: 7999,
      currency: "₹"
    },
    category: "Fashion", // *** CHANGED ***
    subCategory: "Footwear", // *** CHANGED ***
    brand: "SoleStride", // *** CHANGED ***
    offer: "38% OFF",
    description: ["Handcrafted with premium Italian leather for superior durability and style.", "Features a cushioned insole for all-day comfort and a slip-resistant outsole."],
    features: ["Genuine Leather Upper", "Orthopedic Insole", "Water-Resistant Finish", "Hand-Stitched Detailing"],
    additionalInfo: ["30-Day Free Returns", "Lifetime Repair Guarantee", "Ships in Eco-Friendly Packaging"],      
    images: [
      "https://picsum.photos/seed/shoes1/600/500", // Updated
      "https://picsum.photos/seed/shoes2/600/500", // Updated
      "https://picsum.photos/seed/shoes3/600/500", // Updated
    ],              
    isTrending: true,  
    variations: [
      { type: "Color", value: "Brown", price: 0, stock: 45, images: [] }, // Updated color
      { type: "Color", value: "Black", price: 0, stock: 20, images: ["https://picsum.photos/seed/shoes4/600/500"] }, // Updated color image
      { type: "Size", value: "8", price: -100, stock: 10, images: [] }, // Updated size
      { type: "Size", value: "11", price: 500, stock: 5, images: [] }, // Updated size
    ],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
};
// -----------------------------------------------------

const ProductDetailView = ({ product = exampleProduct }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedVariations, setSelectedVariations] = useState({});
    const [activeTab, setActiveTab] = useState('Description');

    // --- Dynamic Price and Stock Calculation ---
    const { finalPrice, totalStock } = useMemo(() => {
        let priceAdjustment = 0;
        let effectiveStock = product.stock;

        const groupedVariations = product.variations.reduce((acc, v) => {
            acc[v.type] = acc[v.type] || [];
            acc[v.type].push(v);
            return acc;
        }, {});

        Object.keys(groupedVariations).forEach(type => {
            const selectedValue = selectedVariations[type];
            if (selectedValue) {
                const variation = product.variations.find(v => v.type === type && v.value === selectedValue);
                if (variation) {
                    priceAdjustment += variation.price;
                    effectiveStock = variation.stock; 
                }
            }
        });

        const finalPrice = product.price.current + priceAdjustment;
        
        return { 
            finalPrice, 
            totalStock: effectiveStock 
        };
    }, [product.stock, product.price.current, product.variations, selectedVariations]);
    // -------------------------------------------

    const isOutOfStock = totalStock <= 0;
    const currentPriceDisplay = product.price.currency + finalPrice.toLocaleString();
    const originalPriceDisplay = product.price.currency + product.price.original?.toLocaleString();
    const isNewArrival = (Date.now() - new Date(product.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000);
    
    const savedAmount = product.price.original ? (product.price.original - finalPrice) : 0;
    const savedAmountDisplay = product.price.currency + savedAmount.toLocaleString();
    
    const handleVariationChange = (type, value) => {
        setSelectedVariations(prev => ({
            ...prev,
            [type]: value,
        }));
    };

    const handleAddToCart = () => {
        if (isOutOfStock) return;
        alert(`Added ${product.productName} (${JSON.stringify(selectedVariations)}) to cart!`);
    };

    const groupedVariations = useMemo(() => {
        return product.variations.reduce((acc, v) => {
            acc[v.type] = acc[v.type] || [];
            if (!acc[v.type].some(item => item.value === v.value)) {
                 acc[v.type].push(v);
            }
            return acc;
        }, {});
    }, [product.variations]);
    
    const allImages = useMemo(() => {
        let images = [...product.images];
        Object.keys(selectedVariations).forEach(type => {
            const selectedValue = selectedVariations[type];
            const variation = product.variations.find(v => v.type === type && v.value === selectedValue);
            
            if (variation && variation.images.length > 0) {
                const newImages = variation.images;
                if (JSON.stringify(images) !== JSON.stringify(newImages)) {
                    images = newImages;
                    setSelectedImageIndex(0);
                } else {
                    images = newImages;
                }
            }
        });
        return images;
    }, [product.images, product.variations, selectedVariations]);
    
    const tabContent = {
        Description: (
            <ul className="space-y-4">
                {product.description.map((desc, index) => <li key={index} className="text-gray-700">{desc}</li>)}
            </ul>
        ),
        Features: (
            <ul className="list-disc list-inside text-gray-700 space-y-1">
                {product.features.map((feature, index) => <li key={index}>{feature}</li>)}
            </ul>
        ),
        Specifications: (
             <ul className="list-disc list-inside text-gray-700 space-y-1">
                {product.additionalInfo.map((info, index) => <li key={index}>{info}</li>)}
            </ul>
        ),
    };

    const getColorClassName = (colorName) => {
        switch (colorName.toLowerCase()) {
            case 'black': return 'bg-gray-900';
            case 'brown': return 'bg-amber-800'; // Added Brown
            case 'white': return 'bg-white border border-gray-300';
            case 'blue': return 'bg-blue-600';
            case 'red': return 'bg-red-600';
            default: return 'bg-gray-400';
        }
    };

    return (
        <>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* */}
    <div className="space-y-4">
      {/* */}
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
        <img id="main-image" 
             src={allImages[selectedImageIndex] || "https://via.placeholder.com/600"} 
             alt={product.productName} 
             className="w-full h-full object-cover"/>
        
        {/* Badges on Main Image */}
        <div className="absolute top-4 left-4 flex space-x-2">
            {isNewArrival && (
                <span className="bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">NEW</span>
            )}
            {product.offer && (
                <span className="bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">{product.offer}</span>
            )}
            {product.isTrending && !isNewArrival && (
                <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">Trending</span>
            )}
        </div>
      </div>
      
      {/* */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {allImages.map((image, index) => (
            <div 
                key={index} 
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer ${
                    selectedImageIndex === index ? 'border-blue-500' : 'border-gray-300'
                }`}
                onClick={() => setSelectedImageIndex(index)}
            >
                <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                />
            </div>
        ))}
      </div>
    </div>

    {/* */}
    <div className="space-y-6">
      {/* */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.productName}</h1>
            {/* <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p> */}
          </div>
          {/* */}
          {product.isTrending && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                <svg className="-ml-1 mr-1.5 h-2 w-2 text-red-800" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3"/>
                </svg>
                Trending
            </span>
          )}
        </div>
      </div>

      {/* */}
      <div className="space-y-2">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">{currentPriceDisplay}</span>
          {product.price.original && product.price.original > finalPrice && (
            <span className="ml-2 text-xl text-gray-500 line-through">{originalPriceDisplay}</span>
          )}
          {savedAmount > 0 && (
            <span className="ml-2 text-sm font-medium text-green-600">Save {savedAmountDisplay}</span>
          )}
        </div>
        <p className="text-sm text-gray-500">Inclusive of all taxes</p>
      </div>

      {/* */}
      <div className="flex items-center">
        <i className={`h-5 w-5 mr-2 fas ${isOutOfStock ? 'fa-times-circle text-red-600' : 'fa-check-circle text-green-500'}`}></i>
        <span className={`text-sm font-medium ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
            {isOutOfStock ? 'Out of Stock' : `In Stock (${totalStock} units available)`}
        </span>
      </div>

      {/* */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div>
          <span className="text-gray-500">Category:</span>
          <span className="ml-1 font-medium">{product.category}</span>
        </div>
        <div>
          <span className="text-gray-500">Subcategory:</span>
          <span className="ml-1 font-medium">{product.subCategory}</span>
        </div>
        <div>
          <span className="text-gray-500">Brand:</span>
          <span className="ml-1 font-medium">{product.brand}</span>
        </div>
      </div>

      {/* */}
      {product.offer && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-gift h-5 w-5 text-yellow-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <span className="font-medium">Special Offer!</span> {product.offer}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Select Options</h3>
        
        {Object.entries(groupedVariations).map(([type, variations]) => (
            <div key={type}>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {type}: <span className="text-blue-600">{selectedVariations[type]}</span>
                </h4>
                <div className="flex space-x-2">
                    {variations.map((v) => {
                        const isSelected = selectedVariations[type] === v.value;
                        
                        if (type === 'Color') {
                            // Render as a color swatch button
                            return (
                                <button
                                    key={v.value}
                                    title={v.value}
                                    onClick={() => handleVariationChange(type, v.value)}
                                    className={`w-10 h-10 rounded-full border-2 transition ${
                                        getColorClassName(v.value)
                                    } ${
                                        isSelected
                                            ? 'border-blue-500 ring-2 ring-blue-300'
                                            : 'border-gray-300 hover:border-blue-400'
                                    }`}
                                ></button>
                            );
                        } else {
                            // Render as a text button (Size, Material, etc.)
                            return (
                                <button
                                    key={v.value}
                                    onClick={() => handleVariationChange(type, v.value)}
                                    className={`px-4 py-2 border rounded-md text-sm font-medium transition ${
                                        isSelected
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {v.value}
                                    {v.price !== 0 && (
                                        <span className="ml-1 text-xs">
                                            ({v.price > 0 ? `+${product.price.currency}${v.price}` : `-${product.price.currency}${Math.abs(v.price)}`})
                                        </span>
                                    )}
                                </button>
                            );
                        }
                    })}
                </div>
            </div>
        ))}
      </div>

      {/* */}
      <div className="flex space-x-4">
        <button 
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex-1 py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition ${
                !isOutOfStock
                    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
        </button>
        <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
          <i className="far fa-heart h-6 w-6 text-gray-600"></i>
        </button>
      </div>

      {/* */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex space-x-8">
          {['Description', 'Features', 'Specifications'].map(tab => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium pb-2 ${
                    activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                }`}
            >
                {tab}
            </button>
          ))}
        </div>
        
        <div className="mt-4">
            {tabContent[activeTab]}
        </div>
      </div>
    </div>
  </div>
</div>
        </>
    );
};

export default ProductDetailView;