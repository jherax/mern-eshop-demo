import React from 'react';
import Header from './Header';
import AddButton from './AddButton';
import ListProducts from './ListProducts';

function ProductLayout() {
  return (
    <>
      <Header title='Products Catalog'></Header>
      <AddButton></AddButton>
      <ListProducts></ListProducts>
    </>
  );
}

export default ProductLayout;
