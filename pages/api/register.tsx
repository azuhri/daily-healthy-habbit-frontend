import axios from "axios";
import { withSessionRoute } from "@/lib/withSession";

export default withSessionRoute(async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { name, email, password, password_confirmation } = req.body;
      const API = process.env.API;
      try {
        if (password !== password_confirmation) {
          res.status(400).json({
            message: "Password dan Konfirmasi Password tidak sama",
            status: false,
          });
          return;
        }

        if (password.length < 8) {
          res.status(400).json({
            message: "Password minimal 8 karakter",
            status: false,
          });
          return;
        }

        const response = await axios.post(`${API}/api/v1/register`, {
          name,
          email,
          password,
        });
        console.log(response);

        res.status(200).json({
          message: response.data.message,
        });
      } catch (error: any) {
        const errorResponse = error.response.data;
        res.status(400).json({
          message: errorResponse.message,
          status: false,
        });
      }
      break;
    default:
      res.status(405).end(`${req.method} Not Allowed`);
      break;
  }
});
