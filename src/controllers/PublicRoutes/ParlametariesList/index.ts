import axios from "axios"
const url = process.env.URL_INTERLEGIS

export const ParlamentariesList = async (req, res) => {
  const parlamentares = await axios.get(`${url}/api/parlamentares/parlamentar/search_parlamentares/`)
  const parlamentaresFilter = parlamentares.data.filter((parl)=>{
    if(parl.titular == "Sim"){
      return parl
    }
  })
  console.log(parlamentares.data, "parlamentares Search")
  let response = []
  for(let parl of parlamentaresFilter){
    response.push({
      id: parl.id,
      nome_parlamentar: parl.nome_parlamentar,
      fotografia_cropped: url + parl.fotografia_cropped,
      fotografia: parl.fotografia,
      ativo: parl.ativo,
      partido: parl.partido,
      titular: parl.titular
    })
  }
  res.status(200).json(response)
}