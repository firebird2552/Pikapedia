import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

import { BrowserRouter as Router } from 'react-router-dom'

// Custom imports
import Header from './components/Header'
import Content from './components/Content'

function App() {
  return (
    <Router className="App">
      <Header />
      <Content />
    </Router>
  );
}

export default App;
