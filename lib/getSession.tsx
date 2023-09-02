import { withSessionSsr } from '@/lib/withSession';
import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = withSessionSsr(
  async function getServersideProps({ req, res }: GetServerSidePropsContext) {
    try {
      const user = req.session.user || null;
      console.log("test");
      if (!user) {
        return {
          redirect: {
            destination: '/login',
            statusCode: 307
          }
        };
      }
      return {
        props: {
          user: user
        }
      };
    } catch (err) {
      return {
        redirect: {
          destination: '/login',
          statusCode: 307
        }
      };
    }
  }
);
