import { Link, useLocation } from "react-router-dom";
import { Home, Login } from "../../shared";
import s from "./SideBar.module.scss";

const NAV_ITEMS = [
  { path: "/", label: "Home", icon: Home },
  { path: "/login", label: "login", icon: Login },
  { path: "/register", label: "register", icon: Login },
];

export const SideBar = () => {
  const location = useLocation();

  return (
    <div className={s.navBlock}>
      <nav>
        <ul>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link to={item.path}>
                  <div className={`${s.stroka} ${isActive ? s.active : ""}`}>
                    <Icon className={s.icon} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
