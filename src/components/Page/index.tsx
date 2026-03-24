import { PageProps } from './types';
import { Container } from './styled';

const Page = ({ title, children }: PageProps): JSX.Element => {
  return (
    <Container data-testid="page-container">
      <h1>{title}</h1>
      {children}
    </Container>
  );
};

export default Page;