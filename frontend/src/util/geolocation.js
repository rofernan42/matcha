// export const geolocUrl = "https://api.ip2loc.com/5LVbm9ZszfRRSW3QVH1Z4u6DmVOmoTcs/detect?include=country_eu_member"
export const geolocUrl = "http://ip-api.com/json/"

export const calculateDistance = (latA, latB, lonA, lonB) => {
  latA = (latA * Math.PI) / 180;
  latB = (latB * Math.PI) / 180;
  lonA = (lonA * Math.PI) / 180;
  lonB = (lonB * Math.PI) / 180;
  const dist = (
    6371 *
      Math.acos(
        Math.sin(latA) * Math.sin(latB) +
          Math.cos(latA) * Math.cos(latB) * Math.cos(lonB - lonA)
      )
  );
  if (dist > 1) return Math.round(dist)
  return Math.round(dist * 100) / 100;
};
