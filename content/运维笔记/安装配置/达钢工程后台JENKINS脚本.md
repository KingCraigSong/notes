```groovy
node {
    stage 'checkout'
        sh""" 
        #每次打包清空工作空间目录
        rm -rf $workspace/* 
        cd  $workspace  
        #到工作空间下从远端svn服务端拉取代码
        svn co https://10.168.60.21/svn/RJKF-430KFJGYX/60.公共文件夹/工程项目/工程原型项目/engrg-iiot --username "lianhekaifa" --password "lianhekf01"
        """         
    stage 'Maven Build'        
        sh"""
        echo "========start scp========="
        cd $workspace/engrg-iiot
        #pwd
        ##编译后台包，生成jar包
        /app/apache-maven-3.6.2/bin/mvn -e -U clean install -Dmaven.test.skip=true -P test --settings /app/apache-maven-3.6.2/conf/settings-sadp.xml
        """    
    stage 'deploy'        
        sh"""
        
        echo "========start scp========="
        #上传应用包
        sshpass -p IgL4OxV63U4sgNlU scp -o StrictHostKeyChecking=no -r $workspace/engrg-iiot/target/engrg-iiot-1.0.0-SNAPSHOT-assembly.tar.gz Oper1@10.104.49.28:/app/webapps/engrg-iiot
        echo '28 scp success !'
        sshpass -p IgL4OxV63U4sgNlU ssh -o StrictHostKeyChecking=no Oper1@10.104.49.28  "rm -rf /app/webapps/engrg-iiot/engrg-iiot-1.0.0-SNAPSHOT && sleep 5"
        sshpass -p IgL4OxV63U4sgNlU ssh -o StrictHostKeyChecking=no Oper1@10.104.49.28  "cd /app/webapps/engrg-iiot && tar -zxvf engrg-iiot-1.0.0-SNAPSHOT-assembly.tar.gz; sleep 5"
        sshpass -p IgL4OxV63U4sgNlU ssh -o StrictHostKeyChecking=no Oper1@10.104.49.28  "cd /app/webapps/engrg-iiot/engrg-iiot-1.0.0-SNAPSHOT/bin/ && /bin/bash  ./auto.sh dev"
        sshpass -p IgL4OxV63U4sgNlU ssh -o StrictHostKeyChecking=no Oper1@10.104.49.28   "sleep 30 && /bin/bash /app/webapps/engrg-iiot/engrg-iiot-1.0.0-SNAPSHOT/bin/check.sh"
		echo '28 success !'
		
		sshpass -p dLztDlA4FXTAeV0R scp -o StrictHostKeyChecking=no -r $workspace/engrg-iiot/target/engrg-iiot-1.0.0-SNAPSHOT-assembly.tar.gz Oper1@10.104.49.29:/app/webapps/engrg-iiot
        echo '29 scp success !'
        sshpass -p dLztDlA4FXTAeV0R ssh -o StrictHostKeyChecking=no Oper1@10.104.49.29  "rm -rf /app/webapps/engrg-iiot/engrg-iiot-1.0.0-SNAPSHOT && sleep 5"
        sshpass -p dLztDlA4FXTAeV0R ssh -o StrictHostKeyChecking=no Oper1@10.104.49.29  "cd /app/webapps/engrg-iiot && tar -zxvf engrg-iiot-1.0.0-SNAPSHOT-assembly.tar.gz; sleep 5"
        sshpass -p dLztDlA4FXTAeV0R ssh -o StrictHostKeyChecking=no Oper1@10.104.49.29  "cd /app/webapps/engrg-iiot/engrg-iiot-1.0.0-SNAPSHOT/bin/ && /bin/bash  ./auto.sh dev"
        sshpass -p dLztDlA4FXTAeV0R ssh -o StrictHostKeyChecking=no Oper1@10.104.49.29   "sleep 30 && /bin/bash /app/webapps/engrg-iiot/engrg-iiot-1.0.0-SNAPSHOT/bin/check.sh"
		echo '29 success !'
        """
}
```

