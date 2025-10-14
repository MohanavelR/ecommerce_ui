import React, { useContext, useEffect, useState } from "react";
import { deepcopyObj } from "../../../utils/deepCopyObj";
import { useDispatch } from "react-redux";
import { MessageContext } from "../../../context/context";
import { useResetPassword } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
import isStrongPassword from "../../../utils/isStrongPassword";
const errors = {
  password: {
    isRequired: false,
    length_error: false,
  },
  confirm_password: {
    isRequired: false,
    match_error: false,
  },
};
const ChangeNewPassword = ({ otp }) => {
  const { messageContextState, setMessageContextState } =
    useContext(MessageContext);
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [fieldErrros, setFieldErrors] = useState(deepcopyObj(errors));
  const dispatch = useDispatch();
  const [passwordErrors, setPasswordErrors] = useState([]);

  useEffect(() => {
    if (formData.password) {
      const result = isStrongPassword(formData.password);
      setPasswordErrors(result.valid ? [] : result.reasons);
    } else {
      setPasswordErrors([]);
    }
  }, [formData.password]);

  async function handlechangePassword() {
    let has_error = false;
    const localError = deepcopyObj(errors);
    const checkPassword = isStrongPassword(formData.password, { minLength: 8 });
    if (!checkPassword.valid) {
      has_error = true;
      setPasswordErrors(checkPassword.reasons);
    } else {
      setPasswordErrors([]);
    }

    if (formData.confirm_password === "") {
      localError.confirm_password.isRequired = true;
      has_error = true;
    }
    if (
      checkPassword.valid &&
      !localError.confirm_password.isRequired &&
      formData.confirm_password !== formData.password
    ) {
      localError.confirm_password.match_error = true;
      has_error = true;
    }
    setFieldErrors(deepcopyObj(localError));
    if (!has_error) {
      const data = {
        resetId: sessionStorage.getItem("resetEmail"),
        otp,
        newpassword: formData.password,
      };
      dispatch(useResetPassword(data)).then((res) => {
        if (res.payload?.success) {
          sessionStorage.removeItem("resetEmail");
          navigate("/auth/login");
          setMessageContextState({
            ...messageContextState,
            is_show: true,
            text: res.payload?.message,
            success: true,
          });
        } else {
          setMessageContextState({
            ...messageContextState,
            is_show: true,
            text: res.payload?.message,
            success: false,
          });
        }
      });
    } else {
      setTimeout(() => {
        setFieldErrors(deepcopyObj(errors));
      }, 3000);
    }
  }
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div>
          <label
            for="password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Password<span className="text-red-500 text-lg">*</span>
          </label>
          <div className="mt-2 relative">
            <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"></i>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="auth-form-input-with-icon"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

          </div>
            {passwordErrors.length > 0 &&
              passwordErrors.map((error) => (
                <ul>
                  {<li className="list-disc ms-5 mt-2 fielderror">{error}</li>}
                </ul>
              ))}
        </div>
        <div>
          <label
            for="confirm-password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Confirm Password<span className="text-red-500 text-lg">*</span>
          </label>
          <div className="mt-2 relative">
            <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"></i>
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              className="auth-form-input-with-icon"
              placeholder="Enter your password"
              value={formData.confirm_password}
              onChange={(e) =>
                setFormData({ ...formData, confirm_password: e.target.value })
              }
            />
          </div>
            {fieldErrros.confirm_password.isRequired && (
              <p className="text-xs  font-medium text-red-700">
                Confirm password is Required
              </p>
            )}
            {fieldErrros.confirm_password.match_error && (
              <p className="text-xs  font-medium text-red-700">
                {" "}
                password doesn't Match
              </p>
            )}
        </div>
        <div className="flex space-x-3">
          <input
            id="showPassword"
            type="checkbox"
            className="border border-input rounded-lg  bg-background text-foreground placeholder-muted-foreground"
            placeholder="Enter your password"
            value={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <label
            htmlFor="showPassword"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Show Password
          </label>
        </div>
        <button onClick={handlechangePassword} className="auth-btn">
          Change Password
        </button>
      </div>
    </>
  );
};

export default ChangeNewPassword;
