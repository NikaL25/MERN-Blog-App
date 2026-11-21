import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { checkIsAuth, logout } from "../redux/features/auth/authSlice"
import { toast } from "react-toastify"

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem("token")
    toast("You are logged out")
  }

  return (
    <nav className="site-nav">
      {/* Logo */}
      <Link
        to="/"
        className="brand"
      >
        <span className="brand-mark">B</span>
        <span>Inkline</span>
      </Link>

      {/* Menu */}
      {isAuth && (
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Add Post
            </NavLink>
          </li>
        </ul>
      )}

      {/* Login / Logout */}
      <div>
        {isAuth ? (
          <button
            onClick={logoutHandler}
            className="button-secondary"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="button-primary"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
