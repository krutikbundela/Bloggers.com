import  {useSelector} from 'react-redux';
import  {Outlet, Navigate} from 'react-router-dom';
// https://blog.probirsarkar.com/privateroute-in-react-router-v6-how-to-create-protected-routes-in-your-react-app-bcda4c409360

// https://medium.com/@tapan_sharma/private-routes-in-react-with-react-router-dom-v6-the-easy-way-1b95f68b8019
const PrivateRoute = () => {
    
    const {currentUser}  = useSelector((state) => state.user)
    console.log("PrivateRoute ~ currentUser:", currentUser);

  return currentUser  ?  <Outlet/> : <Navigate  to='signin'/>
}

export default PrivateRoute