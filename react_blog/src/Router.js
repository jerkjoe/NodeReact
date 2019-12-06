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


export default function BlogRouter() {
    return (
        <HashRouter>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>

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
