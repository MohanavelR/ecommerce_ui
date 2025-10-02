// utils/generateVariationKey.js

function generateVariationKey(productName) {
  if (!productName) throw new Error("Product name is required");
  
  // Clean product name: remove spaces and lowercase
  const cleanName = productName.replace(/\s+/g, "-").toLowerCase();

  // Generate key
  const key = `${Date.now()}_${cleanName}_${Math.floor(Math.random() * 1000)}`;

  return key;
}

export default generateVariationKey;
