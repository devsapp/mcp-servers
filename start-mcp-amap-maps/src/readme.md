
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# start-mcp-amap-maps 帮助文档

<description>

高德地图MCP Server现已覆盖12大核心接口，提供全场景覆盖的地理信息服务，包括地理编码、逆地理编码、IP定位、天气查询、骑行路径规划、步行路径规划、驾车路径规划、公交路径规划、距离测量、关键词搜索、周边搜索、详情搜索等。

</description>


## 资源准备

使用该项目，您需要有开通以下服务并拥有对应权限：

<service>



| 服务/业务 |  权限  | 相关文档 |
| --- |  --- | --- |
| 函数计算 |  AliyunFCFullAccess | [帮助文档](https://help.aliyun.com/product/2508973.html) [计费文档](https://help.aliyun.com/document_detail/2512928.html) |

</service>

<remark>



</remark>

<disclaimers>



</disclaimers>

## 部署 & 体验

<appcenter>
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=start-mcp-amap-maps) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=start-mcp-amap-maps) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

# AMap Map MCP Server

高德地图MCP Server现已覆盖12大核心接口，提供全场景覆盖的地理信息服务，包括地理编码、逆地理编码、IP定位、天气查询、骑行路径规划、步行路径规划、驾车路径规划、公交路径规划、距离测量、关键词搜索、周边搜索、详情搜索等。



</appdetail>







## 使用流程

<usedetail id="flushContent">

## Setup

### API Key
Get a AMap Maps API key：
https://lbs.amap.com/api/webservice/create-project-and-key.

### NPX

```json
{
    "mcpServers": {
        "amap-maps": {
            "command": "npx",
            "args": [
                "-y",
                "@amap/amap-maps-mcp-server"
            ],
            "env": {
                "AMAP_MAPS_API_KEY": ""
            }
        }
    }
}
```

</usedetail>

## 二次开发指南

<development id="flushContent">


</development>






