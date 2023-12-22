import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-6">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
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
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <h2 className="font-semibold text-xl">Extra Information</h2>
        <div className="mb-4 mt-1 text-gray-500 text-sm leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
