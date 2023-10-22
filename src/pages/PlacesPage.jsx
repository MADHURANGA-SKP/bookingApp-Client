import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("1");

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink(" ");
  }
  return (
    <>
      <div>
        {action !== "new" && (
          <div className="text-center">
            <Link
              className="inline-flex gap-1 mt-2 bg-primary text-white py-2 px-6 rounded-full"
              to={"/account/places/new"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add new Places
            </Link>
          </div>
        )}

        {action === "new" && (
          <div>
            <form>
              {preInput(
                "Title",
                "Title for your place. Shoud be short and catchy as an advertisment"
              )}
              <input
                type="text"
                placeholder="title, for example: My love"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
              {preInput("Address", "Address to your, places")}
              <input
                type="text"
                placeholder="address"
                value={address}
                onChange={(ev) => setAddress(ev.target.value)}
              />
              {preInput("Photos", "more = better")}
              <div className="flex gap-2">
                <input
                  type="text"
                  className=""
                  placeholder={"Add using a link ...    JPGE PNG"}
                  value={photoLink}
                  onChange={(ev) => setPhotoLink(ev.target.value)}
                />
                <button
                  onClick={addPhotoByLink}
                  className="bg-gray-200 px-4 rounded-2xl"
                >
                  Add&nbsp;Photos
                </button>
              </div>
              <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-s lg-grid-cols-6">
                {addedPhotos.length > 0 &&
                  addedPhotos.map((link) => (
                    <div>
                      <img
                        className="rounded-2xl"
                        src={"http://localhost:4000/uploads/" + link}
                        alt=""
                      />
                    </div>
                  ))}
                <button className="flex justify-center gap-2 border bg-transparent rounded-2xl items-center p-2 text-2xl text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-8 h-8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  Upload
                </button>
              </div>
              {preInput("Description", "description of the place")}
              <textarea
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
              />
              {preInput("Perks", "Select all desierd items for your place")}

              <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <Perks />
              </div>
              {preInput("Extra Info", "House, Rules and other.")}

              <textarea
                value={extraInfo}
                onChange={(ev) => setExtraInfo(ev.target.value)}
              />
              {preInput(
                "Check In & Check Out time",
                "Add Check In and Check Out time, remember to have some time window for cleaning the room between guests"
              )}

              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <h3 className="mt-2 -mb-1">Check In time</h3>
                  <input
                    type="text"
                    placeholder="14:00"
                    value={checkIn}
                    onChange={(ev) => setCheckIn(ev.target.value)}
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Check Out time</h3>
                  <input
                    type="text"
                    placeholder="11:00"
                    value={checkOut}
                    onChange={(ev) => setCheckIn(ev.target.value)}
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Max Guests</h3>
                  <input
                    type="number"
                    value={maxGuests}
                    onChange={(ev) => setMaxGuests(ev.target.value)}
                  />
                </div>
              </div>
              <div>
                <button className="primary my-4 ">Save</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
