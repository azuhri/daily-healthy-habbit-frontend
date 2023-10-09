import axios from "axios";
import { withSessionRoute } from "../../lib/withSession";

export default withSessionRoute(async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { deviceToken } = req.body;

      const API = process.env.API;
      const access_token = `Bearer ${req.session.user?.token}`;
      const config = {
        headers: {
          Authorization: access_token,
          'Content-Type': 'application/json',
          'Access-Control-Expose-Headers': 'Authorization',
        },
      };

      const dataRequest = {
        deviceToken,
      };
      console.log(config);
      

      try {
        const response = await axios.put(
          `${API}/api/v2/user/device-token`,
          dataRequest,
          config
        );
        console.log(response);
        
        
        res.status(200).json(response.data);
      } catch (error: any) {
        const { data } = error.response;
        res.status(400).json(data);
      }
      break;
    default:
      res.status(405).end(`${req.method} Not Allowed`);
      break;
  }
});
