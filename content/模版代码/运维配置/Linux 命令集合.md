---
title: Linux 常用命令集合
tags:
  - Linux
  - 命令行
  - 运维
---

# Linux 常用命令集合

## 参考资源

- [Linux命令大全](https://man.niaoge.com/)
- [创建系统服务](https://blog.henchat.net/linux-create-service/)

## 服务管理

### 方式一：使用 systemd 创建服务

```bash
# 创建服务文件
sudo vim /etc/systemd/system/your-app.service
```

服务文件内容示例：
```ini
[Unit]
Description=Your Application
After=network.target

[Service]
Type=simple
User=username
ExecStart=/path/to/your/app
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
# 重新加载配置
sudo systemctl daemon-reload

# 启动服务
sudo systemctl start your-app

# 设置开机自启
sudo systemctl enable your-app

# 查看服务状态
sudo systemctl status your-app
```

### 方式二：使用 service 命令

```bash
# 启动服务
sudo service your-app start

# 停止服务
sudo service your-app stop

# 重启服务
sudo service your-app restart

# 查看状态
sudo service your-app status
```

## 网络配置

### 设置网卡路由

```bash
sudo route add -net 10.60.0.0 -netmask 255.255.0.0 10.60.226.254
```

### 查看网络状态

```bash
# 查看所有网络接口
ip addr

# 查看路由表
route -n

# 查看网络连接
netstat -tlnp

# 测试网络连通性
ping example.com
```

## 文件管理

```bash
# 查看目录内容
ls -la

# 创建目录
mkdir -p path/to/directory

# 复制文件
cp source destination

# 移动文件
mv source destination

# 删除文件
rm -rf file_or_directory
```

## 系统监控

```bash
# 查看系统负载
uptime

# 查看内存使用
free -h

# 查看磁盘使用
df -h

# 查看进程
top
htop

# 查看 CPU 信息
cat /proc/cpuinfo
```