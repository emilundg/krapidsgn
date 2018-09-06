import axios from 'axios'

const api = axios.create({timeout: 5000})

export function sendEmail (name, email, message) {
  const response = api.get(`/api/postmaster/${name}/${email}/${message}`)
  if (!response) {
    throw new Error('could not send email')
  }
  return response
}