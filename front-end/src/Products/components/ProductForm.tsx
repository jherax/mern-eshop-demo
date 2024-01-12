import {type FormEvent, type ChangeEvent, useState, useRef} from 'react';
import {Button, Form} from 'react-bulma-components';

const {Field, Control, Label, Input, Textarea, Select} = Form;

function ProductForm(props: Readonly<ProductFormProps>) {
  const [formValues, setFormValues] = useState<ProductFormValues>({
    productName: '',
    productSize: 'S',
    unitaryPrice: '',
    description: '',
  });

  const [cssClass, setCssClass] = useState<ProductFormValues>({
    productName: '',
    productSize: '',
    unitaryPrice: '',
    description: '',
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const data: ProductFormSubmit = {...formValues};
    e.preventDefault();

    /**
     * Validates the form
     * @see https://bulma.io/documentation/form/general/
     */
    let hasErrors: boolean = false;
    const cssClasses = Object.keys(data).reduce((classes, key) => {
      const field = data[key as keyof ProductFormValues];
      classes[key] = field ? '' : 'is-danger';
      hasErrors = hasErrors || !field;
      return classes;
    }, Object.create(null));

    const currentFile = fileInputRef?.current;
    if (currentFile?.files?.length) {
      data.imageFile = currentFile.files[0];
    }

    setCssClass(cssClasses);
    data.hasErrors = hasErrors;
    props.onSubmitForm(data);
  };

  /** @see https://react-bulma.dev/en/storybook */
  return (
    <form name='productForm' onSubmit={handleSubmit} noValidate>
      <Field>
        <Label>Name</Label>
        <Control>
          <Input
            name='productName'
            value={formValues.productName}
            className={cssClass.productName}
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
            className={cssClass.unitaryPrice}
            onChange={handleOnChange}
          ></Input>
        </Control>
      </Field>

      <Field>
        <Label>Size</Label>
        <Control>
          <Select
            name='productSize'
            value={formValues.productSize}
            className={cssClass.productSize}
            onChange={handleOnChange}
          >
            <option value='S'>Small</option>
            <option value='M'>Medium</option>
            <option value='L'>Large</option>
          </Select>
        </Control>
      </Field>

      <Field>
        <Label>Description</Label>
        <Textarea
          rows={2}
          name='description'
          value={formValues.description}
          className={cssClass.description}
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

export type ProductFormSubmit = ProductFormValues & {hasErrors?: boolean};

export interface ProductFormProps {
  onSubmitForm: (data: ProductFormSubmit) => void;
  onCancelForm: () => void;
}
