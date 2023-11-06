import axios from "axios";
import { withSessionRoute } from "../../lib/withSession";


export default withSessionRoute(async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const API = process.env.API;
      const { email, password } = req.body;
      
      try {
        let response;
        if (req.body.isGuest) {
          let guest_id = req.body.guest_id;
          response = await axios.post(`${API}/api/v1/guest/login`, {guest_id});

          const dataUser = {
            id: response.data.data.agile_teknik_user.metadata.agileteknik_user
              .guest_id,
            name: response.data.data.name,
            email: response.data.data.email,
            phonenumber: response.data.data.phonenumber,
            token: response.data.data.access_token,
          };
          
          req.session.user = dataUser;
          await req.session.save();
          res.status(200).json({
            message: response.data.message,
            guest_id: dataUser.id,
          });
          return;
        }

        response = await axios.post(`${API}/api/v1/login`, {
          email,
          password,
        });

        const dataUser = {
          id: response.data.data.id,
          name: response.data.data.name,
          email: response.data.data.email,
          phonenumber: response.data.data.phonenumber,
          token: response.data.data.access_token,
        };

        req.session.user = dataUser;
        await req.session.save();
        res.status(200).json({
          message: response.data.message,
        });
      } catch (error: any) {
        const { data } = error.response;

        let customMessage = data.message;
        let statusCode = 400;
        if (data.errors.email) {
          customMessage = data.errors.email[0];
        }

        if (data.errors.password) {
          customMessage = data.errors.password[0];
        }

        if (customMessage === "These credentials do not match our records.")
          customMessage = "Email atau Password salah";

        if (customMessage === "The email field must be a valid email address.")
          customMessage = "Email tidak valid";

        res.status(statusCode).json({
          message: customMessage,
        });
      }
      break;
    default:
      res.status(405).end(`${req.method} Not Allowed`);
      break;
  }
});
