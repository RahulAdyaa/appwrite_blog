import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";

import authService from "../appwrite/auth";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null); // kyuki errors bhi to aa skti hain
  // login ek sync method hoga kyuki bohot sari info aayegi jayegi to
  const login = async (data) => {
    setError(""); // this is very important to write , errors clean krne ke liye
    try {
      const session = await authService.login(data); // data poora wrapper miljata hai ,basically object hi milta hai . Aur agar session hai to user logged in hai varna nai hai
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message); // message kya dikhana hai error wala vo hmne state mein save krlia hai
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="{`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block  max-w-[100px]">
            <Logo width="100% " />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-black/60">
          Don&apos; have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {/* // paragraph ke baad ham ek error display krvana chahte hain */}
        {error && (
          <p className="mt- text-center text-base text-red-600">{error}</p>
        )}
        <form
          // form jab bhi submit hoga , vaha handlesubmit event occur hoga , jitne bhi input fields waha doge , vaha pe ham iss register ko use krte hain , to automatically jo aapne values bhari hain vo ajayenge , aapko state manage nai krni padegi
          onSubmit={handleSubmit(login)}
          className="mt-8"
        >
          <div className="space-y-5">
            <Input
              label="Email:"
              type="email"
              placeholder="email"
              {...register("email", {
                required: true,
                validate: (value) => {
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                    value
                  ) || "Email address must be a valid address"; // from regexr
                },
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter password"
              {...register("email", {
                required: true,
                validate: (value) => {
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                    value
                  ) || "Enter a valid stronger password";
                },
              })}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
