### 介绍

> `vlife-admin-react`是基于`React`实现的一个易于上手和使用的 `React Admin` 权限管理系统，是[`vlife`](https://gitee.com/wwwlike/vlife)低代码研发平台的核心模块之一。它可被多数信息系统开发作为基础框架使用。项目提供一个可定制和可扩展的权限管理系统，为开发人员提供基础框架，支持自动生成代码、注释、前端模型和 API 接口等，能显著减少前后端协作成本。同时，提供直观易懂的 UI 界面，支持自由定制和扩展，为提高开发效率和减少重复工作提供了有力保障。

### 使用必读

- 与国内流行的 Vue+Antd（ElementUI）不同，当前 vlife-react-admin 使用的是 React 技术栈和来自字节跳动的 Semi 前端 UI 框架。或许这个方案与您目前接触的技术栈不同，可能会让您迟疑是否去了解 vlife。但我们强烈建议，如果您当前是在一个全新的项目中，那么 vlife 是值得一试的。

vlife 的愿景是实现前后端同样极简开发的目标，倡导让前端去编写公司资产级别的复杂业务组件，让后端人员承担全栈业务功能开发。为了实现这一目标，vlife 会持续丰富的组件生态。

### 项目初始化

#### 下载项目

```shell
  git clone https://gitee.com/wwwlike/vlife-admin-react
  cd  vlife-admin-react
```

#### 安装依赖

```
要安装本项目依赖的npm包，您可以使用cnpm来代替npm进行安装。cnpm是一个npm的镜像，可以加快npm包的下载速度。

首先，您需要安装cnpm。您可以通过以下命令来安装cnpm：

```

npm install -g cnpm --registry=https://registry.npm.taobao.org

```

安装完成后，您可以使用cnpm来安装项目依赖的npm包。您可以通过以下命令来安装项目依赖：

```

cnpm install

```

如果您在使用cnpm安装依赖时仍然遇到问题，您可以尝试使用yarn来安装。以下是使用yarn安装项目依赖的步骤：

1. 首先，您需要安装yarn。您可以通过以下命令来安装yarn：

```

npm install -g yarn

```

2. 安装完成后，您可以使用yarn来安装项目依赖。在项目根目录下运行以下命令：

```

yarn install

```

通过以上步骤，您可以使用cnpm或yarn来安装本项目依赖的npm包。希望以上信息对您有帮助！
```

#### 项目运行

```
  cnpm run dev
```

#### 访问项目

> 访问 http://localhost:3000 进入项目

### 快速上手一个 Crud 页面

vlife 使用 ts4 进行开发，完成单模块 CRUD 功能，仅需要使用 `Content`组件即可。

```ts
export default () => {
  return <Content<SysUser> entityType="sysUser" filterType="sysUserPageReq" />;
};
```

> 这里用 `sysUserPageReq` 模型渲染进行数据查询，用`sysUser`实体模型渲染列表和编辑页面；

### 效果预览

![反馈与共建](https://wwwlike.gitee.io/vlife-img/sysUser.png)

## 技术选型

> 主要采用 react18+semi+hooks 进行开发

- react-router
- typescript4
- react-router
- react-redux
- tailwindcss 原子化 css 方案
- axios(http 请求模块，可用于前端任何场景，很强大 👍)
- ahooks ：alibaba 自定义 hooks 最佳实践
- formily： alibaba 表单解决方案，根据配置产生动态表单
- semi： 字节跳动前端开源组件，可更换主题(飞书、抖音等)
- echart 图标组件
- wangeditor 富文本编辑器
- react-draggable(拖拽模块)
- screenfull(全屏插件)
- animate.css(css 动画库)
- react-loadable(代码拆分，按需加载，预加载，样样都行)
- react-syntax-highlighter 代码高亮

## 关联 Java 平台

[`vlife`](https://gitee.com/wwwlike/vlife)

### 商业服务

> 如果需要商业服务，请微信联系 vlifeboot

### 反馈与共建

<div>
    <div style="display: inline-block;">
      <img style="width: 200px; height: 200px;" src="https://wwwlike.gitee.io/vlife-img/wxq.png" alt="微信">
      <p style="text-align: center;">微信群</p>
    </div>&nbsp;&nbsp;&nbsp;&nbsp;
    <div style="display: inline-block;">
      <img style="width: 200px; height: 200px;" src="https://wwwlike.gitee.io/vlife-img/qqq.png" alt="qq群">
      <p style="text-align: center;">QQ群(786134846)</p>
    </div>
</div>
