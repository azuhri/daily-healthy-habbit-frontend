import { withSessionRoute } from "../../lib/withSession";

export default withSessionRoute(async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        req.session.destroy();
        res.status(200).json({
          message: "Logout berhasil",
        });
      } catch (error) {
        console.error("Error saat logout:", error);
        res.status(500).json({
          message: "Terjadi kesalahan saat logout",
        });
      }
      break;
    default:
      res.status(405).end(`${req.method} Not Allowed`);
      break;
  }
});