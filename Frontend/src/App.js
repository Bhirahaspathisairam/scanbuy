import logo from "./logo.svg";
import "./App.css";
import BookComponent from "./components/BookComponent";
import Header from "./components/Header/header";

function App() {
  return (
    <div className="App">
      <Header />
      <BookComponent></BookComponent>
    </div>
  );
}

export default App;
