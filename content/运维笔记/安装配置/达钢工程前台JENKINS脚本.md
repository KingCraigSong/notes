```groovy
node {
   stage 'checkout' 
   sh""" 
    #每次打包清空工作空间目录
    rm -rf $workspace/* 
    cd  $workspace  
    #到工作空间下从远端svn服务端拉取代码
    svn co https://10.168.60.21/svn/RJKF-430KFJGYX/60.公共文件夹/工程项目/工程原型项目/vue-tms-dg/dist --username "lianhekaifa" --password "lianhekf01"
    """         
    
   stage 'deploy'
    sh""" 
    echo "========start scp========="
    #前台包整合压缩
    cd $workspace
    tar -zcvf  engrg-web.tar.gz -C dist/ .
    
    #上传应用包
    sshpass -p b0Xyyq40EGMbbmO6 scp -o StrictHostKeyChecking=no -r $workspace/engrg-web.tar.gz Oper1@10.104.49.38:/app/nginx/html/
    echo '38: scp success !'
	#解压
    sshpass -p b0Xyyq40EGMbbmO6  ssh -o StrictHostKeyChecking=no Oper1@10.104.49.38 /bin/tar -xf /app/nginx/html/engrg-web.tar.gz -C /app/nginx/html/engrg-web

	echo '38 success !'
    """
}
```