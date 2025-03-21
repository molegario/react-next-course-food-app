import Header from './components/Header';
import MealsGrid from './components/MealsGrid';
import CartProvider from './store/cart-context';

function App() {
  return (
    <CartProvider>
      <Header />
      <MealsGrid />
    </CartProvider>
  );
}

export default App;
