/**
 * 增加文章页面
 */

import React, { useState, useEffect } from 'react'
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
const { Option } = Select;
const { TextArea } = Input;



function AddArticle(props) {
    //文章的id
    const [articleId, setArticleId] = useState(0)
    //文章标题
    const [articleTitle, setArticleTitle] = useState('')
    //markdown的编辑内容
    const [articleContent, setArticleContent] = useState('')
    //html内容
    const [markdownContent, setMarkdownContent] = useState('预览内容')
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState(1) //选择的文章类别

    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    //从后台得到文章类别信息
    const getTypeInfo = () => {

        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            headers: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true
        }).then(
            res => {
                console.log(res.data);
                if (res.data.data === "没有登录") {
                    localStorage.removeItem('openId')
                    props.history.push('/login')
                } else {
                    setTypeInfo(res.data.typeList)
                }
            }
        )
    }

    //根据id来获取文章内容
    const getArticleById = (id) => {
        axios(servicePath.getArticleById + id, {
            withCredentials: true,
            headers: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                console.log(res);
                setArticleTitle(res.data.data[0].title)
                setArticleContent(res.data.data[0].article_content)
                let html = marked(res.data.data[0].article_content)
                setMarkdownContent(html)
                setIntroducemd(res.data.data[0].introduce)
                let tmpInt = marked(res.data.data[0].introduce)
                setIntroducehtml(tmpInt)
                setShowDate(res.data.data[0].addTime)
                setSelectType(res.data.data[0].typeId)
            }
        )
    }

    useEffect(() => {

        getTypeInfo()

        //获取文章id
        let tmpId = props.match.params.id
        if (tmpId) {
            setArticleId(tmpId)
            getArticleById(tmpId)

        }
    }, [])

    //选择类别后
    const selectTypeHandler = (value) => {
        setSelectType(value)
        console.log(value);
    }

    //文章保存方法
    //保存文章的方法
    const saveArticle = () => {

        //markedContent()  //先进行转换


        if (!selectedType) {
            message.error('必须选择文章类别')
            return false
        } else if (!articleTitle) {
            message.error('文章名称不能为空')
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!introducemd) {
            message.error('简介不能为空')
            return false
        } else if (!showDate) {
            message.error('发布日期不能为空')
            return false
        }

        let dataProps = {}
        //console.log(selectedType)
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introducemd
        let datetext = showDate.replace('-', '/') //把字符串转换成时间戳
        dataProps.addTime = (new Date(datetext).getTime()) / 1000
        //dataProps.part_count = partCount
        dataProps.article_content_html = markdownContent
        dataProps.introduce_html = introducehtml

        if (articleId === 0) {
            console.log('articleId=:' + articleId)
            dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
            axios({
                method: 'post',
                url: servicePath.addArticle,
                header: { 'Access-Control-Allow-Origin': '*' },
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    setArticleId(res.data.insertId)
                    if (res.data.isSuccess) {
                        message.success('文章发布成功')
                        props.history.push('/index/list')
                    } else {
                        message.error('文章发布失败');
                    }

                }
            )
        } else {
            console.log('articleId:' + articleId)
            dataProps.id = articleId
            axios({
                method: 'post',
                url: servicePath.updateArticle,
                header: { 'Access-Control-Allow-Origin': '*' },
                data: dataProps,
                withCredentials: true
            }).then(
                res => {

                    console.log(res.data);

                    if (res.data.isSuccess) {
                        message.success('文章保存成功')
                        props.history.push('/index/list')
                    } else {
                        message.error('文章保存失败');
                    }


                }
            )
        }


    }

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }


    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10} >
                        <Col span={20}>
                            <Input
                                value={articleTitle}                                
                                placeholder="博客标题"
                                onChange={e => {
                                    setArticleTitle(e.target.value)
                                }}
                                size="large" />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                    <Select value={selectedType} defaultValue="Sign Up" size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea
                                value={articleContent}
                                className="markdown-content"
                                rows={35}
                                onChange={changeContent}
                                onPressEnter={changeContent}
                                placeholder="文章内容"
                            />
                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }}
                            >

                            </div>

                        </Col>
                    </Row>
                </Col>

                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br />
                            <Col span={24}>
                                <br />
                                <TextArea
                                    value={introducemd}
                                    onChange={changeIntroduce}
                                    onPressEnter={changeIntroduce}
                                    rows={4}
                                    placeholder="文章简介"
                                />
                                <br /><br />
                                <div
                                    className="introduce-html"
                                    dangerouslySetInnerHTML={{ __html: introducehtml }}
                                >

                                </div>


                                <Col span={12}>
                                    <div className="date-select">
                                        <DatePicker
                                            placeholder="发布日期"
                                            size="large"
                                            onChange={(data, dataString) => setShowDate(dataString)}
                                        />
                                    </div>
                                </Col>

                            </Col>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle