export default function BookingWidget({ place }) {
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
              <input type="date" className="" />
            </div>
            <div className=" py-3 px-4 border-l">
              <label>Check out: </label>
              <input type="date" className="" />
            </div>
          </div>
          <div className="flex">
            <div className=" py-3 px-4 border-t">
              <label>Number Of Guests: </label>
              <input type="number" className="" defaultValue={1} />
            </div>
          </div>
        </div>

        <button className="primary mt-4">Book Now</button>
      </div>
    </div>
  );
}
