import React, { useReducer, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Login from './Login/Login';
import NewArticle from './NewArticle/NewArticle';
import BlogRouter from './Router';
function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(function() {
        if(window.sessionStorage.getItem('login_user')) {
            dispatch({
                type: 'UPDATE_LOGIN_STATUS',
                data: {
                    login: true,
                    login_user: window.sessionStorage.getItem('login_user')
                }
            })
        }
    }, [])
    return (
        <div>
            <AppContext.Provider value={{ state, dispatch }}>
                <BlogRouter />
            </AppContext.Provider>
        </div>
    );
}

const initialState = {
    login: false,
    login_user: 'Test'
};
function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_LOGIN_STATUS':
            return {
                login: action.data.login,
                login_user: action.data.login_user
            };

        default:
            return initialState;
    }
}

export const AppContext = React.createContext();

export default App;
