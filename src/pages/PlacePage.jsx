import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  if (showAllPhotos) {
    return (
      <div className={"absolute inset-0 bg-black  min-h-screen"}>
        <div className="p-8 grid gap-4 bg-black">
          <div className="">
            <div className="text-3xl text-white">Photos of {place.title}</div>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-3xl shadow shadow-black bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                data-slot="icon"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Close{" "}
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div className="">
                <img
                  src={"http://localhost:4000/uploads/" + photo}
                  alt=""
                  className=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-6">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="flex gap-1 my-3 block font-semibold underline"
        target="_blank"
        href={"http://maps.google.com/q=" + place.address}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        {place.address}
      </a>{" "}
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div className="">
            {place.photos?.[0] && (
              <div className="">
                <img
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt=""
                  className="aspect-square object-cover"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                src={"http://localhost:4000/uploads/" + place.photos?.[1]}
                alt=""
                className="aspect-square object-cover"
              />
            )}
            <div className="overflow-hidden ">
              {place.photos?.[2] && (
                <img
                  src={"http://localhost:4000/uploads/" + place.photos?.[2]}
                  alt=""
                  className="aspect-square object-cover relative top-2"
                />
              )}
            </div>
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex gap-1 absolute bottom-2 font-semibold right-2 p-2 px-4 bg-white rounded-2xl border shadow-md shadow-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              data-slot="icon"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Show more photos
          </button>
        </div>
      </div>
      <div className="mt-8 mb-4 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] ">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-xl">Description</h2>
            {place.description}
          </div>
          <b className="">Check-in: </b>
          {place.checkIn}
          <br />
          <b className="">Check-out: </b>
          {place.checkOut} <br />
          <b className="">Max Number Of Guests: </b>
          {place.maxGuests}
          <br />
        </div>
        <BookingWidget place={place} />
      </div>
      <div className="bg-white -mx-8 px-8 py-8">
        <h2 className="font-semibold text-xl">Extra Information</h2>
        <div className="mb-4 mt-1 text-gray-500 text-sm leading-4">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
