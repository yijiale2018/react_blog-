import React, { createContext, useState } from 'react'
import 'antd/dist/antd.css'
import { Card, Input,  Button, Spin, message } from 'antd'
import '../static/css/login.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'

function Login(props) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const openIdContext=createContext();
  //checkLogin 实现后台验证
  /*
  如果用户名 密码正确跳转到主页 不正确则进行提示
  */
  const checkLogin = () => {
    
    setIsLoading(true)

    if(!userName){
      message.error('用户名不能为空')
    }else if(!password){
      message.error('密码不能为空')
    }

    let dataProps={
      'userName':userName,
      'password':password
    }

    //发送ajax请求
    axios({
      method:'post',
      url:servicePath.checkLogin,
      data:dataProps,
      withCredentials:true
    }).then(
      res=>{
        setIsLoading(true)
        console.log(res);

        let {data}=res
        
        if(data.data === '登录成功'){
          localStorage.setItem('openId',data.openId)
          message.success('登录成功')
          props.history.push('/index')
        }else{
          message.error('用户名密码错误')
        }
      
      }
    )
   setTimeout(()=>{
      setIsLoading(false)
   },1000)
      //console.log(dataProps);

  }

  return (

    <div className="login-div">

      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="YYle Blog  System" bordered={true} style={{ width: 400 }} >
        
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            
            onChange={(e) => { setUserName(e.target.value) }}
            onPressEnter={checkLogin}
          />
          <br /><br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            
            onChange={(e) => { setPassword(e.target.value) }}
            onPressEnter={checkLogin}
          />
          <br /><br />
          <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
        </Card>
      </Spin>
    </div>

  )
}

export default Login