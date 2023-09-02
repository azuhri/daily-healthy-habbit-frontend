import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from "next";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
        id: string,
        name: string,
        email: string,
        phonenumber: string | null
        access_token: string
    }
  }
}
const sessionOptions = {
  password: 'UU33AKKVTCL8XTB7ULFWUQTMQLNQ652T',
  cookieName: "daily_healthy_habit_cookie",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    // secure: process.env.NODE_ENV === "production",
    maxAge: 3600*24*7
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr<P extends { [key: string]: unknown } = { [key: string]: unknown } >(
  handler: ({req, res}: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, sessionOptions);
}