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
  images: {
    isRequired: false,
    formatError: false // e.g., not a valid URL
  }
};

