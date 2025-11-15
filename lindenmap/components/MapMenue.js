import "./components.css";
import { useState } from "react";

export default function MapMenue({ clickCoords, setMarkers }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  function createMarker() {
    if (!clickCoords) return;
    setMarkers((prev) => [
      ...prev,
      {
        geocode: [clickCoords.lat, clickCoords.lng],
        popup: `Marker ${prev.length + 1}`,
      },
    ]);
    setIsFormOpen(false);
  }

  const MarkerHandler = !isFormOpen ? (
    <button className="btn" type="button" onClick={() => setIsFormOpen(true)}>
      Add Marker
    </button>
  ) : (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        createMarker();
      }}
    >
      <input type="text" className="input" placeholder="Name Marker"></input>
      <input type="text" className="input" placeholder="Add Address"></input>
      <input type="text" className="input" placeholder="Add Notes"></input>
      <div>
        <button className="btn" type="submit">
          Save Marker
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => setIsFormOpen(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <div className="MapMenue">
      <h2>Map Menue</h2>
      {MarkerHandler}
      <button className="btn">Remove Marker</button>
    </div>
  );
}
