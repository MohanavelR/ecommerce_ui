import { Link } from "react-router-dom";
import { deepcopyObj } from "../../utils/deepCopyObj";
import { loginErrorObj } from "../../utils/errorObj";
import Loader from "../../components/common/Loader";
import { useDispatch } from "react-redux";
import { useLogin } from "../../store/authSlice";
import { useContext, useState } from "react";
import { MessageContext } from "../../context/context";

const Login = () => {
  const { messageContextState, setMessageContextState } = useContext(MessageContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState(deepcopyObj(loginErrorObj));
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });



  async function handlesubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    let hasError = false;
    const localError = deepcopyObj(loginErrorObj);
    if (formData.loginId === "") {
      hasError = true;
      localError.loginId.isRequired = true;
    }
    if (formData.password === "") {
      hasError = true;
      localError.password.isRequired = true;
    }
    setFieldErrors({ ...localError });
    if (!hasError) {
      dispatch(useLogin(formData)).then((res) => {
        if (res.payload?.success) {
          setIsLoading(false);
          setMessageContextState({
            ...messageContextState,
            is_show: true,
            text: res.payload?.message,
            success: true,
          });
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
        setFieldErrors(deepcopyObj(loginErrorObj));
      }, 3000);
    }
  }
  return (
    <div className="auth-form-box">
      <div className="text-center mb-5">
        <h2 className="auth-heading">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-lg">Sign in to your EcoShop account</p>
      </div>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handlesubmit} className="space-y-3">
      <div>
  <label htmlFor="loginId" className="auth-form-label">
    Email or Mobile<span className="text-red-500 text-lg">*</span>
  </label>
  <div className="mt-1 relative">
    <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5"></i>
    <input
      id="loginId"
      type="text" // use text so both email and phone can be entered
      className="auth-form-input-with-icon"
      placeholder="Enter email or mobile number"
      value={formData.loginId}
      onChange={(e) =>
        setFormData({ ...formData, loginId: e.target.value })
      }
    />
  </div>
  {fieldErrors.loginId.isRequired && (
    <p className="text-xs font-medium text-red-600 mt-1">
      This field is required
    </p>
  )}
</div>

          <div>
            <label htmlFor="password" className="auth-form-label">
              Password<span className="text-red-500 text-lg">*</span>
            </label>
            <div className="mt-1 relative">
          
              <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5"></i>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="auth-form-input-with-icon"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary p-1 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i
                  className={
                    showPassword
                      ? "fas fa-eye-slash w-5 h-5"
                      : "fas fa-eye w-5 h-5"
                  }
                ></i>
              </button>
            </div>
              {fieldErrors.password.isRequired && (
                <p className="text-xs  font-medium text-red-600 mt-1">
                  Password is required
                </p>
              )}
            <div className="flex mt-3 items-center justify-end">
              {/* 4. LINKS: Clear and uses primary color */}
              <Link
                to="/auth/forget-password"
                className="text-sm font-medium text-primary hover:text-green-700 transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handlesubmit}
              disabled={isLoading}
              className="auth-btn"
            >
              {isLoading ? <Loader /> : "Sign in"}
            </button>
          </div>
        </form>
        <div className="px-6 py-4 mt-4 border-t border-gray-200 text-center">
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-primary hover:text-green-700 transition-colors duration-200 font-bold ml-1"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
