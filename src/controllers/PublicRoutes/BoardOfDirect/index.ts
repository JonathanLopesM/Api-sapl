import axios from "axios"

const url = process.env.URL_INTERLEGIS;
const idtable = process.env.MESA_ATUAL

export const BoardOfDirect = async (req, res) => {
  try {
    const parlamentaresResponse = await axios.get(`${url}/api/parlamentares/parlamentar/search_parlamentares/?page_size=50`);
    const mesaDiretoraResponse = await axios.get(`${url}/api/parlamentares/composicaomesa/?mesa_diretora=${idtable}`);

    const parlamentares = parlamentaresResponse.data;
    const mesaDiretora = mesaDiretoraResponse.data.results;

    const response = parlamentares.map(parl => {
      const tab = mesaDiretora.find(tab => parl.id === tab.parlamentar);

      if (tab) {
        const cargo = tab.__str__.split(" - ");
        return {
          id: parl.id,
          __str__: parl.nome_parlamentar,
          fotografia: url + parl.fotografia_cropped,
          mesa_diretora: tab.mesa_diretora,
          cargo: tab.cargo,
          cargo_str: cargo[1]
        };
      }

      return null;
    }).filter(Boolean);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};
