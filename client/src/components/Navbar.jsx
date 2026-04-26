import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { checkIsAuth, logout } from "../redux/features/auth/authSlice"
import { toast } from "react-toastify"

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()

  const activeStyle = "text-white font-semibold"

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem("token")
    toast("You are logged out")
  }

  return (
    <nav className="w-full py-4 px-6 bg-transparent flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-white bg-gray-700 px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors"
      >
        Blog
      </Link>

      {/* Menu */}
      {isAuth && (
        <ul className="hidden md:flex gap-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-400 hover:text-white transition-colors ${isActive ? activeStyle : ""}`
              }
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                `text-gray-400 hover:text-white transition-colors ${isActive ? activeStyle : ""}`
              }
            >
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              className={({ isActive }) =>
                `text-gray-400 hover:text-white transition-colors ${isActive ? activeStyle : ""}`
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
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}