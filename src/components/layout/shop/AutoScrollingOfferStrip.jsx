import React, { useState, useEffect, useMemo } from "react";
import ShopCard from "./ShopCard";

const carouselProducts = [
  { productName: "Supreme Leather Boots", price: { current: 4999, currency: "₹" }, offer: "50% OFF", brand: "SoleStride", id: 1 },
  { productName: "ANC Wireless Earbuds", price: { current: 2999, currency: "₹" }, offer: "30% OFF", brand: "AudioPro", id: 2 },
  { productName: "Vintage Denim Jacket", price: { current: 3500, currency: "₹" }, offer: "BOGO FREE", brand: "UrbanWear", id: 3 },
{ productName: "Supreme Leather Boots", price: { current: 4999, currency: "₹" }, offer: "50% OFF", brand: "SoleStride", id: 1 },
  { productName: "ANC Wireless Earbuds", price: { current: 2999, currency: "₹" }, offer: "30% OFF", brand: "AudioPro", id: 2 },
];

const ProductCarouselStrip = ({
  products = carouselProducts,
  interval = 7000,
  visibleItems = 4,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const extendedProducts = useMemo(() => {
    return [...products, ...products.slice(0, visibleItems)];
  }, [products, visibleItems]);

  const itemWidth = 100 / visibleItems;

  useEffect(() => {
    if (products.length <= visibleItems) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, interval);

    return () => clearInterval(timer);
  }, [products.length, interval, visibleItems]);

  // ✅ Reset loop when the last “real batch” finishes
  useEffect(() => {
    if (currentIndex === products.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0); // snap back
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, products.length]);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4 border-b-2 border-indigo-100 pb-2">
        Offer Products
      </h2>

      <div className="overflow-hidden relative rounded-xl bg-gray-50 p-4">
        <div
          className={`flex space-x-5 ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
          style={{
           
            transform: `translateX(-${currentIndex * itemWidth}%)`,
          }}
        >
          {extendedProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} style={{ flex: `0 0 ${itemWidth}%` }}>
              <ShopCard  />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarouselStrip;
