import { NavLink } from "react-router-dom";

export default function PasswordReset() {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <div className="bg-white m-auto w-full rounded-md p-6 shadow-xl lg:max-w-xl">
        <h1 className="text-center text-3xl font-semibold uppercase text-primary">
          Reset Password
        </h1>

        <form className=" mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="text-gray-700 block text-sm font-bold tracking-wide"
            >
              <span className="font-bold ">Your Email</span>
            </label>
            <input
              className="border-gray-300 mt-3 w-[100%] rounded-md border p-2"
              placeholder="support@mindflip.com"
              id="email"
            />
            <NavLink to={"/login"}>
              <span className="text-gray-300 block text-right">
                Login with password
              </span>
            </NavLink>
          </div>
          <button className="mt-4 w-full rounded-md bg-primary p-2 text-light-text">
            RECOVER PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
}
