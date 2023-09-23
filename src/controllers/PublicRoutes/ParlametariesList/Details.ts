import axios from "axios";
const url = process.env.URL_INTERLEGIS

export async function Details(req, res) {
  try {
    const { id } = req.params;

    // Obter informações completas do parlamentar
    const completParl = await axios.get(`${url}/api/parlamentares/parlamentar/${id}`);
    const parlamentarData = completParl.data;

    // Obter informações do mandato do parlamentar
    const mandatoData = await axios.get(`${url}/api/parlamentares/mandato/?parlamentar=${id}`);
    const mandato = mandatoData.data.results[0];

    // Obter informações da legislatura
    const legislaturaData = await axios.get(`${url}/api/parlamentares/legislatura/${mandato.legislatura}`);
    const legislatura = legislaturaData.data;

    // Obter informações do autor
    const autorData = await axios.get(`${url}/api/base/autor/?object_id=${id}`);
    const autor = autorData.data.results[0].id;

    // Construir a resposta
    const response = {
      ...parlamentarData,
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
