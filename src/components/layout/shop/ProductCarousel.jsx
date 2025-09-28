import React, { useState, useEffect, useMemo } from "react";
import ShopCard from "./ShopCard";

const ProductCarousel = ({
  products,
  interval = 7000,
  visibleItems = 4,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // ✅ Only duplicate if products are more than visibleItems
  const extendedProducts = useMemo(() => {
    if (products.length > visibleItems) {
      return [...products, ...products.slice(0, visibleItems)];
    }
    return products;
  }, [products, visibleItems]);

  const itemWidth = 100 / visibleItems;

  // ✅ Autoplay only if enough products to slide
  useEffect(() => {
    if (products.length <= visibleItems) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, interval);

    return () => clearInterval(timer);
  }, [products.length, interval, visibleItems]);

  // ✅ Reset loop when last “real batch” finishes
  useEffect(() => {
    if (products.length > visibleItems && currentIndex === products.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0); // snap back
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, products.length, visibleItems]);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="overflow-hidden relative rounded-xl bg-gray-50 p-4">
        <div
          className={`flex space-x-5 ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
          style={{
            
            transform: `translateX(-${currentIndex * itemWidth}%)`,
          }}
        >
          {extendedProducts.map((product, index) => (
            <div
              key={`${product.id || index}-${index}`}
              style={{ flex: `0 0 ${itemWidth}%` }}
            >
              <ShopCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
