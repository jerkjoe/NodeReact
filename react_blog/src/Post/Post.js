import ReactMarkdown from 'react-markdown'
import React, { useState, useEffect, useContext } from 'react';

import { AppContext } from '../App';


import './Post.css'

import axios from 'axios'
import { Link } from 'react-router-dom'


export default function Post(props) {
    
    const {state, dispatch} = useContext(AppContext)
    
    let [post, setPost] = useState({
        title: '',
        username: '',
        uuid: '',
        article: ''
    })
    let [displayEdit, setDisplayEdit] = useState(false)
    let [displayTextarea, setDisplayTextarea] = useState(false)
    useEffect(function() {
        console.log(props)
        if (props.location.state) {
            setPost(props.location.state.post)

            // setDisplayEdit(displayEditButton(props.location.state.post.username))


        }

    }, [])


    // function displayEditButton(username) {
    //     return window.sessionStorage.getItem('login_user') === username
    // }

    function handleEdit() {
        // const username = props.location.state.post.username
        setDisplayTextarea(true)
    }
    function handleTextChange(event) {
        const name = event.target.name
        const value = event.target.value

        setPost({ ...post, article: value })
    }
    
    function saveToServer() {
        const params = {
            username: post.username,
            article: post.article,
            title: post.title,
            uuid: post.uuid
        }
        axios.post('http://nodeblog.josephjin.win/article/update', params).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="content-container">
            <h1>
                {post.title}
            </h1>
            <p>
                <span>
                    Author: {post.username}
                </span>
                <br />
                <span>
                    Created time: {new Date(post.uuid - 0).toUTCString()}
                </span>
            </p>



            {
                // If the login user is the author
                state.login ? (<div>
                    <button onClick={handleEdit}>Edit</button>
                </div>) : ''
            }

            <div className="markdown-display">
                <ReactMarkdown source={post.article} />
            </div>

            {
                displayTextarea ? (
                    <div>
                        <textarea value={post.article} name="article" onChange={handleTextChange}></textarea>
                        <button onClick={saveToServer}>Save</button>
                    </div>
                ) : ''
            }
        </div>
    )
}
