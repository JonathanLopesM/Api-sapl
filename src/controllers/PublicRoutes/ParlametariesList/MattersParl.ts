import axios from "axios";
const url = process.env.URL_INTERLEGIS

export const MattersParlAutor = async (req, res) => {
  try {
    const { parlId, page, selectedValue, year, number, perPage } = req.query

    const getUrl = `${url}/api/materia/materialegislativa/?autores=${parlId}&page=${page}&tipo=${selectedValue ? selectedValue : ''}&numero=${number ? number : ''}&ano=${year ? year : ''}&page_size=${perPage}`
    const materiasResponse = await axios.get(getUrl);
    const pagination = materiasResponse.data.pagination
    const materias = materiasResponse.data.results;

    res.status(200).json({ pagination, materias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};
