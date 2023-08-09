import axios from "axios"

const url = process.env.URL_INTERLEGIS

export const ParlamentariesList = async (req, res) => {
  const parlamentares = await axios.get(`${url}/api/parlamentares/parlamentar/?page_size=100`)
  const filiacao = await axios.get(`${url}/api/parlamentares/partido/?page_size=100`)

  let response = []
  for(let parl of parlamentares.data.results){
    for(let fil of filiacao.data.results){
      if( parl.id == fil.id && parl.ativo){
        let obj = {
          id: parl.id,
          __str__: parl.__str__,
          fotografia: parl.fotografia,
          sigla: fil.sigla,
          nome: fil.nome,
          logo_partido: fil.logo_partido
        }
        response.push(obj)
      }
    }
  }

  res.status(200).json(response)
}