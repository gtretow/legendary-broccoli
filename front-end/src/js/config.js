export const config = {
  apiUrl:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://98.80.79.255:5000/api",
};
