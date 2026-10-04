import { Link, useLocation } from "react-router-dom";
import s from "./SideBar.module.scss";

export const SideBar = () => {
  const location = useLocation();
  return (
    <div className={s.navBlock}>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <div
                className={`${s.stroka} ${location.pathname === "/" ? s.active : ""}`}
              >
                Home
              </div>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <div
                className={`${s.stroka} ${location.pathname === "/login" ? s.active : ""}`}
              >
                Login
              </div>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <div
                className={`${s.stroka} ${location.pathname === "/register" ? s.active : ""}`}
              >
                Register
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
