
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# aliyun-hologres-mcp-server 帮助文档

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
   
- :fire: 通过 [云原生应用开发平台 CAP](https://cap.console.aliyun.com/template-detail?template=aliyun-hologres-mcp-server) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://cap.console.aliyun.com/template-detail?template=aliyun-hologres-mcp-server) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

# Hologres MCP Server

Hologres MCP 服务器作为 AI 代理与 Hologres 数据库之间的通用接口，支持 AI 代理与 Hologres 之间的无缝通信，帮助 AI 代理获取 Hologres 数据库元数据并执行 SQL 操作。

## 配置

### 模式 1：使用本地文件

#### 下载

从 Github 下载：

```bash
git clone https://github.com/aliyun/alibabacloud-hologres-mcp-server.git
```

#### MCP 集成

在 MCP 客户端配置文件中添加以下配置：
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

### 模式 2：使用 PIP 模式

#### 安装

使用以下包安装 MCP 服务器：

```bash
pip install hologres-mcp-server
```

#### MCP 集成

在 MCP 客户端配置文件中添加以下配置：

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

## 组件

### 工具

- `execute_select_sql`：在 Hologres 数据库中执行 SELECT SQL 查询

- `execute_dml_sql`：在 Hologres 数据库中执行 DML（INSERT、UPDATE、DELETE）SQL 查询

- `execute_ddl_sql`：在 Hologres 数据库中执行 DDL（CREATE、ALTER、DROP）SQL 查询

- `gather_table_statistics`：收集表统计信息

- `get_query_plan`：获取查询计划

- `get_execution_plan`：获取执行计划

### 资源

#### 资源

- `hologres:///schemas`：获取数据库中的所有模式

#### 资源模板

- `hologres:///{schema}/tables`：列出某个模式下的所有表

- `hologres:///{schema}/{table}/partitions`：列出分区表的所有分区

- `hologres:///{schema}/{table}/ddl`：获取表的 DDL

- `hologres:///{schema}/{table}/statistic`：显示收集的表统计信息

- `system:///{+system_path}`：

系统路径包括：

`missing_stats_tables` - 显示缺少统计信息的表

`stat_activity` - 显示当前正在运行的查询信息

`query_log/latest/<row_limits>` - 获取指定行数的最近查询日志历史

`query_log/user/<user_name>/<row_limits>` - 获取指定用户的指定行数查询日志历史

`query_log/application/<application_name>/<row_limits>` - 获取指定应用的指定行数查询日志历史

`query_log/failed/<interval>/<row_limits>` - 获取指定时间间隔和行数的失败查询日志历史

</appdetail>




## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>
