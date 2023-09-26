import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto ">
          <input type="text" placeholder="jone doe" />
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500 ">
            Allready a member .?
            <Link
              to={"/loging"}
              className="underline font-semibold text-black px-2"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
