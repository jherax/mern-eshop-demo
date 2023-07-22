import React, {useState} from 'react';
import {Modal} from 'react-bulma-components';

import Header from './Header';
import AddButton from './AddButton';
import ListProducts from './ListProducts';
import ProductForm from './ProductForm';

function ProductLayout() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClickAddButton = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Header title='Products Catalog'></Header>
      <AddButton onClick={onClickAddButton}></AddButton>
      <ListProducts></ListProducts>
      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Card>
          <Modal.Card.Header showClose={false}>
            <Modal.Card.Title>Add New Product</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <ProductForm onCancelForm={closeModal}></ProductForm>
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </>
  );
}

export default ProductLayout;
