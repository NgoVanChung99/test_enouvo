import React, {Component} from 'react';
import Modal from "react-bootstrap/lib/Modal";
import axios from 'axios';
import api from '../../api'
import { Link } from 'react-router-dom'
import {ToastNotification, errorMsg, successMsg, warnMsg} from '../../components/notification';
import '../../style/css/login.css'

class Login extends Component {


	constructor(props) {
        super(props);
        this.state = {
            login: {
                email: '',
                password: '',
            }        
        }
    }

    login = (e) => {
        e.preventDefault();
        let self = this;
        api.post('/v1/auth/login', self.state.login)
            .then(function (response) {
                //---set Authorization header ---
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                //token store in session storage
                sessionStorage.setItem('token', response.data.token);
                self.props.history.push('/');
            })
            .catch(function (error) {
                errorMsg('Invalid Credentials! Please Enter Valid Credentials.');
                console.log("login error response :: ", error);
            });
    };



    render() {
    	const {login, openDlgFlg} = this.state;
      	return (
      		<div className="login-container">
                <div className="starter-template">

                    <form className="form-horizontal" onSubmit={this.login}>
                        <div className="form-group">
                            <div className="col-sm-offset-3 col-sm-7">
                                <h3>Test React System</h3>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Email </label>

                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="email" name="email"
                                       placeholder="Email"
                                       value={login.email}
                                       onChange={(e) => this.setState({
                                           login: {
                                               ...login,
                                               email: e.target.value
                                           }
                                       })}
                                       required="true"/>
                            </div>
                        </div>


                        <div className="form-group">
                            <label className="col-sm-2 control-label">Password</label>

                            <div className="col-sm-9">
                                <input type="password" className="form-control" id="password" name="password"
                                       value={login.password}
                                       onChange={(e) => this.setState({
                                           login: {
                                               ...login,
                                               password: e.target.value
                                           }
                                       })}
                                       placeholder="Password"
                                       required="true"/>
                            </div>
                        </div>
                        <div className="forgot-password">
                        	<div className="col-sm-offset-7 col-sm-7">
                        		<Link to='/forgot-password'>Forgot password</Link>
                        	</div>	
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-5 col-sm-7">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
                <ToastNotification/>
             </div>
      		)
      }
}

export default Login;
