import {type FormEvent, type ChangeEvent, useState, useRef} from 'react';
import {Button, Form} from 'react-bulma-components';

const {Field, Control, Label, Input, Textarea} = Form;

function ProductForm(props: ProductFormProps) {
  const [formValues, setFormValues] = useState({
    productName: '',
    productSize: '',
    unitaryPrice: '',
    description: '',
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    const currentFile = fileInputRef?.current;
    if (currentFile?.files?.length) {
      // console.log(currentFile.files[0].name);
    }
  };

  /** @see https://react-bulma.dev/en/storybook */
  return (
    <form name='productForm' onSubmit={handleSubmit}>
      <Field>
        <Label>Name</Label>
        <Control>
          <Input
            name='productName'
            value={formValues.productName}
            onChange={handleOnChange}
          ></Input>
        </Control>
      </Field>

      <Field>
        <Label>Unitary Price</Label>
        <Control>
          <Input
            type='number'
            name='unitaryPrice'
            value={formValues.unitaryPrice}
            onChange={handleOnChange}
          ></Input>
        </Control>
      </Field>

      <Field>
        <Label>Size</Label>
        <Control>
          <Input
            name='productSize'
            value={formValues.productSize}
            onChange={handleOnChange}
          ></Input>
        </Control>
      </Field>

      <Field>
        <Label>Description</Label>
        <Textarea
          rows={2}
          name='description'
          value={formValues.description}
          onChange={handleOnChange}
        ></Textarea>
      </Field>

      <Field>
        <Label>Picture</Label>
        <Control>
          <input
            type='file'
            accept='image/*'
            name='imageFile'
            ref={fileInputRef}
          />
        </Control>
      </Field>

      <br />

      <Field kind='group'>
        <Control>
          <Button type='submit' color='link'>
            Save
          </Button>
        </Control>
        <Control>
          <Button
            type='button'
            color='link'
            colorVariant='light'
            onClick={props.onCancelForm}
          >
            Cancel
          </Button>
        </Control>
      </Field>
    </form>
  );
}

export default ProductForm;

export interface ProductFormProps {
  onCancelForm: () => void;
}
