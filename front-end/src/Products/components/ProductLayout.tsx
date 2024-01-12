import {useEffect, useState} from 'react';
import {Container, Modal, Section} from 'react-bulma-components';

import Header from './Header';
import AddButton from './AddButton';
import ListProducts from './ListProducts';
import ProductForm, {type ProductFormSubmit} from './ProductForm';
import {getProducts, saveProduct} from '../services';
import logger from '../../config/logger';

function ProductLayout() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isListLoading, setIsListLoading] = useState<boolean>(true);
  const [productsList, setProductsList] = useState<IProduct[]>([]);

  const loadProducts = async () => {
    const products = await getProducts();
    setProductsList(products);
    setIsListLoading(false);
    logger.log('getProducts:', products);
  };

  // ComponentDidMount
  useEffect(() => {
    // useEffect doesn't allow an async function on its body
    // that's why we wrapped the async/await call as an IIFE
    loadProducts();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClickAddButton = () => {
    setIsModalOpen(true);
  };

  const onSubmitForm = (data: ProductFormSubmit) => {
    if (!data.hasErrors) {
      saveProduct(data).then(product => {
        setIsModalOpen(false);
        const products = [...productsList, product];
        setProductsList(products);
      });
    }
  };

  return (
    <Container>
      <Section>
        <Header title='Products Catalog'></Header>
        <AddButton onClick={onClickAddButton}></AddButton>
      </Section>
      <Section>
        <ListProducts
          products={productsList}
          isLoading={isListLoading}
        ></ListProducts>
      </Section>
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
    </Container>
  );
}

export default ProductLayout;
