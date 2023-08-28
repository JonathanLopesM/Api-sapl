import axios from "axios";

export const votesapl = async (req, res) => {
  const { 
    materia, ordem,
    tipo_resultado_votacao, observacao,
    numero_votos_sim,
    numero_votos_nao,
    numero_abstencoes,
	  votes  } = req.body;
  const url = process.env.URL_INTERLEGIS
  const token = process.env.TOKEN_INTERLEGIS;

    //Registro de votacao, irá retornar o id de votacao 
    let resultadoString;
    if(!tipo_resultado_votacao){
      resultadoString= ""
    }
    if(tipo_resultado_votacao == 1){
      resultadoString = "APROVADO POR MAIORIA ABSOLUTA"
    }
    if(tipo_resultado_votacao == 2){
      resultadoString ="APROVADO POR MAIORIA SIMPLES"
    }
    if(tipo_resultado_votacao == 3){
      resultadoString = "REPROVADA"
    }
    if(tipo_resultado_votacao == 4){
      resultadoString = "Matéria lida"
    }
    if(tipo_resultado_votacao == 5){
      resultadoString ="APROVADA EM 1º DISCUSSÃO"
    }
    if(tipo_resultado_votacao == 6){
      resultadoString = "APROVADA EM 2º DISCUSSÃO"
    }
    if(tipo_resultado_votacao == 7){
      resultadoString = "APROVADA EM REGIME DE URGÊNCIA ESPECIAL"
    }
    if(tipo_resultado_votacao == 8){
      resultadoString = "APROVADA EM DISCUSSÃO ÚNICA"
    }
    if(tipo_resultado_votacao == 9){
      resultadoString = "APROVADO POR 2/3"
    }
    if(tipo_resultado_votacao == 10){
      resultadoString = "PEDIDO DE VISTA"
    }
      try {
         await axios.post(`${url}/api/sessao/registrovotacao/`, 
            {  
                "numero_votos_sim": numero_votos_sim,
                "numero_votos_nao": numero_votos_nao,
                "numero_abstencoes": 12,
                "observacao": observacao,
                "tipo_resultado_votacao": tipo_resultado_votacao,
                "materia": materia,
                "ordem": ordem
            },
            {
              headers: {
                'Authorization': `Token `+ token
              }
            }).then(async (respoSapl)=>{
                //votacao de cada parlamentar 
                for(let vote of votes){
                  await axios.post(`${url}/api/sessao/votoparlamentar/`,{
                    "voto": vote.voto,
                    "ip": "string",
                    "parlamentar": vote.id,
                    "ordem": ordem,
                  }, {
                    headers: {
                      'Authorization': `Token `+ token
                    }
                  }).then(async (res) => {
                    await axios.patch(`${url}/api/sessao/ordemdia/${ordem}/`,{
                      resultado: resultadoString,
                      observacao: observacao
                    }, {
                      headers: {
                        'Authorization': `Token `+ token
                      }
                    })
                  })
                }
            })
            
        
        res.status(200).json({ message: "ok valeu"})
      } catch (error) {
        console.log(error, "error que ocorreu ")
        res.status(404).json({ message: "ok valeu"})
      }

}