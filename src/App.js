import "./App.css";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import Products from "./components/Products/Products";
import Slider from "./components/Slider/Slider";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Slider />
      <Products />
      <Footer />
    </div>
  );
}

export default App;
