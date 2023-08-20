import axios from "axios";
const url = process.env.URL_INTERLEGIS

export async function Details(req,res) {
  const { id } = req.params;
  const completParl = await axios.get(`${url}/api/parlamentares/parlamentar/${id}`)
  let parl;
  let legislation;
  let autor;
    await axios.get(`${url}/api/parlamentares/mandato/?parlamentar=${id}`)
    .then(async (data) => {
      parl=data.data.results[0]
      await axios.get(`${url}/api/parlamentares/legislatura/${data.data.results[0].legislatura}`)
      .then(async (data) => {
          legislation = data.data
          await axios.get(`${url}/api/base/autor/?object_id=${id}`)
          .then(data => {
            autor = data.data.results[0].id
          })
        })
    })

  let response = completParl.data
  response = {
    ...response, 
    voto_recebidos: parl.votos_recebidos,
    titular: parl.titular,
    legislatura: legislation.__str__,
    autor: autor
  }
  
  res.status(200).json(response)
}