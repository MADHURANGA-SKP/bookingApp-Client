import { Link } from "react-router-dom";

export default function PlacesPage() {
  return (
    <>
      <div>
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
        my places
      </div>
    </>
  );
}
