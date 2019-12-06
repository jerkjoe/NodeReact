import ReactMarkdown from 'react-markdown'
import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { Select } from 'antd';
const { Option } = Select;


export default function NewArticle() {


    let [article, setArticle] = useState('# This is a header\n\nAnd this is a paragraph')
    let [title, setTitle] = useState('Title')

    function handleInputChange(event) {
        const value = event.target.value
        setTitle(value)
    }
    function handleTextareaChange(event) {
        const value = event.target.value
        setArticle(value)
    }

    function handleSave() {
        const params = prepareJSON()
        axios.post('http://localhost:3000/article/create', params).then(res => {
            let data = res.data
            console.log(data.message)
        })
    }
    function getArticles() {
        axios.get('http://localhost:3000/article/all', {
            username: 'jerkjoe'
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
    }

    function prepareJSON() {
        const body = article
        const header = title

        return {
            title: header,
            article: body,
            username: 'jerkjoe'
        }
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    const children = [];
    return (
        <div>
            <h1>
                New Article
            </h1>
            <Select mode="tags" style={{ width: '100%' }} placeholder="Tags" onChange={handleChange}>
                {children}
            </Select>
            <div>
                <input name="title" onChange={handleInputChange} />
            </div>
            <div>
                <textarea onChange={handleTextareaChange}></textarea>
            </div>

            <h2>
                {title}
            </h2>
            <ReactMarkdown source={article} />

            <button onClick={getArticles}>Get</button>
            <button onClick={handleSave}>Save</button>

        </div>
    )
}

