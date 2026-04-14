import api from './api';

export async function getProductsByCategory(category) {
  const response = await api.get(`/products/category/${category}`);
  return response.data.products;
}

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export async function getProductsFromCategories(categories) {
  const requests = categories.map((category) =>
    api.get(`/products/category/${category}`)
  );

  const responses = await Promise.all(requests);

  const allProducts = responses.flatMap((response) => response.data.products);

  return allProducts;
}