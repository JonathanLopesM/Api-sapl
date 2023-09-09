import axios from "axios"
const token = process.env.TOKEN_INTERLEGIS
const url = process.env.URL_INTERLEGIS


export const RegisterResultVote = async (req, res) => {
  const {
    sessionId,
    voteResParl,
    numero_votos_sim,
    numero_votos_nao,
    numero_abstencoes,
    observacao,
    ip,
    tipo_resultado_votacao,
    materia,
    ordem,
    expediente,
    user
  } = req.body as any
  
    let matter = {
      numero_votos_sim,
      numero_votos_nao,
      numero_abstencoes,
      observacao,
      ip,
      tipo_resultado_votacao,
      materia,
      ordem,
      expediente,
      user
    }

   const response = await axios.post(`${url}/api/sessao/registrovotacao/`,
   matter,
   {
    headers: {
      'Authorization': `Token${token}`
    }
  })

  // 
  //   response.data, "Requisião response do valor ")
    let respo;
      if(response.data.id){
        for(let par of voteResParl){

          let data = {
            voto: par.voto,
            ip: "",
            votacao: response.data.id,
            parlamentar: par.id,
            user: 12,
            ordem: ordem,
            expediente: null
          }
          // console.log(data, "data teste")
          respo = await axios.post(`${url}/api/sessao/votoparlamentar/`,
          data,
          {
            headers: {
              'Authorization': `Token${token}`
            }
          })
          // console.log(respo.data, "respo do voto de cada")
        }
      }

      console.log(respo, "respo ")
      
      res.status(200).json({ message: "ok, registro com sucesso"})


}