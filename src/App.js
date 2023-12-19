import './App.css';
import { CartProvider } from './components/ContextReducer';
import Home from './screens/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
// import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
// import SignUp from './screens/SignUp';
// import LoggedIn from './screens/LoggedIn';
// import MyOrder from './screens/Myorder';
// import Comments from './screens/Comments';
// import Reviews from './screens/Reviews';

function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route exact path = "/" element={<Home/>}/>
 
        {/* <Route exact path = "/login" element={<Login/>}/>
        <Route exact path ="/createuser" element ={<SignUp/>}/>
        <Route exact path = '/myorders' element = {<MyOrder/>}/>
        <Route exact path = '/mycomment' element = {<Comments/>} />
        <Route exact path = '/reviews' element = {<Reviews/>} /> */}
      </Routes>
    </Router>
    </CartProvider>
    
  );
}

export default App;
