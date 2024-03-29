import {useState} from "react";
import {NavLink} from "react-router-dom";

export default function Topnav() {
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="bg-purple-500 w-full shadow sticky top-0 bg-primary-lightest z-50 dark:text-darkest">
      <div className="mx-auto justify-between px-4 md:flex md:items-center md:px-8 lg:max-w-7xl">
        <div>
          <div className="flex items-center justify-between py-3 md:block md:py-5">
            <NavLink to="/">
              <h2 className="text-white text-2xl font-bold">MindFlip</h2>
            </NavLink>
            <div className="md:hidden">
              <button
                className="text-gray-700 focus:border-gray-400 rounded-md p-2 outline-none focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-white hover:text-primary-darkest ">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="text-white hover:text-primary-darkest ">
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li className="text-white hover:text-primary-darkest ">
                <NavLink to="/about">About US</NavLink>
              </li>
              <li className="text-white hover:text-primary-darkest ">
                <NavLink to="/contact">Contact US</NavLink>
              </li>
            </ul>

            <div className="mt-3 space-y-2 md:hidden lg:hidden">
              <NavLink
                to="/login"
                className="text-white bg-gray-600 hover:bg-primary inline-block w-full rounded-md px-4 py-2 text-center shadow"
              >
                Sign in
              </NavLink>
              <NavLink
                to="/register"
                className="text-gray-800 bg-white hover:bg-primary inline-block w-full rounded-md px-4 py-2 text-center shadow"
              >
                Sign up
              </NavLink>
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 md:inline-block">
          <NavLink
            to="/login"
            className="text-white bg-gray-600 hover:bg-primary-light rounded-md px-4 py-2 shadow"
          >
            Sign in
          </NavLink>
          <NavLink
            to="/register"
            className="text-gray-800 bg-white hover:bg-primary-light rounded-md px-4 py-2 shadow"
          >
            Sign up
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
