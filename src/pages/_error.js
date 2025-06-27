import MainLayout from "../internals/MainLayout";
import FullBox from "../components/FullBox";

function Error({ statusCode }) {
  return (
    <MainLayout noPadding>
      <FullBox useDims={true}>
        <h1>oops</h1>
        <p>{statusCode ? `An error ${statusCode} occurred on the server` : "An error occurred on client"}</p>
      </FullBox>
    </MainLayout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
