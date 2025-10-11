import React, { useContext, useState } from "react";
import { deepcopyObj } from "../../utils/deepCopyObj";
import { registerError } from "../../utils/errorObj";
import Loader from "../../components/common/Loader";
import { useDispatch } from "react-redux";
import { useCreateUser } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { MessageContext } from "../../context/context";
import isValidPhoneNumber from "../../utils/CheckVaildPhoneNumber";

const Register = () => {
  const { messageContextState, setMessageContextState } =
    useContext(MessageContext);
const [showPasswords, setShowPasswords] = useState(false);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState(deepcopyObj(registerError));
  const [confirm_password, setconfirm_password] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();

  async function handlesubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    let hasError = false;
    const localError = deepcopyObj(registerError);

    if (formData.firstName === "") {
      hasError = true;
      localError.firstname.isRequired = true;
    }
    if (formData.phoneNumber === "") {
      hasError = true;
      localError.phoneNumber.isRequired = true;
    }
    if (
      !localError.phoneNumber.isRequired &&
      !isValidPhoneNumber(formData.phoneNumber)
    ) {
      hasError = true;
      localError.phoneNumber.isValidError = true;
    }
    if (formData.email === "") {
      hasError = true;
      localError.email.isRequired = true;
    }
    if (formData.password === "") {
      hasError = true;
      localError.password.isRequired = true;
    }
    if (formData.password.length < 8 && !localError.password.isRequired) {
      hasError = true;
      localError.password.lengthError = true;
    }
    if (
      !localError.password.lengthError &&
      formData.password !== confirm_password
    ) {
      hasError = true;
      localError.re_password.matchError = true;
    }
    setFieldErrors({ ...localError });
    if (!hasError) {
      dispatch(useCreateUser(formData)).then((res) => {
        if (res.payload?.success) {
          setIsLoading(false);
          setMessageContextState({
            ...messageContextState,
            is_show: true,
            text: res.payload?.message,
            success: true,
          });
          nav("/auth/login");
        } else {
          setIsLoading(false);
          setMessageContextState({
            ...messageContextState,
            is_show: true,
            text: res.payload?.message,
            success: false,
          });
        }
      });
    } else {
      setIsLoading(false);
      setTimeout(() => {
        setFieldErrors(deepcopyObj(registerError));
      }, 3000);
    }
  }

  return (
    <div className="auth-form-box">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="auth-heading">Create Account</h2>
        <p className="auth-sub-heading">
          Join EcoShop for a sustainable future
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handlesubmit} className="space-y-5">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label htmlFor="firstname" className="auth-form-label">
              First Name<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-primary"></i>
              <input
                id="firstname"
                type="text"
                name="firstname"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="auth-form-input-with-icon"
                placeholder="John"
              />
            </div>
            {fieldErrors.firstname.isRequired && (
              <p className="fielderror">
                First name is required
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastname" className="auth-form-label">
              Last Name
            </label>
            <div className="relative">
              <i className="fas fa-user-tag absolute left-4 top-1/2 -translate-y-1/2 text-primary"></i>
              <input
                id="lastname"
                type="text"
                name="lastname"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="auth-form-input-with-icon"
                placeholder="Doe"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="auth-form-label">
            Email Address<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-primary"></i>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="auth-form-input-with-icon"
              placeholder="you@example.com"
            />
          </div>
          {fieldErrors.email.isRequired && (
            <p className="fielderror">Email is required</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="auth-form-label">
            Mobile<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <i className="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-primary"></i>
            <input
              id="phone"
              type="text"
              name="phone"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="auth-form-input-with-icon"
              placeholder="Enter mobile number"
            />
          </div>
          {fieldErrors.phoneNumber.isRequired && (
            <p className="fielderror">
              Mobile number is required
            </p>
          )}
          {fieldErrors.phoneNumber.isValidError && (
            <p className="fielderror">Invalid mobile number</p>
          )}
        </div>

        {/* Password + Confirm Password */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {/* Password */}
  <div>
    <label htmlFor="password" className="auth-form-label">
      Password<span className="text-red-500">*</span>
    </label>
    <div className="mt-1 relative">
      <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-primary"></i>
      <input
        id="password"
        type={showPasswords ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
        className="auth-form-input-with-icon"
        placeholder="••••••••"
      />
    </div>

    {fieldErrors.password.isRequired && (
      <p className="fielderror">Password is required</p>
    )}
    {fieldErrors.password.lengthError && (
      <p className="fielderror">
        Password must be at least 8 characters
      </p>
    )}
  </div>

  {/* Confirm Password */}
  <div>
    <label htmlFor="confirm-password" className="auth-form-label">
      Confirm Password<span className="text-red-500">*</span>
    </label>
    <div className="mt-1 relative">
      <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-primary"></i>
      <input
        id="confirm-password"
        type={showPasswords ? "text" : "password"}
        name="confirm-password"
        value={confirm_password}
        onChange={(e) => setconfirm_password(e.target.value)}
        className="auth-form-input-with-icon"
        placeholder="••••••••"
      />
    </div>

    {fieldErrors.re_password.matchError && (
      <p className="fielderror">Passwords do not match</p>
    )}
  </div>
</div>

{/* Checkbox: show/hide password */}
<div className="flex items-center mt-2">
  <input
    id="showPasswords"
    type="checkbox"
    checked={showPasswords}
    onChange={() => setShowPasswords(!showPasswords)}
    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
  />
  <label
    htmlFor="showPasswords"
    className="ml-2 text-sm text-gray-600 cursor-pointer select-none"
  >
    Show Password 
  </label>
</div>


        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="auth-btn w-full mt-6"
        >
          {isLoading ? <Loader /> : "Create Account"}
        </button>

        {/* Footer */}
        <p className="text-center whitespace-nowrap text-sm text-gray-500 mt-4 border-t border-accent pt-4">
          Already have an account?
          <Link
            to="/auth/login"
            className="text-primary  font-semibold ml-1 hover:text-green-700"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
