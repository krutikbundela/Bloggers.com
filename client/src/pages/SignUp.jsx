import { Link , useNavigate} from "react-router-dom";
import {Label, TextInput , Button , Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import OAuth from "../Components/OAuth";

const SignUp = () => {
  const [formData, setformData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>{
    setformData({...formData, [e.target.id]: e.target.value.trim()});
  } 
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("handleSubmit ~ data:", data);
      if (data.success=== false) {
        setErrorMessage(data.message)
      }
      if(res.ok){
        navigate("/signin")
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message)
    }
  } 

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
            <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
              <div className="">
                <Label value="Username" />
                <TextInput
                  type="text"
                  placeholder="Enter Username"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <Label value="Email" />
                <TextInput
                  type="email"
                  placeholder="Enter Email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <Label value="Password" />
                <TextInput
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <Button
                gradientDuoTone={"purpleToPink"}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <OAuth />
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an Account??</span>
              <Link to="/signin" className="text-blue-500">
                Sign In
              </Link>
            </div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp