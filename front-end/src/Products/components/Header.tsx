import {Container} from 'react-bulma-components';

function Header({title}: HeaderProps) {
  return (
    <Container>
      <h1 className='title has-text-centered'>{title}</h1>
    </Container>
  );
}

export default Header;

export interface HeaderProps {
  title: string;
}
