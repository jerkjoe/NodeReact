import React, { useState, useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { Modal } from 'antd';

import logo from '../logo.png';

import './Header.css';
import Login from '../Login/Login';

export default function Header() {
    const { state, dispatch } = useContext(AppContext);
    
    let [loginAction, setLoginAction] = useState(false)
    
    let [showModal, setShowModal] = useState(false)
    
    useEffect(function() {
        console.log('123123123131231')
        setShowModal(false)
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
    function openModal() {
        setShowModal(true)
    }
    function closeModal(event) {
        setShowModal(false)
    }
    
    function onSubmit(event) {
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
                    <a onClick={openModal}>Login</a>
                )}
            </div>
            <Modal title="Login" visible={showModal} okText="Submit" onOk={onSubmit} onCancel={closeModal}>
                <Login login={loginAction}></Login>
            </Modal>
        </header>
    );
}
