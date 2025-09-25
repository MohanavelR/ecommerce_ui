import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useGetProductById } from '../../../store/productSlice'

const ProductCard = ({product,isEditMode,openProductForm,setIsEditMode,id,setId}) => {
async  function setIsEditModeMethod(id){
        setIsEditMode(true)
        setId(id)
       openProductForm()
  }
  return (
    <>
<div className="card-product group">
      <div className="relative overflow-hidden">
        <button onClick={()=>setIsEditModeMethod(product?._id)}>
          <img
            src={product.images[0]}
            alt={product.productName}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </button>
        
        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-4 left-4 px-2 py-1 rounded text-xs font-semibold ${getBadgeColor(product.badge)}`}>
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200 opacity-0 group-hover:opacity-100">
          {/* <Heart className="w-4 h-4 text-muted-foreground hover:text-destructive" /> */}
        </button>

        {/* Quick Add to Cart */}
        <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex items-center space-x-2">
          {/* <ShoppingCart className="w-4 h-4" /> */}
          <span className="text-sm font-medium">Add to Cart</span>
        </button>
      </div>

      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {/* {[...Array(5)].map((_, i) => (
            //   <Star
            //     key={i}
            //     className={`w-4 h-4 ${
            //       i < Math.floor(product.rating)
            //         ? 'text-accent-gold fill-current'
            //         : 'text-muted-foreground'
            //     }`}
            //   />
            ))} */}
          </div>
          {/* <span className="text-sm text-muted-foreground">
            {product} ({product.reviews})
          </span> */}
        </div>

        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-foreground mb-3 hover:text-primary transition-colors duration-200 line-clamp-2">
            {product.productName}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">
            ${product.price.current}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.price.original}
            </span>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductCard