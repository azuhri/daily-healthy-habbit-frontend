import axios from "axios";
import { withSessionRoute } from "../../lib/withSession";

export default withSessionRoute(async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      const { name, email } = req.body;

      const API = process.env.API;
      const access_token = `Bearer ${req.session.user?.token}`;
      const config = {
        headers: {
          Authorization: access_token,
          'Content-Type': 'application/json',
          'Access-Control-Expose-Headers': 'Authorization',
        },
      };

      const dataRequest = {name, email};      

      try {
        const url = `${API}/api/v1/user`;
        const config = {
          headers: {
            Authorization: `${access_token}`,
          },
        };
        const response = await axios.patch(url, dataRequest, config);
        const updatedUser = {
            id: req.session.user?.id || 0,
            name: name || "",
            email: email || "",
            phonenumber: req.session.user?.phonenumber || "",
            token: req.session.user?.token || "",
        };
        req.session.user = updatedUser;
        await req.session.save();
        res.status(200).json(response.data);
      } catch (error:any) {
        const { data } = error.response;
        res.status(400).json(data);
      }
      break;
    default:
      res.status(405).end(`${req.method} Not Allowed`);
      break;
  }
});
