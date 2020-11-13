import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';


const App = () => {

  return (
      <Router>
        <Header/>
        <main className="py-3" >
          <Container>
            <Route path='/' exact component={HomeScreen}/>
            <Route path='/product/:id' exact component={ProductScreen}/>
            {/* :id? is optional, the id should be use with sign "?" to go to
             direct link: http://localhost:3000/cart without any id */}
            <Route path='/cart/:id?' component={CartScreen} />
          </Container>
        </main>
        <Footer/>
      </Router>
  );
};

export default App;