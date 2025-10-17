function generateSKU(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // spaces → dashes
    .replace(/[\/\\?#&%+,:;@'"\.!\$*\^()\{\}\[\]\|<>=]/g, "-") // remove special chars
    .replace(/-+/g, "-") // multiple dashes → one
    .replace(/^-|-$/g, ""); // remove leading/trailing dashes
}
export default generateSKU