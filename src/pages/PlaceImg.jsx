export default function PlaceImg({ place, index = 0, className }) {
  if (!place.photos?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return (
    <div className="">
      {place.photos.length > 0 && (
        <img
          className={className}
          src={"http://localhost:4000/uploads/" + place.photos[index]}
          alt=""
        />
      )}
    </div>
  );
}
