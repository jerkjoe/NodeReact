// import ReactMarkdown from 'react-markdown'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function Articles() {

    function getAllArticles() {
        return axios.get('http://localhost:3030/article/all')
    }

    let [posts, setPosts] = useState([])
    useEffect(function() {
        console.log(123)
        console.log(1234)
        getAllArticles().then(res => {
            let data = res.data
            console.log(data)
            setPosts(data.result)
        }).catch()


    }, [])

    function dateConvertion(timestamp) {
        return new Date(timestamp).toJSON()
    }
    return (
        <div>
            <div>
                This is Articles
            </div>

            {
                posts.map((post, index) => {
                    return (
                        <div key={index}>
                            <h3>
                                <Link to={{
                                    pathname: `/article/${post.uuid}`,
                                    state: {
                                        post: post
                                    }
                                }}>
                                    {post.title}
                                </Link>
                            </h3>
                            <p>
                                {post.username}
                            </p>
                            <p>
                                {new Date(post.uuid-0).toUTCString()}
                            </p>
                        </div>
                    )
                })
            }

        </div>
    )
}
