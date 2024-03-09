"use client"
import { useEffect, useState } from 'react';

function GeolocationComponent() {
    const [longitude , setLongitude]=useState()
    const [latitude , setLatitude]=useState()
    console.log(latitude , longitude)
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else {
            console.log("Geolocation is not available");
        }
    }, []);

    function successCallback(position:any) {
        const { latitude, longitude } = position.coords;
        setLongitude(longitude)
        setLatitude(latitude)
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
    }

    function errorCallback(error:any) {
        console.error("Error retrieving geolocation:", error.message);
    }

    return (
        <div>
            Geolocation Component
            <p>
              longitude : {longitude }
            </p>
            <p>
              latitudes : {latitude}
            </p>
        </div>
    );
}

export default GeolocationComponent;
