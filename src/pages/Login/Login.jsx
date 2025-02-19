import React, { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  console.log('state in the location login page', location.state);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "Logged in successfully!",
          text: "Welcome to the system.",
          icon: "success",
        });
        navigate(from, {replace: true})
      })
      .catch((error) => {
        console.error("Error signing in: ", error.message);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    }
  };


  return (
    <>
      <Helmet>
        <title>Tour & Trip | Login</title>
      </Helmet>
      <div className="mt-8 flex justify-center items-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">

          <form onSubmit={handleLogin} >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                onBlur={handleValidateCaptcha}
                placeholder="type here"
                name="Enter the captcha above"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-4">
              {/* TODO: apply disabled for re captcha disabled in here the login button  */}
              <button disabled={disabled} className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
          <SocialLogin />
            <p className="text-center">
              <small>
                New Here? <Link to="/signup" className="font-bold text-red-600 hover:underline">Create an account</Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
