## 安装
```
# 
yarn
```

## 安装electron
```
# yarn 
yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/

# npm
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/

```

### 开发模式web
```
yarn start
```

### 正式web
- 生成缓存文件目录(build)
```
yarn build
```

### app调试
```
yarn app-start:dev
```

### app react正式调试
```
yarn app-start
```

### app 打包
```
yarn app-package
```