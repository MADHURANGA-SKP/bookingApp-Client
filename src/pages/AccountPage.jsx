import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";

export default function AccountPage() {
  const { ready, user } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading ...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  function linkClasss(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-4">
        <Link className={linkClasss("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasss("booking")} to={"/account/booking"}>
          My Bookings
        </Link>
        <Link className={linkClasss("places")} to={"/account/places"}>
          My accommadation
        </Link>
      </nav>
    </div>
  );
}
