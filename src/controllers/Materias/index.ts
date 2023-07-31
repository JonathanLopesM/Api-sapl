import axios from "axios"



export const GetMaterias = async (req, res) => {
  const url = process.env.URL_INTERLEGIS
  console.log(`${url}/api/materia/materialegislativa/?o=-data_apresentacao&page_size=100`)
  const response = await axios.get(`${url}/api/materia/materialegislativa/?o=-data_apresentacao&page_size=100`)
  // console.log(response.data.results, "result")
  res.status(200).json(response.data.results)
}