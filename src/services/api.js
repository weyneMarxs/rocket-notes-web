import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://rocket-notes-api-h7ed.onrender.com'
})