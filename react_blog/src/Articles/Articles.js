import ReactMarkdown from 'react-markdown';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import removeMarkdown from 'remove-markdown';
import { Link } from 'react-router-dom';
import { Card, Divider } from 'antd';

import './Articles.css';

export default function Articles() {
    function getAllArticles() {
        return axios.get('http://nodeblog.josephjin.win/article/all');
    }

    let [posts, setPosts] = useState([]);
    useEffect(function() {
        console.log(123);
        console.log(1234);
        getAllArticles()
            .then(res => {
                let data = res.data;
                console.log(data);
                setPosts(data.result);
            })
            .catch();
    }, []);

    return (
        <div className="content-container">
            <h2>All posts</h2>

            <div className="posts">
                {posts.map((post, index) => {
                    return (
                        <div className="post" key={index}>
                            <Card
                                title={post.title}
                                extra={
                                    <Link
                                        to={{
                                            pathname: `/article/${post.uuid}`,
                                            state: {
                                                post: post
                                            }
                                        }}
                                    >
                                        Read More
                                    </Link>
                                }
                                style={{ width: "100%" }}
                            >
                                <p>Aurthor: {post.username}</p>
                                <p>
                                    Published on:{' '}
                                    {new Date(post.uuid - 0).toUTCString()}
                                </p>
                                <Divider></Divider>
                                <div>
                                    {removeMarkdown(post.article).substr(0, 80)}{removeMarkdown(post.article).length > 80 ? '...' : ''}
                                </div>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
