// This is a Server Component by default
import ClientOnlyMap from "../../components/ClientOnlyMap";
import "./globals.css";

export default function HomePage() {
  return (
    <main>
      <h1>My Leaflet Map</h1>
      <ClientOnlyMap />
    </main>
  );
}
