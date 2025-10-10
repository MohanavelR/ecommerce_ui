// ✅ Reusable phone number validation function
const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/; // 10 digits, starts with 6–9
  return phoneRegex.test(phone);
};
export default isValidPhoneNumber