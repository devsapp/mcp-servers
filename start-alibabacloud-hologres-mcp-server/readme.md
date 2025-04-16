
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# alibabacloud-hologres-mcp-server 帮助文档

<description>

阿里云hologres MCP 服务


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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=alibabacloud-hologres-mcp-server) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=alibabacloud-hologres-mcp-server) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

# Hologres MCP Server

Hologres MCP Server serves as a universal interface between AI Agents and Hologres databases. It enables seamless communication between AI Agents and Hologres, helping AI Agents retrieve Hologres database metadata and execute SQL operations.

## Configuration

### Mode 1: Using Local File

#### Download

Download from Github

```shell
git clone https://github.com/aliyun/alibabacloud-hologres-mcp-server.git
```

#### MCP Integration

Add the following configuration to the MCP client configuration file:

```json
"mcpServers": {
  "hologres-mcp-server": {
    "command": "uv",
    "args": [
      "--directory",
      "/path/to/alibabacloud-hologres-mcp-server",
      "run",
      "hologres-mcp-server"
    ],
    "env": {
      "HOLOGRES_HOST": "host",
      "HOLOGRES_PORT": "port",
      "HOLOGRES_USER": "access_id",
      "HOLOGRES_PASSWORD": "access_key",
      "HOLOGRES_DATABASE": "database"
    }
  }
}
```

### Mode 2: Using PIP Mode

#### Installation

Install MCP Server using the following package:

```bash
pip install hologres-mcp-server
```

#### MCP Integration

Add the following configuration to the MCP client configuration file:

```json
"mcpServers": {
    "hologres-mcp-server": {
      "command": "uv",
      "args": [
        "run",
        "--with",
        "hologres-mcp-server",
        "hologres-mcp-server"
      ],
      "env": {
        "HOLOGRES_HOST": "host",
        "HOLOGRES_PORT": "port",
        "HOLOGRES_USER": "access_id",
        "HOLOGRES_PASSWORD": "access_key",
        "HOLOGRES_DATABASE": "database"
      }
    }
  }
```

## Components

### Tools

* `execute_select_sql`: Execute a SELECT SQL query on the Hologres server
* `execute_dml_sql`: Execute a DML (INSERT, UPDATE, DELETE) SQL query on the Hologres server
* `execute_ddl_sql`: Execute a DDL (CREATE, ALTER, DROP) SQL query on the Hologres server
* `gather_table_statistics`: Collect table statistics
* `get_query_plan`: Get query plan
* `get_execution_plan`: Get execution plan

### Resources

#### Built-in Resources

* `hologres:///schemas`: Get all schemas in the database

#### Resource Templates

* `hologres:///{schema}/tables`: List all tables in a schema
* `hologres:///{schema}/{table}/partitions`: List all partitions of a partitioned table
* `hologres:///{schema}/{table}/ddl`: Get table DDL
* `hologres:///{schema}/{table}/statistic`: Show collected table statistics
* `system:///{+system_path}`:
  System paths include:

  * missing_stats_tables - Shows the tables that are missing statistics.
  * stat_activity - Shows the information of current running queries.
  * query_log/latest/<row_limits> - Get recent query log history with specified number of rows.
  * query_log/user/<user_name>/<row_limits> - Get query log history for a specific user with row limits.
  * query_log/application/<application_name>/<row_limits> - Get query log history for a specific application with row limits.
  * query_log/failed/\<interval>\/<row_limits> - Get failed query log history with interval and specified number of rows.

</appdetail>







## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>









