import React, { useEffect, useState } from "react";
import {ExpandableCard} from "../PageComponent";
const MadinaPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/madina.json")
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch places:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-lg">Loading places...</div>;
  }

  return (
    <section className="py-12 px-4 md:px-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        Places to Visit in Makkah
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
        {places.map((place) => (
          <ExpandableCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
};

export default MadinaPlaces;
