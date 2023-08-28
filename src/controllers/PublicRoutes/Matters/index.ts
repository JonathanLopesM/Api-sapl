import axios from "axios";
const url = process.env.URL_INTERLEGIS

export const MattersLegis = async (req, res) => {
  const { page } = req.params;
  const materias = await axios.get(`${url}/api/materia/materialegislativa/?o=-data_apresentacao&page=${page}`)
  let resu= materias.data.results

  let response = [];

  for(let matter of materias.data.results){
    let autor = await axios.get(`${url}/api/materia/autoria/?materia=${matter.id}`)
    let autoresArray = [];
    for(let autores of autor.data.results){
      let nameArray= autores.__str__.split(" - ") 
      autoresArray.push({
        id: autores.id,
        name: nameArray[0],
        __str__:autores.__str__,
        primeiro_autor: autores.primeiro_autor,
        autor: autores.autor,
        materia: autores.materia
      })
    }
    response.push({
      id: matter.id,
      __str__: matter.__str__,
      data_apresentacao: matter.data_apresentacao,
      numero: matter.numero,
      ano: matter.ano,
      ementa: matter.ementa,
      resultado: matter.resultado,
      texto_original: matter.texto_original,
      autores: autoresArray

    })
  }

  res.status(200).json(response)
}