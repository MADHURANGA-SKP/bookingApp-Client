import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PlaceImg from "./PlaceImg";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div className="">
      <AccountNav />
      <div className="mt-4">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden my-2"
            >
              <div className="w-48">
                <PlaceImg place={booking.place} className=" text-gray-500" />
              </div>
              <div className="py-1 pr-3 grow">
                <h2 className="text-xl font-semibold">{booking.place.title}</h2>
                <div className="flex gap-2 border-t border-gray-800 mt-4 pb-2 "></div>
                <div className="font-semibold">
                  <BookingDates
                    booking={booking}
                    className=" mt-2 text-gray-500"
                  />

                  <div className="flex gap-1 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>
                    <span className="text-2xl">
                      Total Price of: ${booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
