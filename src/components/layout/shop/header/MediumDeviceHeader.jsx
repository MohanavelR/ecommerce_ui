import React from 'react'

const MediumDeviceHeader = () => {
  return (
    <>
 <nav className="hidden lg:flex items-center z-[9999] space-x-6 xl:space-x-8 font-medium">
  {/* Home Link */}
  <a href="/" className="text-foreground hover:text-primary transition-colors duration-300 relative group">
    Home
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
  </a>

  {/* Shop Dropdown */}
  <div className="relative group">
    <button className="text-foreground hover:text-primary transition-colors duration-300 flex items-center space-x-1 relative">
      <span>Shop</span>
      <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
    </button>
    <div className="absolute  top-full left-1/2 -translate-x-1/2 mt-4 w-52 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 bg-background border border-border rounded-lg shadow-xl overflow-hidden">
      <div className="py-2">
        <a href="/shop" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">
          All Products
        </a>
        <a href="/shop?category=electronics" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">
          Electronics
        </a>
        <a href="/shop?category=clothing" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">
          Clothing
        </a>
        <a href="/shop?category=home-garden" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">
          Home & Garden
        </a>
        <a href="/shop?category=sports" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">
          Sports
        </a>
      </div>
    </div>
  </div>

  {/* Categories Dropdown */}
  <div className="relative group">
    <button className="text-foreground hover:text-primary transition-colors duration-300 flex items-center space-x-1 relative">
      <span>Categories</span>
      <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
    </button>
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 bg-background border border-border rounded-lg shadow-xl overflow-hidden">
      <div className="py-2">
        <a href="/shop?filter=new" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">
          New Arrivals
        </a>
        <a href="/shop?filter=bestseller" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">
          Best Sellers
        </a>
        <a href="/shop?filter=sale" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">
          On Sale
        </a>
        <a href="/shop?filter=featured" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">
          Featured
        </a>
      </div>
    </div>
  </div>

  {/* Services Dropdown */}
  <div className="relative group">
    <button className="text-foreground hover:text-primary transition-colors duration-300 flex items-center space-x-1 relative">
      <span>Services</span>
      <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
    </button>
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 bg-background border border-border rounded-lg shadow-xl overflow-hidden">
      <div className="py-2">
        <a href="/contact" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">
          Customer Support
        </a>
        <a href="/faq#shipping" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">
          Shipping Info
        </a>
        <a href="/faq#returns" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">
          Returns
        </a>
        <a href="/orders" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">
          Track Order
        </a>
      </div>
    </div>
  </div>
</nav>
    </>
  )
}

export default MediumDeviceHeader