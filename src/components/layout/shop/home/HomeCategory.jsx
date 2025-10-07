import React from 'react';
import { Link } from 'react-router-dom';
import HeadingHome from './HeadingHome';



const HomeCategory = ({categories}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <HeadingHome heading={"By Category"} primaryText='Shop' />
        <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          { categories&& categories.length > 0 && categories.map((category) => (
            <Link 
              key={category.categoryName} 
              to={`/shop/category/${category.categorySKU}`} 
              className="group block p-5 rounded-lg bg-white 
                         shadow-sm hover:shadow-lg transition duration-200 
                         border-l-4 border-transparent hover:border-primary 
                         transform hover:scale-[1.02]"
            >
              <div className="flex justify-between items-center">
                {/* Category Name - Bolder and slightly larger */}
                <h3 className="text-base font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200">
                  {category.categoryName}
                </h3>
                
                {/* Subtle Arrow Indicator */}
                <span className="text-gray-400 group-hover:text-primary  transition duration-200 group-hover:translate-x-1">
                  &rarr; 
                </span>
              </div>
            </Link>
          ))}
        </div>


       
      </div>
    </section>
  );
};

export default HomeCategory;