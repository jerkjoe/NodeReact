import React, { useState, useEffect } from 'react';
import axios from 'axios'


export default function Register() {


    const ERROR_MSG = 'Username and password cannot be empty.';
    let [showError, setShowError] = useState('error-display');
    let [params, setParams] = useState({
        username: '',
        password: ''
    });
    let [submissionError, setSubmissionError] = useState('');
    function handleLogin() {
        return axios.post('http://nodeblog.josephjin.win/login', params);
    }
    function handleRegister() {
        return axios.post('http://nodeblog.josephjin.win/register', params);
    }

    function handleClick(event) {
        event.preventDefault();
        console.dir(params);
        if (params.username.length && params.password.length) {
            // handleLogin()
            //     .then(res => {
            //         console.log(res);
            //         let result = res.data;
            //         if (result.error) {
            //             console.log(result.message);
            //         } else {
            //             console.log(result.message);
            //             window.sessionStorage.setItem(
            //                 'login_user',
            //                 params.username
            //             );
            //             dispatch({
            //                 type: 'UPDATE_LOGIN_STATUS',
            //                 data: {
            //                     login: true,
            //                     login_user: params.username
            //                 }
            //             });
            //         }
            //     })
            //     .catch(err => {
            //         console.log('err');
            //     });
            handleRegister().then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        } else {
            console.log('Error message');
            setShowError('error-display active');
        }
    }



    function handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, ': ', value);

        // params[name] = value
        setParams(
            Object.assign(params, {
                [name]: value
            })
        );
        setShowError('error-display');
    }
    return (
        <div>
            <form name="login">
                <div className="inputs">
                    <div>
                        <label for="username">Username: </label>
                        <input
                            id="username"
                            name="username"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label for="password">Password: </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <p className={showError}>
                    {submissionError ? submissionError : ERROR_MSG}
                </p>
            </form>
        </div>
    )


}
