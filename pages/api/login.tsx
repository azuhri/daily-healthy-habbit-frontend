import axios from "axios";
import { withSessionRoute } from "../../lib/withSession";

export default withSessionRoute(async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { email, password } = req.body;
      const API = process.env.API;
      try {
          const response = await axios.post(`${API}/api/v1/login`, {
            email, password
          });
          console.log(response);
          
          const dataUser = {
            id: response.data.data.id,
            name: response.data.data.name,
            email: response.data.data.email,
            phonenumber: response.data.data.phonenumber,
            access_token: response.data.access_token,
          }
          console.log(dataUser);
          
          req.session.user = dataUser;
          await req.session.save();
          res.status(200).json({
            "message": response.data.message,
          })
      } catch (error:any) {
        const errorResponse = error.response.data;
        res.status(400).json({
            "message": errorResponse.message,
            "status": false
        });
      }
      break;
    default:
      res.status(405).end(`${req.method} Not Allowed`);
      break;
  }
});
