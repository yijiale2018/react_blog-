import React,{useState} from 'react'
import Demo from './demo'
import ArticleList from '../Pages/ArticleList'
import {Route} from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import '../static/css/AdminIndex.css'
import AddArticle from '../Pages/addArticle'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props){
    //hook
    const [collapsed,setCollapsed]=useState(false)
  
    //处理点击事件
    const handleClickArticle=e=>{
      console.log(e.item.props);
      let p=e.item.props
      if(p.eventKey=='addArticle'){
        props.history.push('/index/add')
      }else if(p.eventKey=='articleList'){
        props.history.push('/index/list')
      }
    }


   const onCollapse = collapsed => {
    console.log(collapsed);
    
    setCollapsed(collapsed)
  };

  
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

            <Menu.Item key="1" icon={<PieChartOutlined />}>
              工作台
            </Menu.Item>

            <Menu.Item key="2" icon={<DesktopOutlined />}>
              添加文章
            </Menu.Item>

            <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理" onClick={handleClickArticle}>
              <Menu.Item key="addArticle">添加文章</Menu.Item>
              <Menu.Item key="articleList">文章列表</Menu.Item>
            </SubMenu>
            
            <Menu.Item key="5" icon={<FileOutlined />}>留言管理</Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <div>
                    {/*主体区 二级路由区 */}
                    <Route path="/index/" exact component={AddArticle} />
                    <Route path="/index/demo"  component={Demo} />
                    <Route path="/index/add" exact component={AddArticle} />
                    <Route path="/index/add/:id" exact component={AddArticle} />
                    <Route path="/index/list/"  component={ArticleList} />
                </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>YYle.com</Footer>
        </Layout>
      </Layout>
    )
  
}

export default AdminIndex;