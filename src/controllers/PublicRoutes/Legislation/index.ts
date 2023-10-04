import axios from "axios";
const url = process.env.URL_INTERLEGIS;

export const Legislation = async ( req, res ) => {
  const { page, year, type, ementa, number } = req.query
  const getUrl = `${url}/api/norma/normajuridica/?o=-data&page=${page}&ano=${year ? year : ''}&tipo=${type ? type : ''}&ementa__icontains=${ementa ? ementa : ''}&numero=${number? number : ''}&page_size=5`

  const respo = await axios.get(getUrl)
  const response = respo.data

  res.status(200).json(response)
}