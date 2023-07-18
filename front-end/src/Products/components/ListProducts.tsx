import React, {useEffect, useState} from 'react';
import Loading from './Loading';

function ListProducts() {
  const [isLoading, setIsLoading] = useState(true);

  // ComponentDidUpdate
  useEffect(() => {
    console.info('useEffect after render');
    // performs a subscription, it should be cleaned.
    const timerId = setTimeout(() => setIsLoading(false), 3000);
    // sanitizes after useEffect, returned function is executed.
    return () => clearTimeout(timerId);
  });

  // ComponentDidMount
  useEffect(() => {
    console.info('ComponentDidMount');
  }, []);

  // ComponentShouldUpdate, when isLoading changes
  // useEffect(()=>{},[isLoading])

  return <>{isLoading ? <Loading /> : 'No hay productos'}</>;
}

export default ListProducts;
