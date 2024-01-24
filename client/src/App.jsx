import './App.css'
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Home/> },
    { path: "/about", element: <About/> },
    { path: "/sign-in", element: <SignIn/> },
    { path: "/sign-up", element: <SignUp/> },
    { path: "/dashboard", element: <Dashboard/> },
    { path: "/projects", element: <Projects/> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
