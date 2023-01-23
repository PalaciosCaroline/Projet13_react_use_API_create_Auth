import Router from './Router';
import HeaderPage from './components/HeaderPage'
import Footer from './components/Footer'

function App() {
  return (
    <div className="container_app">
      <HeaderPage />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
