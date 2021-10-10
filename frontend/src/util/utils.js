import io from "socket.io-client";

export const url = "http://192.168.1.14:8000/";

export const socket = io.connect("http://192.168.1.14:8000", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
});

export const geolocUrl = "http://ip-api.com/json/";

export const calculateDistance = (latA, latB, lonA, lonB) => {
  latA = (latA * Math.PI) / 180;
  latB = (latB * Math.PI) / 180;
  lonA = (lonA * Math.PI) / 180;
  lonB = (lonB * Math.PI) / 180;
  const dist =
    6371 *
    Math.acos(
      Math.sin(latA) * Math.sin(latB) +
        Math.cos(latA) * Math.cos(latB) * Math.cos(lonB - lonA)
    );
  if (dist > 1) return Math.round(dist);
  return Math.round(dist * 100) / 100;
};
