
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# start-mcp-nodejs-hello-world-stdio 帮助文档

<description>

基于 Node 的 FC MCP STDIO Server 案例

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=start-mcp-nodejs-hello-world-stdio) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=start-mcp-nodejs-hello-world-stdio) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

这是一个部署到 FC 的 MCP STDIO Server 的 hello world 样例。您可以通过这个模版初始化一个简单的、开箱即用的、可进行二次开发的 MCP SSE Server。 
 
此样例包含一个名为 `hello_world` 的 Tool，定义为：

```javascript
server.tool(
  "hello_world",
  "Return string 'hello world!'",
  {
    // Define input parameters using zod. example: 
    // prefix: z.string().describe('prefix').optional(),
  },
  async () => {
    return {
      content: [{
        type: "text",
        text: 'hello world!',
      }]
    }
  },
);

```

您可基于此样例 Tool 进行二次开发。

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>

## 二次开发指南

<development id="flushContent">

您可基于此样例 Tool 进行二次开发。

</development>






