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
import Layout from './Components/Layout';
import PrivateRoute from './Components/PrivateRoute';
import AdminPrivateRoute from './Components/AdminPrivateRoute';
import CreatePost from './pages/CreatePost';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        { element: <PrivateRoute/>, children:[
          { path: "dashboard", element: <Dashboard /> },
        ] },
        { element: <AdminPrivateRoute/>, children:[
          { path: "createpost", element: <CreatePost /> },
        ] },
        { path: "projects", element: <Projects /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
