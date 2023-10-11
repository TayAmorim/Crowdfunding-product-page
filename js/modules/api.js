export const api = axios.create({
  baseURL: "https://naughty-sunbonnet-ray.cyclic.app/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
