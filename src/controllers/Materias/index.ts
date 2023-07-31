import axios from "axios"



export const GetMaterias = async (req, res) => {
  const url = process.env.URL_INTERLEGIS

  const response = await axios.get(`${url}/api/materia/materialegislativa/?o=-data_apresentacao&page_size=100`)

  res.status(200).json(response.data.results)
}