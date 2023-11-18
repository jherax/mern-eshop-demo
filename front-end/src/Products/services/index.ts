import {axiosGet, axiosPost} from '../../config/axios.cfg';
import config from '../../config/app.cfg';
import logger from '../../config/logger';

export async function getProducts(): Promise<IProduct[]> {
  const response = await axiosGet<ProductsResponse>(
    `${config.api.baseUrl}/products`,
  );
  // logger.log(response);
  if (response?.success) {
    return response.data ?? [];
  }
  logger.warn('Unsuccessful response: ', response);
  return [];
}

export async function saveProduct(data: ProductFormValues): Promise<IProduct> {
  const formData = new FormData();
  formData.append('name', data.productName);
  formData.append('size', data.productSize);
  formData.append('unitaryPrice', data.unitaryPrice);
  formData.append('description', data.description);
  formData.append('imgfile', data.imageFile as Blob);

  const response = await axiosPost<ProductResponse>(
    `${config.api.baseUrl}/products`,
    formData,
  );

  // logger.log(response);
  if (response?.success) {
    return response.data ?? Object.create(null);
  }
  logger.warn('Unsuccessful response: ', response);
  return Object.create(null);
}

export type ProductsResponse = ServerResponse<IProduct[]>;
export type ProductResponse = ServerResponse<IProduct>;
