import React from 'react'

const MobileViewHeader = ({isOpen}) => {
  return (
    <>
{
    isOpen &&
<div id="mobile-nav-menu" class=" lg:hidden py-4 border-t border-border">
            <nav class="space-y-4">
                <a href="/" class="block text-foreground hover:text-primary transition-colors duration-200">
                    Home
                </a>
                
                <div class="space-y-2">
                    <h3 class="font-medium text-foreground">Shop</h3>
                    <div class="pl-4 space-y-2">
                        <a href="/shop" class="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                            All Products
                        </a>
                        <a href="/shop?category=electronics" class="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                            Electronics
                        </a>
                        <a href="/shop?category=clothing" class="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                            Clothing
                        </a>
                        <a href="/shop?category=home-garden" class="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                            Home & Garden
                        </a>
                        <a href="/shop?category=sports" class="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                            Sports
                        </a>
                    </div>
                </div>
                <div class="space-y-2">
                    <h3 class="font-medium text-foreground">Categories</h3>
                    <div class="pl-4 space-y-2">
                        <a href="/shop?filter=new" class="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                            New Arrivals
                        </a>
                        <a href="/shop?filter=bestseller" class="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                            Best Sellers
                        </a>
                        <a href="/shop?filter=sale" class="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                            On Sale
                        </a>
                        <a href="/shop?filter=featured" class="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                            Featured
                        </a>
                    </div>
                </div>
                <div class="space-y-2">
                    <h3 class="font-medium text-foreground">Services</h3>
                    <div class="pl-4 space-y-2">
                        <a href="/contact" class="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                            Customer Support
                        </a>
                        <a href="/faq#shipping" class="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                            Shipping Info
                        </a>
                        <a href="/faq#returns" class="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                            Returns
                        </a>
                        <a href="/orders" class="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                            Track Order
                        </a>
                    </div>
                </div>
            </nav>
</div>
}
    </>
  )
}

export default MobileViewHeader
