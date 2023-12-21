import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  });
  return (
    <>
      <div className="mt-8 grid grid-cols2 md:grid-cols-3 lg:grid-cols-4">
        {places.length > 0 &&
          places.map((place) => {
            <div>
              <div className="bg-gray-500">
                {place.photos?.[0] && (
                  <img
                    src={"http//localhost:4000/uploads/" + place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              {place.title}
            </div>;
          })}
      </div>
    </>
  );
}
