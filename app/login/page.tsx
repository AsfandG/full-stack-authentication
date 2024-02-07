"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { ToastBar } from "react-hot-toast";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      const response = await axios.post("/api/login", user);
      console.log("login success response >>>", response.data);
      router.push("/profile");
      toast.success("Login Successfull!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="p-56">
      <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
        <div className="mx-auto mb-2 space-y-3 text-white">
          <h1 className=" text-3xl font-bold ">Log into Appsy</h1>
          <p className="">
            {loading ? "Processing..." : "Login to access your account"}
          </p>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <input
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-white focus:border-white focus:outline-none focus:ring-0"
              placeholder=""
            />
            <label
              htmlFor="email"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-[#444] px-2 text-sm text-white duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-white"
            >
              {" "}
              Enter Your Email{" "}
            </label>
          </div>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <input
              type="text"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-white focus:border-white focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-[#444] px-2 text-sm text-white duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-white"
            >
              Enter Your Password
            </label>
          </div>
        </div>

        <button
          className="rounded-lg bg-blue-600 py-3 font-bold text-white"
          onClick={handleSubmit}
        >
          Login
        </button>

        <p className="text-sm font-light text-primary dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-white hover:underline dark:text-primary-500"
          >
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
