import React, { useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { Modal } from 'antd';

import logo from '../logo.png';

import './Header.css';
import Login from '../Login/Login';
import Register from '../Register/Register';

export default function Header() {
    const { state, dispatch } = useContext(AppContext);
    
    let [loginAction, setLoginAction] = useState(false)
    
    let [showLoginModal, setShowLoginModal] = useState(false)
    let [showRegisterModal, setShowRegisterModal] = useState(false)
    
    
    useEffect(function() {
        console.log('123123123131231')
        setShowLoginModal(false)
    }, [
        state
    ])
    
    function handleLogout(event) {
        event.preventDefault();
        window.sessionStorage.clear('login_user')
        dispatch({
            type: 'UPDATE_LOGIN_STATUS',
            data: {
                login: false,
                login_user: ''
            }
        })
    }
    function openLoginModal() {
        setShowLoginModal(true)
    }
    function openRegisterModal() {
        setShowRegisterModal(true)
    }
    function closeLoginModal(event) {
        setShowLoginModal(false)
    }
    
    function onLogin(event) {
        setLoginAction(!loginAction)
    }
    return (
        <header>
            <div className="logo-wrapper image-wrapper">
                <img src={logo} alt="logo" />
            </div>
            <div className="links">
                {state.login ? (
                    <a onClick={handleLogout}>Logout</a>
                ) : (
                    <div>
                        <a onClick={openLoginModal}>Login</a>
                        <a style={{"padding-left": 20}} onClick={openRegisterModal}>Register</a>       
                    </div>
                                 
                )}
            </div>
            <Modal title="Login" visible={showLoginModal} okText="Login" onOk={onLogin} onCancel={closeLoginModal}>
                <Login login={loginAction}></Login>
            </Modal>
            <Modal title="Login" visible={showRegisterModal} okText="Login" onOk={onLogin} onCancel={closeLoginModal}>
                <Register login={loginAction}></Register>
            </Modal>
        </header>
    );
}
