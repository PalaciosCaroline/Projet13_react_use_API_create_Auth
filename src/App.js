import Router from './Router';
import HeaderPage from './components/HeaderPage'
import Footer from './components/Footer'


function App() {
  document.title = 'Argent Bank - Home Page'

  return (
    <div className="container_app">
      <HeaderPage/>
      <Router />
      <Footer />
    </div>
  );
}

export default App;
