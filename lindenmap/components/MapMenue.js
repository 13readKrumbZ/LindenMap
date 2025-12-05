import "./components.css";
import { useState } from "react";

export default function MapMenue({ clickCoords, setMarkers, setIsMenueOpen }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [comments, setComments] = useState("");

  function createMarker(title, address, comments) {
    if (!clickCoords) return;

    const newMarker = {
      id: String(Date.now()),
      title: title,
      geocode: [clickCoords.lat, clickCoords.lng],
      address: address,
      comments: comments,
    };

    setMarkers((prev) => [...prev, newMarker]);
    setAddress("");
    setTitle("");
    setComments("");
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
        createMarker(title, address, comments);
      }}
    >
      <input
        type="text"
        className="input"
        placeholder="Name Marker"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        type="text"
        className="input"
        placeholder="Add Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></input>
      <input
        type="text"
        className="input"
        placeholder="Add Comments"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      ></input>
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
    <div>
      <button> </button>
      <div className="MapMenue">
        <h2>Map Menue</h2>
        {MarkerHandler}
        <button className="btn">Remove Marker</button>
        <button className="btn" onClick={() => setIsMenueOpen(false)}>
          Close Menue
        </button>
      </div>
    </div>
  );
}
