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
  const response = await axios.post('http://localhost:3000/orders', { order });
  console.log(response.data);
  return response.data.message;
};