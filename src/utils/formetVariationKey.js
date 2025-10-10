function formatVariationKey(variation) {
  if (!variation || !variation.type || !variation.value) return '';
  return `${variation.type.toUpperCase()}-${variation.value.toUpperCase()}`;
}
export default formatVariationKey