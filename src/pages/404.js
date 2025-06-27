import MainLayout from "../internals/MainLayout";
import FullBox from "../components/FullBox";

function Error() {
  return (
    <MainLayout noPadding>
      <FullBox useDims={true}>
        <h1>404</h1>
        <p>Whatever you tried to access doesn't exist.</p>
      </FullBox>
    </MainLayout>
  );
}

export default Error;
