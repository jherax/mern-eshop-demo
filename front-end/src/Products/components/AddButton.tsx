import {Button, Container} from 'react-bulma-components';

function AddButton(props: AddButtonProps) {
  return (
    <Container className='is-pulled-right'>
      <Button onClick={props.onClick} color='primary' size='medium'>
        Add new product
      </Button>
    </Container>
  );
}

interface AddButtonProps {
  onClick: () => void;
}

export default AddButton;
