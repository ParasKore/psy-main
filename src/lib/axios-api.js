import axios from "axios";
const host = "https://lebecho.com/api/";

export async function PostApi(url, data) {
  const token = JSON.parse(localStorage.getItem("token"));

  const res = axios({
    method: "POST",
    url: host + url,
    headers: {
      // "Content-type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  return res;
}
