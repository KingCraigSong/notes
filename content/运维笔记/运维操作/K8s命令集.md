# 查看日志

查看所有 pods
```bash
kubectl get pods -A -o wide
```

查看容器日志？
```bash
kubectl logs -f labor-facade-deployment-5c6947c6-rmgn9 -n test
```

查看容器日志
```bash
kubectl logs -f --tail=100 -n test po/labor-facade-deployment-5c6947c6-rmgn9
```