export const loginErrorObj={
    email:{
        isRequired:false,
    },
    password:{
     isRequired:false
    }
}

export const registerError={
    email:{
        isRequired:false,
    },
    password:{
        isRequired:false,
        lengthError:false
    },
    firstname:{
        isRequired:false
    },

    re_password:{
        isRequired:false,
        matchError:false
    }
}

// Product-level errors
export const productError = {
  productName: { isRequired: false },
  category: { isRequired: false },       
  subCategory: { isRequired: false },    
  brand: { isRequired: false },
  description: { isRequired: false },
  images: { isRequired: false, invalidFormat: false },
  isTrending: { invalidValue: false },
  variations: { 
    missingType: false,
    missingValue: false,
    invalidPrice: false,
    invalidOffer: false,
    invalidStock: false,
    invalidImage: false
  }
};

// Variation-level errors
export const variationError = {
  type: { isRequired: false },
  value: { isRequired: false },
  price: {
    current: { isRequired: false, mustBePositive: false },
    original: { mustBePositive: false,mustBeBig:false },
    currency: { invalidFormat: false }
  },
  offer: { mustBePositive: false },
  stock: { isRequired: false, mustBePositive: false },
  image: { isRequired: false, formatError: false } // URL or file validation
};

export const categoryError={
  categoryName:false,
  subCategory:false
}
export const comingError={
  title:false,
  image:false
}
export const bannerError={
  title:false,
  image:false
}

export const SliderErrors = {
  title: null,        // "Title is required"
  subtitle: null,     // optional → can stay null
  description: null,  // optional → can stay null
  image: null,        // "Image is required"
  isActive: null      // generally no error (boolean)
};

export const addressError = {
  // Address identification and owner
  title: { 
    isRequired: false, 
    maxLengthExceeded: false 
  },
  userId: { 
    isRequired: false, 
    invalidFormat: false // Not a valid ObjectId
  },
  
  // Geographical/Physical address
  address: { 
    isRequired: false, 
    maxLengthExceeded: false 
  },
  city: { 
    isRequired: false 
  },
  pincode: { 
    isRequired: false, 
    invalidFormat: false // Does not match postal code pattern
  },
  
  // Contact information
  phone: { 
    isRequired: false, 
    invalidFormat: false // Does not match phone number pattern
  },
};