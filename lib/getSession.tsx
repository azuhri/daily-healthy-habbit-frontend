import { withSessionSsr } from '@/lib/withSession';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = withSessionSsr(
  async function getServersideProps({ req, res }: GetServerSidePropsContext) {
    try {
      const user = req.session.user || null;
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
          user
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
