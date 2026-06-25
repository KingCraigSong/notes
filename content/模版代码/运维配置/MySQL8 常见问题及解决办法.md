# 一、无法启动

## Upgrade is not supported after a crash or shutdown with innodb_fast_shutdown = 2. This redo log was created eith mysql 5.7.38 and it appears logically non empty. 

Faild to initialize DD Storage Engine
Data DIctionary initialization failed
Aborting

### 原因

ib_logfile 文件冲突引起的  

###  解决方法

进入data目录下将ib_logfile0、ib_logfile1…文件备份后删除即可
```bash
mv ib_logfile0 ib_logfile0.250716
mv ib_logfile1 ib_logfile1.250716
```

有必要的话，重新设置下数据权限
```bash
chown -R mysql:myqsl mysql
```

启动 MySQL
```bash
systemctl start mysql.service
```

查看服务状态
```bash
systemctl status mysql.service
```



# 二、无法登录

## Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock'

### 原因

配置文件中的 [client] socket 路径有问题

### 解决办法

修改配置文件，调整/增加 [client] 下的 socket 路径，路径同 [mysqld] 下的 socket 配置
```bash
vim /etc/my.cnf
```

```text
[client]
socket=/data/mysql/mysql.sock
```

重启 MySQL
```bash
systemctl restart mysql.service
```

# 三、异常报错

## Caused by: java.sql.SQLException: Value '0000-00-00 00:00:00' can not be represented as java.sql.Timestamp

### 原因

数据库里面存储了0000-00-00 00:00:00，查询的时候报错了
### 解决方案

在数据库连接上增加 zeroDateTimeBehavior 配置
```properties
jdbc.url=jdbc:mysql://ip:端口/库名？characterEncoding=utf8&zeroDateTimeBehavior=convertToNull
```



# 四、通用操作

## 导出数据

TODO

## 导入数据

TODO

## 密码过期

登录后需要先修改密码，才能进行其他操作

登录
```bash
mysql -uroot -p
```

修改
```sql
ALTER user 'root'@'%' IDENTIFIED BY 'new password'
```

## 重置密码

TODO
