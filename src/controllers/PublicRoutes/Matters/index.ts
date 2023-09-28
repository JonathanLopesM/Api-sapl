import axios from "axios";
const url = process.env.URL_INTERLEGIS

export const MattersLegis = async (req, res) => {
  try {
    const { page, year, type, ementa, number } = req.query
    const getUrl = `${url}/api/materia/materialegislativa/?o=-data_apresentacao&?page=${page}&ano=${year ? year : ''}&tipo=${type ? type : ''}&ementa=${ementa ? ementa : ''}&numero=${number? number : ''}`
    const materiasResponse = await axios.get(getUrl);
    const pagination = materiasResponse.data.pagination
    const materias = materiasResponse.data.results;

    const response = await Promise.all(
      materias.map(async matter => {
        const autorResponse = await axios.get(`${url}/api/materia/autoria/?materia=${matter.id}`);
        const autores = autorResponse.data.results.map(autores => {
          const nameArray = autores.__str__.split(" - ");
          return {
            id: autores.id,
            name: nameArray[0],
            __str__: autores.__str__,
            primeiro_autor: autores.primeiro_autor,
            autor: autores.autor,
            materia: autores.materia
          };
        });

        return {
          id: matter.id,
          __str__: matter.__str__,
          data_apresentacao: matter.data_apresentacao,
          numero: matter.numero,
          ano: matter.ano,
          ementa: matter.ementa,
          resultado: matter.resultado,
          texto_original: matter.texto_original,
          autores
        };
      })
    );

    res.status(200).json({ pagination , response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};
