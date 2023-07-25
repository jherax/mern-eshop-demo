import {useState} from 'react';
import {Modal} from 'react-bulma-components';

import Header from './Header';
import AddButton from './AddButton';
import ListProducts from './ListProducts';
import ProductForm from './ProductForm';
import {saveProduct} from '../services';

function ProductLayout() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClickAddButton = () => {
    setIsModalOpen(true);
  };

  const onSubmitForm = (data: ProductFormValues) => {
    saveProduct(data).then(product => {
      setRefreshCount(refreshCount + 1);
      setIsModalOpen(false);
    });
  };

  return (
    <>
      <Header title='Products Catalog'></Header>
      <AddButton onClick={onClickAddButton}></AddButton>
      <ListProducts refreshCount={refreshCount}></ListProducts>
      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Card>
          <Modal.Card.Header showClose={false}>
            <Modal.Card.Title>Add New Product</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <ProductForm
              onSubmitForm={onSubmitForm}
              onCancelForm={closeModal}
            ></ProductForm>
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </>
  );
}

export default ProductLayout;
