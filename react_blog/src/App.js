import React from 'react';
// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Login from './Login/Login'
import NewArticle from './NewArticle/NewArticle'
import BlogRouter from './Router'
function App() {
  return (

    <div>
      <BlogRouter />
    </div>
  );
}

export default App;
