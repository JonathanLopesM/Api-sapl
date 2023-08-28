import UserModel from "../../models/UserModel";
import UserParlamModel from "../../models/UserParlamModel";


export const DeleteUser = async (req, res) => {
  const { id } = req.params;
try {
  let response;
  response = await UserModel.findByIdAndDelete(id)
  if(!response){
    response = await UserParlamModel.findByIdAndDelete(id)
  }

  res.status(204).json({message: "user delete success ", response})
} catch (error) {
  console.log(error, "server not delete")
}
}