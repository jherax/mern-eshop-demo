import React from 'react';
import {Button, Container, Section} from 'react-bulma-components';

function AddButton(props: AddButtonProps) {
  return (
    <Section>
      <Container className='is-pulled-right'>
        <Button onClick={props.onClick} color='primary'>
          Add
        </Button>
      </Container>
    </Section>
  );
}

interface AddButtonProps {
  onClick: () => void;
}

export default AddButton;
