import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <div className="bg-white m-auto w-full rounded-md p-6 shadow-xl lg:max-w-xl">
        <h1 className="text-purple-700 text-center text-3xl font-semibold uppercase">
          Sign in
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="text-gray-800 block text-sm font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              className="text-purple-700 bg-white focus:border-purple-400 focus:ring-purple-300 mt-2 block w-full rounded-md border px-4 py-2 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="text-gray-800 block text-sm font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              className="text-purple-700 bg-white focus:border-purple-400 focus:ring-purple-300 mt-2 block w-full rounded-md border px-4 py-2 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" className="text-purple-600 text-xs hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button className="text-white bg-purple-700 hover:bg-purple-600 focus:bg-purple-600 w-full transform rounded-md px-4 py-2 tracking-wide transition-colors duration-200 focus:outline-none">
              Login
            </button>
          </div>
        </form>
        <div className="relative mt-6 flex w-full items-center justify-center border border-t">
        </div>
        

        <p className="text-gray-700 mt-8 text-center text-xs font-light">
          
          Don&apos;t have an account?
          <NavLink to="/register" className="text-purple-600 font-medium hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
}
