import AppLogo from "../assets/logo.jpg";
import CartButton from "./CartButton";

const Header = () => {

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={AppLogo} alt="App Logo" />
          <h1>reactphood</h1>
        </div>
        <nav>
          <CartButton />
        </nav>
      </header>
    </>
  );
};

export default Header;
