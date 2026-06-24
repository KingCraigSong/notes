
数据库备份/导出
mysqldump -h localhost -P 3306 -u root -p jc_data_exchange_uat



mysqldump -u root -p mydatabase > mydatabase_dump.sql


数据库连接
mysql -h dts-prod-mysql-01.btg.com.cn -P 3306 -u write_user -p szx_data_exchange_prod


重置密码
https://cloud.tencent.com/developer/article/2093403