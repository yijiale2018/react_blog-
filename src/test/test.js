import React from 'react'
import axios from 'axios'

function Test(){

    function postMessage(){
        axios({
            method:'post',
            url:'http://localhost:7001/admin/checkLogin',
            data:{
                userName:'865749345',
                password:'520LiuYuLu'
            }
        }).then(
            res=>{
                console.log('hhh');
            }
        )
    }

    return(
        <>
            <div>
                <button onClick={postMessage}>btn</button>
            </div>
        </>
    )
}

export default Test