import React from 'react';
import { Route, Redirect  } from 'react-router-dom';

import Main from '../routes';
import Login from '../containers/login';
import Header from '../components/header';
import Footer from '../components/footer';
import '../style/css/login.css'

class CheckValidateRoute extends React.Component {
    render() {
        if(sessionStorage.getItem('token')){
            return (
                <div>
                    <Header/>
                    <Main />
                    <Footer/>
                </div>
            )
        }else{
            return (
                <div className="login-component" >
                    <Route path="/login" exact component={Login} />
                    <Redirect to="/login"  />
                </div>
            )
        }
    }
}
export default CheckValidateRoute;