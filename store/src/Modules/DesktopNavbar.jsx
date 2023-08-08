import { useDispatch, useSelector } from "react-redux";
import { sideCartSliceActions } from "../store/sideCart-slice";
import { authSliceActions } from "../store/auth-slice";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingOutlined } from "@ant-design/icons";
import Badge from "../components/Badge";
import DropDown from "../components/DropDownDesktop";
import Logo from "../components/Logo";
import menu from "../menuData";

function DesktopNavbar({ cartValue }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const onSideCartHandler = () => {
    console.log("opening sidecart");
    dispatch(sideCartSliceActions.toggleSideCart());
  };

  const onSignInHandler = () => {
    console.log("opening authModal");
    dispatch(authSliceActions.openAuthModal());
  };

  return (
    <>
      <ul className="desktop-menu">
        {menu.map((menu) => (
          <DropDown key={menu.text} name={menu.text} items={menu.subMenu} />
        ))}
      </ul>
      <Logo />
      <ul className="nav_icons">
        <li>
          <Link to="wishlist">
            <HeartOutlined />
          </Link>
        </li>
        <li className="authBtn">
          {!token && <span onClick={onSignInHandler}> Sign In </span>}
          {token && <Link to="my-account">My account</Link>}
        </li>
        <li onClick={onSideCartHandler} className="nav_cart">
          <Badge className="nav_badge" value={cartValue}>
            <ShoppingOutlined />
          </Badge>
        </li>
      </ul>
    </>
  );
}

export default DesktopNavbar;
