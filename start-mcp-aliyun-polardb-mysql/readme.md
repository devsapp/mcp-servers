
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# aliyun-polardb-mysql-mcp-server 帮助文档

<description>

阿里云PolarDB MySQL MCP 服务


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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=aliyun-hologres-mcp-server) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=aliyun-hologres-mcp-server) 该应用。

</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

# PolarDB MySQL MCP Server

## 环境变量
使用PolarDB MySQL MCP Server需要支持的环境变量如下：
* POLARDB_MYSQL_HOST: 数据库地址
* POLARDB_MYSQL_PORT: 数据库端口
* POLARDB_MYSQL_USER: 数据库用户名
* POLARDB_MYSQL_PASSWORD: 数据库密码
* POLARDB_MYSQL_DATABASE: 数据库名
* POLARDB_MYSQL_ENABLE_UPDATE: 是否允许 update 操作(默认:false)
* POLARDB_MYSQL_ENABLE_WRITE:  是否允许 write 操作(默认:false)
* POLARDB_MYSQL_ENABLE_INSER:  是否允许 insert 操作(默认:false)
* POLARDB_MYSQL_ENABLE_DDL:  是否允许 ddl 操作(默认:false)
* RUN_MODE: 采用 stdio 模式托管到本平台，stdio 模式下，部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

## 组件
### 工具
* execute_sql: 执行SQL
### 资源
* polardb-mysql://tables: 列举数据库表
### 资源模板
* polardb-mysql://{table}/field: 获取数据库表名称，类型和备注字段信息
* polardb-mysql://{table}/data:  获取数据库表的数据，默认50行
## 使用方式
### Cursor
1. 配置Json文件
```json
{
  "mcpServers": {
    "polardb-mysql-mcp-server": {
      "command": "uvx",
      "args": [
        "--from",
        "polardb-mysql-mcp-server",
        "run_polardb_mysql_mcp_server"
      ],
      "env": {
        "POLARDB_MYSQL_HOST": "127.0.0.1",
        "POLARDB_MYSQL_PORT": "15001",
        "POLARDB_MYSQL_USER": "xxxx",
        "POLARDB_MYSQL_PASSWORD": "xxx",
        "POLARDB_MYSQL_DATABASE": "xxx",
        "RUN_MODE": "stdio",
        "POLARDB_MYSQL_ENABLE_UPDATE": "false",
        "POLARDB_MYSQL_ENABLE_UPDATE": "false",
        "POLARDB_MYSQL_ENABLE_INSER": "false",
        "POLARDB_MYSQL_ENABLE_DDL": "false"
      }
    }
  }
}
```


</appdetail>




## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

注：由于此MCP Server部署到函数计算上，函数计算出口IP不固定，需要将数据库实例公网白名单开放至0.0.0.0，或者在部署后点击控制台ARN链接进入函数计算控制台将此函数VPC绑定至数据库实例VPC。

</usedetail>









