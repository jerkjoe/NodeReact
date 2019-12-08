import React from "react";
import {
    BrowserRouter as Router,
    HashRouter as HashRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from './Login/Login'
import NewArticle from './NewArticle/NewArticle'
import Articles from './Articles/Articles'
import Post from './Post/Post'
import Header from './Header/Header'


export default function BlogRouter() {
    return (
        <HashRouter>
            <Header />
            <div>
                {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/article/:id" component={Post}>
                        {/* <Post /> */}
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/new">
                        <NewArticle />
                    </Route>
                    <Route path="/">
                        <Articles />
                    </Route>
                </Switch>
            </div>
        </HashRouter>
    );
}
