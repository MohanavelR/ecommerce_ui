import React, { useState, useEffect, useMemo } from "react";
import HomeShopCard from "./HomeShopCard";


const ProductCarousel = ({ products, interval = 7000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleItems, setVisibleItems] = useState(4); 
  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleItems(1); // mobile
      } else if (width < 1024) {
        setVisibleItems(2); // tablet
      } else if (width < 1280) {
        setVisibleItems(3); // laptop
      } else {
        setVisibleItems(4); // desktop
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);


  const extendedProducts = useMemo(() => {
    if (products.length > visibleItems) {
      return [...products, ...products.slice(0, visibleItems)];
    }
    return products;
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


  useEffect(() => {
    if (products.length > visibleItems && currentIndex === products.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0); 
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, products.length, visibleItems]);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="overflow-hidden relative rounded-xl bg-gray-50 p-4">
        <div
          className={`flex space-x-1 ${
            isTransitioning
              ? "transition-transform duration-700 ease-in-out"
              : ""
          }`}
          style={{
            transform: `translateX(-${currentIndex * itemWidth}%)`,
          }}
        >
          {extendedProducts.map((product, index) => (
            <div
              key={`${product.id || index}-${index}`}
              style={{ flex: `0 0 ${itemWidth}%` }}
            >
              <HomeShopCard width={"w-69"} product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
