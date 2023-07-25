import {useEffect, useState} from 'react';
import {Box, Section, Table} from 'react-bulma-components';

import {getProducts} from '../services';
import Loading from './Loading';

function ListProducts({refreshCount}: ListProductsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);

  // ComponentDidMount
  useEffect(() => {
    // useEffect doesn't allow an async function on its body
    // that's why we wrapped the async/await call as an IIFE
    (async () => {
      const data = await getProducts();
      setProducts(data);
      setIsLoading(false);
      console.log('getProducts:', data);
    })();
  }, [refreshCount]);

  // component for loading
  if (isLoading) {
    return <Loading />;
  }
  // component for empty elements
  if (!products.length) {
    return (
      <Section>
        <h3 className='subtitle has-text-centered'>You don't have products</h3>
      </Section>
    );
  }
  // component to list elements
  return (
    <Section>
      <Box>
        <Table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Size</th>
              <th>Unitary Price $</th>
              <th>Description</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>{item.unitaryPrice}</td>
                  <td>{item.description}</td>
                  <td>
                    <a
                      href={item.imgUrl}
                      title={item.name}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {item.imgUrl}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Box>
    </Section>
  );
}

export default ListProducts;

interface ListProductsProps {
  refreshCount: number;
}
