import axios from "axios"



export const GetSessoes = async (req, res) => {

  const response = await axios.get("https://sapl.barramansa.rj.leg.br/api/sessao/sessaoplenaria/?o=-data_inicio&page_size=100")

  console.log(response.data.results, "response")
  res.status(200).json(response.data.results)
}