import axios from "axios";
const url = process.env.URL_INTERLEGIS

export async function Details(req, res) {
  try {
    const { id } = req.params;

    // Fazer todas as chamadas em paralelo
    const [completParlResponse, mandatoResponse, autorResponse] = await Promise.all([
      axios.get(`${url}/api/parlamentares/parlamentar/${id}`),
      axios.get(`${url}/api/parlamentares/mandato/?parlamentar=${id}`),
      axios.get(`${url}/api/base/autor/?object_id=${id}`),
    ]);

    const parlamentarData = completParlResponse.data;
    const mandato = mandatoResponse.data.results[0];
    const autor = autorResponse.data.results[0].id;

    // Obter informações da legislatura
    const legislaturaData = await axios.get(`${url}/api/parlamentares/legislatura/${mandato.legislatura}`);
    const legislatura = legislaturaData.data;

    console.log(parlamentarData, 'parlamentares');
    // Construir a resposta
    const response = {
      __str__: parlamentarData.__str__,
      nome_completo: parlamentarData.nome_completo,
      nome_parlamentar: parlamentarData.nome_parlamentar,
      sexo: parlamentarData.sexo,
      email: parlamentarData.email,
      voto_recebidos: mandato.votos_recebidos,
      titular: mandato.titular,
      legislatura: legislatura.__str__,
      autor: autor,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
}
