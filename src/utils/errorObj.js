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
export const productError = {
  productName: {
    isRequired: false,
  },
  stock: {
      isRequired: false,
      invalidNumber: false,
    },
  price: {
    current: {
      isRequired: false,
      invalidNumber: false,
    },
    original: {
      invalidNumber: false,
    },
  },
  category: {
    isRequired: false,
  },
  subCategory: {
    isRequired: false,
  },
  brand: {
    isRequired: false,
  },
  offer: {
    invalidFormat: false,
  },
  description: {
    isRequired: false,
  },
  features: {
    isRequired: false,
  },
  additionalInfo: {
    isRequired: false,
  },
  images: {
    isRequired: false,
    invalidFormat: false,
  },
  isTrending: {
    invalidValue: false,
  },
  variations: {
    missingType: false,
    missingValue: false,
    invalidPrice: false,
    invalidStock: false,
  },
};

export const variationError = {
  type: {
    isRequired: false
  },
  value: {
    isRequired: false
  },
  price: {
    isRequired: false,
    mustBePositive: false
  },
  stock: {
    isRequired: false,
    mustBePositive: false
  },
  image: {
    isRequired: false,
    formatError: false // e.g., not a valid URL
  }
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