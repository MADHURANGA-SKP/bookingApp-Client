import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      email,
      mobile,
      price: numberOfNights * place.price,
      place: place._id,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="">
      <div className="bg-white shadow p-5 rounded-2xl ">
        <div className="text-2xl text-center mb-3">
          Price: ${place.price} / per night{" "}
        </div>
        <div className="border rounded-2xl">
          <div className="flex">
            <div className="py-3 px-4 ">
              <label>Check in: </label>
              <input
                type="date"
                className=""
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className=" py-3 px-4 border-l">
              <label>Check out: </label>
              <input
                type="date"
                className=""
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className="flex">
            <div className=" py-3 px-4 border-t">
              <label>Number Of Guests: </label>
              <input
                type="number"
                className=""
                value={numberOfGuests}
                onChange={(ev) => setNumberOfGuests(ev.target.value)}
              />
            </div>
          </div>
        </div>
        {numberOfNights > 0 && (
          <div className="">
            <div className=" py-3 px-4 border-t">
              <label>Full name of the reservation holder: </label>
              <input
                value={name}
                type="text"
                className=""
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className=" py-3 px-4 border-t">
              <label>Personal E-Mail: </label>
              <input
                value={email}
                type="text"
                className=""
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div className=" py-3 px-4 border-t">
              <label>Mobile Number: </label>
              <input
                value={mobile}
                type="tel"
                className=""
                onChange={(ev) => setMobile(ev.target.value)}
              />
            </div>
          </div>
        )}
        <button onClick={bookThisPlace} className="primary mt-4">
          Book Now
          {numberOfNights > 0 && <span> ${numberOfNights * place.price} </span>}
        </button>
      </div>
    </div>
  );
}
