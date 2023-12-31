import axios from "axios";
import { withSessionRoute } from "@/lib/withSession";

export default withSessionRoute(async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { id, name, email, password, password_confirmation } = req.body;
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

        if (req.body.isGuest) {
          const response = await axios.post(`${API}/api/v1/guest/register`, {
            guest_id: id.toString(),
            name,
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
          return;
        }

        const response = await axios.post(`${API}/api/v1/register`, {
          name,
          email,
          password,
        });
        console.log(response);

        const dataUser = {
          id: response.data.data.id,
          name: response.data.data.name,
          email: response.data.data.email,
          phonenumber: response.data.data.phonenumber,
          token: response.data.data.access_token,
        };
        console.log(dataUser);

        req.session.user = dataUser;
        await req.session.save();

        res.status(200).json({
          message: response.data.message,
        });
      } catch (error: any) {
        const { data } = error.response;
        console.log(data);

        let customMessage = data.message;
        let statusCode = 400;
        if (data.errors.email) {
          customMessage = data.errors.email[0];
        }

        if (data.errors.password) {
          customMessage = data.errors.password[0];
        }

        if (customMessage === "The email has already been taken.") {
          customMessage = "Email sudah terdaftar";
        }

        if (
          customMessage === "The email field must be a valid email address."
        ) {
          customMessage = "Email tidak valid";
        }

        if (
          customMessage ===
          "The given password has appeared in a data leak. Please choose a different password."
        )
          customMessage =
            "Password lemah, gunakan angka, huruf besar, dan huruf kecil";

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
