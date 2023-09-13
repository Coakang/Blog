---
title: Hexo上传图片
date: 2023-08-22 16:16:02
tags:
---

## 环境

- Ubuntu20.04
- hexo@6.3.0
- hexo-renderer-marked@6.1.1

## 配置文件

`_config.yml`

站点目录下为**<span style="background-color: yellow;">站点配置文件</span>**

主题目录下为**<span style="background-color: #B0E0E6; padding: 2px;">主题配置文件</span>**

## 插件的安装与配置

```bash
npm install hexo-renderer-marked --save
```

参考[Issue](https://github.com/hexojs/hexo-renderer-marked/issues/216)修改`node_modules/hexo-render-marked/lib/render.js`(***之间为修改部分)

```js
    if (!/^(#|\/\/|http(s)?:)/.test(href) && !relative_link && prependRoot) {
      if (!href.startsWith('/') && !href.startsWith('\\') && postPath) {
        const PostAsset = hexo.model('PostAsset');
        // findById requires forward slash
        // ************************************************************
        const pp = require('path');
        const ppp = pp.join(postPath, '../');
        // const asset = PostAsset.findById(join(postPath, href.replace(/\\/g, '/')));
        const asset = PostAsset.findById(join(ppp, href.replace(/\\/g, '/')));
        // ************************************************************
        // asset.path is backward slash in Windows
        if (asset) href = asset.path.replace(/\\/g, '/');
      }
      href = url_for.call(hexo, href);
    }
```

参照[官方文档](https://hexo.io/zh-cn/docs/asset-folders.html)修改**<span style="background-color: yellow;">站点配置文件</span>**

```bash
post_asset_folder: true
marked:
  prependRoot: true
  postAsset: true
```

## Typora的配置

![image-20230822163048408](Issues-uploadImages/image-20230822163048408.png)

## 示例

使用`hexo g`即可在浏览器中查看修改后可正常访问的路径

![image-20230822163608323](Issues-uploadImages/image-20230822163608323.png)

![image-20230822164003216](Issues-uploadImages/image-20230822164003216.png)

![image-20230822163848536](Issues-uploadImages/image-20230822163848536.png)

