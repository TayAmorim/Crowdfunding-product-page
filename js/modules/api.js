export const api = axios.create({
  baseURL: "https://sore-blue-wildebeest-gown.cyclic.cloud/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
