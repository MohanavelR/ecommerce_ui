import React from "react";
import hero from '../../../../assets/images/my-image/hero.jpg';
// Using a professional deep blue to simulate your custom 'bg-pr-primary'

const PRIMARY_LIGHT_ACCENT = "text-sky-200";

const BreadcrumbBanner = ({
  pageTitle = "About Us",
  currentPage = "About Us",
}) => {
  return (
    <div className={`w-full h-100 relative overflow-hidden`}>
      <img
        src={hero}
        alt="Decorative Background"
        loading='lazy'
      
        className="absolute inset-0 z-0 object-cover w-full h-full"
      />

    <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary via-primary/80 to-via-primary/70 to-transparent"></div>     
     <div className="relative z-20 h-full flex items-center justify-center text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl capitalize font-extrabold tracking-tight leading-none">
            {pageTitle}
          </h1>

          <nav aria-label="Breadcrumb" className="mt-4">
            <ol
              role="list"
              className="flex items-center justify-center text-lg"
            >
              <li>
                <a
                  href="index.html"
                  className={`font-medium ${PRIMARY_LIGHT_ACCENT} hover:text-white transition duration-200`}
                >
                  Home
                </a>
              </li>

              <li aria-hidden="true" className="flex items-center">
                <i
                  className={`fa-solid fa-angle-right mx-3  capitalize text-base ${PRIMARY_LIGHT_ACCENT}`}
                ></i>
              </li>

              <li>
                <span
                  className="font-medium capitalize text-white"
                  aria-current="page"
                >
                  {currentPage}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbBanner;
