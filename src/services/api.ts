import axios from "axios";

export const API_KEY = "idkI4VvdkDMA2posINsb61VeCgtX9a2AwKCoaV8msZY";
export const BASE_URL = "https://api.unsplash.com";

export const fetchImages = async <T>(
  url: string,
  {
    client_id = API_KEY,
    query = "",
    page = 1,
    per_page = 9,
    orientation = "landscape",
  } = {}
) => {
  const { data } = await axios.get<T>(url, {
    params: { client_id, query, page, per_page, orientation },
    baseURL: BASE_URL,
  });

  return data;
};
