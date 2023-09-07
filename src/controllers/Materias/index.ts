import axios from "axios"

const GetMaterias = async (req, res) => {
  const url = process.env.URL_INTERLEGIS
  const response = await axios.get(`${url}/api/materia/materialegislativa/?ano=2023&&o=-data_apresentacao&&page_size=200`)
  res.status(200).json(response?.data?.results)
}

export {GetMaterias};