import config from '../../config/app.cfg';
import {axiosGet} from '../../config/axios.cfg';

async function getProducts(): Promise<IProduct[]> {
  const response = await axiosGet<ProductsResponse>(
    `${config.api.baseUrl}/products`,
  );
  // console.log(response);
  if (response?.success) {
    return response.data || [];
  }
  console.warn('Unsuccessful response: ', response);
  return [];
}

export default getProducts;
export type ProductsResponse = ServerResponse<IProduct[]>;
