import React from 'react';
import {Container, Section} from 'react-bulma-components';

function Header({title}: HeaderProps) {
  return (
    <Section>
      <Container>
        <h1 className='title has-text-centered'>{title}</h1>
      </Container>
    </Section>
  );
}

export default Header;

export interface HeaderProps {
  title: string;
}
