import React, { useContext, useState } from "react";
import { deepcopyObj } from "../../../utils/deepCopyObj";
import { useDispatch } from "react-redux";
import { MessageContext } from "../../../context/context";
import { useResetPassword } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
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
  async function handlechangePassword() {
    let has_error = false;
    const localError = deepcopyObj(errors);
    if (formData.password === "") {
      has_error = true;
      localError.password.isRequired = true;
    }
    if (!localError.password.isRequired && formData.password.length < 8) {
      localError.password.length_error = true;
      has_error = true;
    }
    if (formData.confirm_password === "") {
      localError.confirm_password.isRequired = true;
      has_error = true;
    }
    if (
      !localError.confirm_password.isRequired &&
      !localError.password.length_error &&
      !localError.password.isRequired &&
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
              className="w-full pl-10 pr-12 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder-muted-foreground"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {fieldErrros.password.isRequired && (
              <p className="text-xs  font-medium text-red-700">
                Password is Required
              </p>
            )}
            {fieldErrros.password.length_error && (
              <p className="text-xs  font-medium text-red-700">
                Password is must be 8 charators
              </p>
            )}
          </div>
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
              className="w-full pl-10 pr-12 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder-muted-foreground"
              placeholder="Enter your password"
              value={formData.confirm_password}
              onChange={(e) =>
                setFormData({ ...formData, confirm_password: e.target.value })
              }
            />
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
        </div>
        <div className="flex space-x-3">
          <input
            id="confirm-password"
            type="checkbox"
            className=" border border-input rounded-lg  bg-background text-foreground placeholder-muted-foreground"
            placeholder="Enter your password"
            value={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <label
            htmlFor=""
            className="block text-sm/6 font-medium text-gray-900"
          >
            Show Password
          </label>
        </div>
        <button onClick={handlechangePassword} className="btn-hero mt-3">
          Change Password
        </button>
      </div>
    </>
  );
};

export default ChangeNewPassword;
