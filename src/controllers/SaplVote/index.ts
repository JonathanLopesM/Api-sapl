import axios from "axios";

export const votesapl = async (req, res) => {
  const { materia, ordem, tipo_resultado_votacao, observacao, numero_votos_sim, numero_votos_nao, numero_abstencoes, votes } = req.body;
  const url = process.env.URL_INTERLEGIS;
  const token = process.env.TOKEN_INTERLEGIS;

  const resultadoStrings = [
    "",
    "APROVADO POR MAIORIA ABSOLUTA",
    "APROVADO POR MAIORIA SIMPLES",
    "APROVADO POR UNANIMIDADE",
    "REPROVADA",
    "Matéria lida",
    "APROVADA EM 1º DISCUSSÃO",
    "APROVADA EM 2º DISCUSSÃO",
    "APROVADA EM REGIME DE URGÊNCIA ESPECIAL",
    "APROVADA EM DISCUSSÃO ÚNICA",
    "APROVADO POR 2/3",
    "PEDIDO DE VISTA"
  ];

  try {
    const registroVotacaoResponse = await axios.post(
      `${url}/api/sessao/registrovotacao/`,
      {
        numero_votos_sim,
        numero_votos_nao,
        numero_abstencoes,
        observacao,
        tipo_resultado_votacao,
        materia,
        ordem
      },
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );

    const resultadoString = resultadoStrings[tipo_resultado_votacao];

    await Promise.all(
      votes.map(async vote => {
        await axios.post(
          `${url}/api/sessao/votoparlamentar/`,
          {
            voto: vote.voto,
            ip: "string",
            parlamentar: vote.id,
            ordem
          },
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        );

        await axios.patch(
          `${url}/api/sessao/ordemdia/${ordem}/`,
          {
            resultado: resultadoString,
            observacao
          },
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        );
      })
    );

    res.status(200).json({ message: "ok valeu" });
  } catch (error) {
    console.log(error, "error que ocorreu ");
    res.status(404).json(error);
  }
};
