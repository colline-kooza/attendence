"use client";
import { useEffect, useState } from "react";

type UserLocation = {
  latitude: number;
  longitude: number;
};

type ErrorMessage = string | null;

const CheckInOutComponent = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<ErrorMessage>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setError("User denied Geolocation.");
          } else {
            setError(error.message); // Fix here
          }
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {userLocation && (
        <p>
          Latitude: {userLocation.latitude}, Longitude: {userLocation.longitude}
        </p>
      )}
    </div>
  );
};

export default CheckInOutComponent;