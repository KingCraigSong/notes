---
title: Oracle 常用操作命令
tags:
  - Oracle
  - 数据库
  - SQL
---

# Oracle 常用操作命令

## 批量更新序列（未验证）

以下 PL/SQL 脚本用于批量更新或创建序列，自动根据表的最大 ID 设置序列起始值。

```sql
DECLARE 
  CURSOR tabCursor IS 
    SELECT cu.table_name, cu.column_name 
    FROM user_cons_columns cu, user_constraints au  
    WHERE cu.constraint_name = au.constraint_name 
      AND au.constraint_type = 'P' 
      AND (cu.table_name LIKE 'WMS%' OR cu.table_name LIKE 'SGAI%'); 

  maxIdStr VARCHAR2(10);        -- 当前编号的最大值 
  sqlStr VARCHAR2(200);         -- SQL 语句 
  seqName VARCHAR2(30);         -- sequence 名字 
  exist VARCHAR2(1);            -- sequence 是否存在，0:不存在，1：存在 
  pkType VARCHAR2(10);          -- PK 的类型 

BEGIN 
  FOR tab IN tabCursor LOOP 
    maxIdStr := NULL; 
    
    -- sequence 命名规则为："SEQ_" + 表名 
    seqName := 'SEQ_' || tab.table_name; 

    -- 获取当前表的最大 ID + 1 
    SELECT data_type 
    INTO pkType 
    FROM User_Tab_Cols s 
    WHERE s.column_name = UPPER(tab.column_name) 
      AND s.table_name = UPPER(tab.table_name); 

    IF pkType = 'NUMBER' THEN 
      -- PK 为数字类型 
      sqlStr := 'SELECT TO_CHAR(MAX(t.' || tab.column_name || ') + 1) FROM ' || tab.table_name || ' t'; 
      EXECUTE IMMEDIATE sqlStr INTO maxIdStr; 

      -- 判断该 sequence 是否存在 
      sqlStr := 'SELECT COUNT(*) FROM user_sequences WHERE sequence_name = ''' || seqName || ''''; 
      EXECUTE IMMEDIATE sqlStr INTO exist; 

      IF maxIdStr IS NOT NULL AND exist = '1' THEN 
        -- 更新 sequence：先删除再创建 
        sqlStr := 'DROP SEQUENCE ' || seqName; 
        EXECUTE IMMEDIATE sqlStr; 

        sqlStr := 'CREATE SEQUENCE ' || seqName || ' MINVALUE 1 MAXVALUE 1.00000000000000E+27 INCREMENT BY 1 START WITH ' || maxIdStr || ' CACHE 20 NOORDER NOCYCLE'; 
        EXECUTE IMMEDIATE sqlStr; 
      END IF; 
    END IF; 
  END LOOP; 

  COMMIT; 
END;
/
```

## 常用 SQL 命令

### 用户与权限

```sql
-- 创建用户
CREATE USER username IDENTIFIED BY password;

-- 授权
GRANT CONNECT, RESOURCE TO username;
GRANT DBA TO username;

-- 查看用户权限
SELECT * FROM user_sys_privs;
SELECT * FROM user_tab_privs;
```

### 表操作

```sql
-- 查看所有表
SELECT table_name FROM user_tables;

-- 查看表结构
DESCRIBE tablename;

-- 查看表空间
SELECT tablespace_name FROM user_tables WHERE table_name = 'TABLENAME';
```

### 序列操作

```sql
-- 创建序列
CREATE SEQUENCE seq_name
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 9999999999
  CACHE 20
  NOORDER;

-- 查询序列当前值
SELECT seq_name.CURRVAL FROM dual;

-- 查询序列下一个值
SELECT seq_name.NEXTVAL FROM dual;

-- 查看所有序列
SELECT sequence_name FROM user_sequences;
```

### 数据库连接

```bash
# 使用 sqlplus 连接
sqlplus username/password@host:port/service_name

# 本地连接
sqlplus / as sysdba
```