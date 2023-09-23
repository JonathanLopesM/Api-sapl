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
  } = req.body as any;

  const matter = {
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
  };

  try {
    const response = await axios.post(`${url}/api/sessao/registrovotacao/`, matter, {
      headers: {
        Authorization: `Token ${token}`
      }
    });

    if (response.data.id) {
      const votePromises = voteResParl.map(async (par) => {
        const data = {
          voto: par.voto,
          ip: "",
          votacao: response.data.id,
          parlamentar: par.id,
          user: 12,
          ordem,
          expediente: null
        };

        return axios.post(`${url}/api/sessao/votoparlamentar/`, data, {
          headers: {
            Authorization: `Token ${token}`
          }
        });
      });

      await Promise.all(votePromises);
    }

    res.status(200).json({ message: "ok, registro com sucesso" });
  } catch (error) {
    console.error(error, "Erro durante o registro");
    res.status(500).json({ message: "Erro durante o registro" });
  }
};
