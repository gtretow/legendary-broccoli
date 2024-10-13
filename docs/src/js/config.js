export const config = {
  apiUrl:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://api.minhaapp.com/",
};
