import axios from "axios";

export const getMeals = async () => {
  const response = await axios.get('http://localhost:3000/meals');
  return response.data;
};

export const getOrders = async () => {
  const response = await axios.get('http://localhost:3000/orders');
  return response.data;
};

export const postOrder = async (order) => {
  response = await axios.post('http://localhost:3000/orders', { order });
};