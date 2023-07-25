import {Card, Columns, Content, Heading, Section} from 'react-bulma-components';
import Loading from './Loading';

function ListProducts({products, isLoading}: ListProductsProps) {
  // component for loading
  if (isLoading) {
    return <Loading />;
  }
  // component for empty elements
  if (!products.length) {
    return (
      <Section>
        <h3 className='subtitle has-text-centered'>
          There are no products to list
        </h3>
      </Section>
    );
  }
  // component to list elements
  return (
    <Columns>
      {products.map((item, key) => {
        return (
          <Columns.Column key={key} size={3}>
            <Card>
              <Card.Image
                size='4by5'
                src={item.imgUrl}
                alt={getAltText(item.imgUrl)}
              />
              <Card.Content>
                <Content>
                  <Heading size={4}>{item.name}</Heading>
                  <Heading subtitle size={6}>
                    Price: USD ${item.unitaryPrice}
                  </Heading>
                  <Heading subtitle size={6}>
                    Size: {item.size}
                  </Heading>
                  <p>{item.description}</p>
                </Content>
              </Card.Content>
            </Card>
          </Columns.Column>
        );
      })}
    </Columns>
  );
}

function getAltText(src: string | undefined) {
  if (!src) return 'No image available';
  return '';
}

export default ListProducts;

interface ListProductsProps {
  products: IProduct[];
  isLoading: boolean;
}
