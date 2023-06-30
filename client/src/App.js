import { Container } from '@material-ui/core';
import './app.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  
  return (
    <BrowserRouter>
      <Container maxWidth='lg'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/auth' exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
