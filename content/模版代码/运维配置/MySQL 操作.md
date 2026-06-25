---
title: MySQL 常用操作命令
tags:
  - MySQL
  - 数据库
  - 运维
---

# MySQL 常用操作命令

## 数据库连接

```bash
mysql -h localhost -P 3306 -u root -p
```

连接远程数据库：

```bash
mysql -h dts-prod-mysql-01.btg.com.cn -P 3306 -u write_user -p szx_data_exchange_prod
```

## 数据库备份/导出

### 导出整个数据库

```bash
mysqldump -h localhost -P 3306 -u root -p mydatabase > mydatabase_dump.sql
```

### 导出指定数据库（不包含创建数据库语句）

```bash
mysqldump -h localhost -P 3306 -u root -p --no-create-db mydatabase > mydatabase_dump.sql
```

### 导出指定表

```bash
mysqldump -h localhost -P 3306 -u root -p mydatabase table1 table2 > tables_dump.sql
```

### 导出数据库结构（不含数据）

```bash
mysqldump -h localhost -P 3306 -u root -p --no-data mydatabase > mydatabase_schema.sql
```

## 数据库导入

```bash
mysql -h localhost -P 3306 -u root -p mydatabase < mydatabase_dump.sql
```

## 重置密码

参考链接：[腾讯云 MySQL 重置密码](https://cloud.tencent.com/developer/article/2093403)

### 方式一：使用 SET PASSWORD

```sql
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('new_password');
```

### 方式二：使用 ALTER USER

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

### 忘记密码时重置（需要停止 MySQL 服务）

```bash
# 停止 MySQL 服务
sudo systemctl stop mysql

# 跳过权限验证启动
sudo mysqld_safe --skip-grant-tables &

# 登录（无需密码）
mysql -u root

# 修改密码
USE mysql;
UPDATE user SET authentication_string=PASSWORD('new_password') WHERE User='root';
FLUSH PRIVILEGES;

# 重启 MySQL 服务
sudo systemctl restart mysql
```

## 常用 SQL 命令

```sql
-- 查看所有数据库
SHOW DATABASES;

-- 创建数据库
CREATE DATABASE mydatabase CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE mydatabase;

-- 查看所有表
SHOW TABLES;

-- 查看表结构
DESCRIBE tablename;

-- 查看当前用户
SELECT USER();

-- 查看当前时间
SELECT NOW();
```