//api配置文件
let ipUrl='http://localhost:7001/admin'

let servicePath={
    getTypeInfo:ipUrl+'/getTypeInfo',  //获取文章类别信息
    checkLogin:ipUrl+'/checkLogin', //检查用户名密码
    addArticle:ipUrl+'/addArticle', //添加文章
    updateArticle:ipUrl+'/updateArticle',//修改文章
    getArticleList:ipUrl+'/getArticleList', //得到文章列表数据
    delArticle:ipUrl+'/delArticle', //删除文章,
    getArticleById:ipUrl+'/getArticleById/' //根据id获取文章详情
}

export default servicePath