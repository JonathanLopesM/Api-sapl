import axios from "axios"
const url = process.env.URL_INTERLEGIS

export const ParlamentariesList = async (req, res) => {
  try {
    const parlamentares = await axios.get(`${url}/api/parlamentares/parlamentar/search_parlamentares/`);
    
    const parlamentaresFilter = parlamentares.data.filter(parl => parl.titular === "Sim");

    const response = parlamentaresFilter.map(parl => ({
      id: parl.id,
      nome_parlamentar: parl.nome_parlamentar,
      fotografia_cropped: `${url}${parl.fotografia_cropped}`,
      fotografia: parl.fotografia,
      ativo: parl.ativo,
      partido: parl.partido,
      titular: parl.titular
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};
