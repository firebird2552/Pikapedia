import { BrowserRouter as Router } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from 'react-query';

// Custom imports
import Header from './views/Header'
import Content from './views/Content'
import { Footer } from './components/Footer';
import {createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
const lightTheme = createTheme({
  palette: {
    primary:{
      main: '#000000'
    }
  }});

  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={lightTheme}>

    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="app_container">
      <Header />
      <Content />
      <Footer />
          </div>
      </QueryClientProvider>
    </Router>
    </ThemeProvider>
  );
}

export default App;
