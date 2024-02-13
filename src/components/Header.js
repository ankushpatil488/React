import { useContext, useState } from "react";
import {LOGO_URL} from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
const Header = () => {
  const [btnLogin,setbtnLogin] = useState("Login");
  const {loginUserInfo} =useContext(UserContext);
  const onlineStatus = useOnlineStatus();

  const cartItems = useSelector((store)=>store.cart.items)
  console.log(cartItems)
  return (
      <div className="flex justify-between bg-pink-100 shadow-lg">
        <div className="logo-container">
          <img
            className="w-56"
            src={LOGO_URL}
          />
        </div>
        <div className="flex items-center">
          <ul className="flex items-center">
            <li className="px-4">Online Status : {onlineStatus === true ? <ul>online</ul> : <ul>offline</ul>} </li>
            <li className="px-4"><Link to="/">Home</Link></li>
            <li className="px-4"><Link to="/about">About us</Link></li>
            <li className="px-4"><Link to="/contact">Contact Us</Link></li>
            <li className="px-4"><Link to="/grocery">Grocery</Link></li>
            <li className="px-4 font-bold text-xl"><Link to="/cart">Cart - ({cartItems.length} items)</Link></li>
            <button className="btn-login" onClick={()=>{
              btnLogin === "Login" ? setbtnLogin("Logout"): setbtnLogin("Login");
            }}>{btnLogin}</button>
            <li className="px-4">{loginUserInfo}</li>
          </ul>
        </div>
      </div>
    );
  };

  export default Header;