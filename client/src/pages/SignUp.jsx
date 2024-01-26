import { Link } from "react-router-dom";
import {Label, TextInput , Button } from "flowbite-react";

const SignUp = () => {
  return (
    <>
      <div className="min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-xol md: flex-row md:items-center gap-5">
          {/* Left Side */}
          <div className="flex-1">
            <Link to={"/"} className=" text-4xl font-bold dark:text-white">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Krutik&apos;s
              </span>
              Blog
            </Link>
            <p className="text-sm mt-5">Make Your Words Viral</p>
          </div>
          {/* Right Side */}
          <div className=" flex-1 ">
            <form className="flex flex-col  gap-4">
              <div className="">
                <Label value="Username" />
                <TextInput
                  type="text"
                  placeholder="Enter Username"
                  id="username"
                />
              </div>
              <div className="">
                <Label value="Email" />
                <TextInput
                  type="text"
                  placeholder="Enter Email"
                  id="email"
                />
              </div>
              <div className="">
                <Label value="Password" />
                <TextInput
                  type="text"
                  placeholder="Enter Password"
                  id="password"
                />
              </div>
              <Button gradientDuoTone={'purpleToPink'} type="submit">
                Sign Up
              </Button>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an Account??</span>
              <Link to="signin" className="text-blue-500">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp