import UserModel from "../../models/UserModel";
import UserParlamModel from "../../models/UserParlamModel";


export const DeleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id, "id no params")
try {
  let response;
  response = await UserModel.findByIdAndDelete(id)
  console.log(response)
  if(!response){
    response = await UserParlamModel.findByIdAndDelete()
  }

  res.status(204).json({message: "user delete success ", response})
} catch (error) {
  console.log(error, "server not delete")
}
}