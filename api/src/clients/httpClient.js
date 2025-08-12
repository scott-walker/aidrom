import axios from "axios"
import config from "#config/index.js"

export const http = axios.create({
  // baseURL: config("aiApiBaseUrl"),
  headers: {
    // Authorization: `Bearer ${config("aiApiKey")}`
  }
  // timeout: 5000
})

// http.interceptors.response.use(
//   (req) => req.data,
//   (err) => {
//     console.error("HTTP REQ Error:", err.message)

//     throw err
//   }
// )

http.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.error("HTTP Error:", err.message)

    throw err
  }
)
