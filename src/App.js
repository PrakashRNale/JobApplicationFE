import logo from './logo.svg';
import './App.css';
import EmailForm from './components/EmailForm/EmailForm';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <EmailForm />
      <Footer />
    </div>
  );
}

export default App;
