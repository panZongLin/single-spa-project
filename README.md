## 项目结构
- portal 入口文件，注册，启动shingle-spa应用，远程加载匹配的项目
- main 主应用 整体布局，导航菜单，内容区固定标签id，供子应用接入
- app1 子应用1，匹配路径 /和/App1
- app2 子应用2，匹配路径 /App2

## 启动方式
- cd portal, yarn, yarn start
- cd main, yarn, yarn start:micro
- cd app1, yarn, yarn start:micro
- cd app2, yarn, yarn start:micro
- 访问localhost:8000

## 独立启动，打包构建，请看各项目package.json
