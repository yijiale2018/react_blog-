//文章列表页
import React,{useState,useEffect} from 'react'
import { List ,Row ,Col , Modal ,message ,Button,Switch} from 'antd';
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/ArticleList.css'
import 'antd/dist/antd.css'
const {confirm} =Modal

function ArticleList(props){

    //文章列表
    const [list,setList]=useState([])

    //得到文章列表
    const getArticleList=()=>{
        axios({
            method:'get',
            url:servicePath.getArticleList,
            withCredentials:true,
            headers:{'Access-Control-Allow-Origin':'*'}
        }).then(
            res=>{
             const {data}=res
            //console.log(data);
            setList(data.articleList)
            
            }
        )
    }

    //删除文章
    const delArticle=(id)=>{
        confirm({
            title:'确定要删除这篇博客文章吗?',
            content:'如果您点击OK按钮，文章将被永久删除',
            onOk(){
                axios.get(`${servicePath.delArticle}/${id}`,{
                    
                    withCredentials:true,
                    headers:{'Access-Control-Allow-Origin':'*'}
                }).then(
                    res=>{
                        message.success("删除成功")
                        console.log('====================================');
                        console.log(res);
                        console.log('====================================');
                        getArticleList()
                    }
                )
            },
            onCancel(){
                message.info("您已取消删除这篇博客文章")
            }
        })
    }

    //修改文章
    const updateArticle=(id)=>{
        props.history.push('/index/add/'+id)
        console.log('需要修改的文章id是'+id);
    }


    useEffect(()=>{
        getArticleList()   
    },[])


    return(
        <div className="container">
          <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>类别</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={3}>
                            <b>集数</b>
                        </Col>
                        <Col span={3}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={3}>
                             {item.typeName}
                            </Col>
                            <Col span={3}>
                                {item.addTime}
                            </Col>
                            <Col span={3}>

                            </Col>
                            <Col span={3}>
                              {item.view_count}
                            </Col>

                            <Col span={4}>
                              <Button type="primary" onClick={()=>{updateArticle(item.id)}}>修改</Button>&nbsp;

                              <Button onClick={()=>{delArticle(item.id)}}>删除 </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
                />  
        </div>
    )
}

export default ArticleList