import React from 'react';
import {Button, Container, Section} from 'react-bulma-components';

function AddButton() {
  return (
    <Section>
      <Container className='is-pulled-right'>
        <Button color='primary'>Add</Button>
      </Container>
    </Section>
  );
}

export default AddButton;
