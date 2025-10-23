"use client";

import dynamic from "next/dynamic";

// Dynamically import Map component — disable SSR
const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapWrapper() {
  return <Map />;
}
