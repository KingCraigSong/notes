---
title: Kubernetes 常用命令集
tags:
  - Kubernetes
  - K8s
  - 容器
  - 运维
---

# Kubernetes 常用命令集

## Pod 操作

### 查看所有 Pods

```bash
kubectl get pods -A -o wide
```

参数说明：
- `-A`：查看所有命名空间
- `-o wide`：显示详细信息，包括节点名称

### 查看指定命名空间的 Pods

```bash
kubectl get pods -n namespace-name
```

### 查看 Pod 详情

```bash
kubectl describe pod pod-name -n namespace-name
```

## 日志查看

### 查看容器日志

```bash
kubectl logs -f pod-name -n namespace-name
```

参数说明：
- `-f`：实时跟踪日志

### 查看容器日志（指定容器）

如果 Pod 中有多个容器，需要指定容器名称：

```bash
kubectl logs -f pod-name -c container-name -n namespace-name
```

### 查看最近 N 行日志

```bash
kubectl logs -f --tail=100 pod-name -n namespace-name
```

### 使用 po/ 前缀

```bash
kubectl logs -f --tail=100 -n test po/labor-facade-deployment-5c6947c6-rmgn9
```

## 常用操作

### 进入容器

```bash
kubectl exec -it pod-name -n namespace-name -- /bin/bash
```

### 删除 Pod

```bash
kubectl delete pod pod-name -n namespace-name
```

### 强制删除 Pod

```bash
kubectl delete pod pod-name -n namespace-name --force --grace-period=0
```

## Deployment 操作

### 查看 Deployments

```bash
kubectl get deployments -A
```

### 查看 Deployment 详情

```bash
kubectl describe deployment deployment-name -n namespace-name
```

### 更新 Deployment

```bash
kubectl set image deployment/deployment-name container-name=image:tag -n namespace-name
```

### 回滚 Deployment

```bash
kubectl rollout undo deployment/deployment-name -n namespace-name
```

## Service 操作

### 查看 Services

```bash
kubectl get services -A
```

### 端口转发

```bash
kubectl port-forward service/service-name 8080:80 -n namespace-name
```

## 节点操作

### 查看所有节点

```bash
kubectl get nodes -o wide
```

### 查看节点详情

```bash
kubectl describe node node-name
```

## 命名空间操作

### 查看所有命名空间

```bash
kubectl get namespaces
```

### 创建命名空间

```bash
kubectl create namespace namespace-name
```