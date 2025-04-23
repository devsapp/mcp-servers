
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# aliyun-tablestore-mcp-server 帮助文档

<description>

阿里云TableStore MCP服务

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

### tablestore-mcp-server

A Tablestore Java MCP Server.

> [模型上下文协议（Model Context Protocol，MCP）](https://modelcontextprotocol.io/introduction)是一个开放协议，支持大型语言模型（LLM）应用程序与外部数据源及工具之间的无缝集成。
> 无论是开发AI驱动的集成开发环境（IDE）、增强聊天界面功能，还是创建定制化AI工作流，MCP均提供了一种标准化方案，
> 可将LLMs与其所需的关键背景信息高效连接。

这篇文章介绍如何基于Tablestore(表格存储)构建一个MCP服务，使用其向量和标量的混合检索，提供检索相关的 tool 能力。

#### 1. 效果

这里展示 2 个 tool 的能力，一个是存储工具，一个是搜索工具。 我们使用的软件是热门的开源软件 [cherry-studio](https://github.com/CherryHQ/cherry-studio)，
使用的大模型是通义千问的 `qwen-max` 模型

##### 1.1 写入到Tablestore

`cherry-studio` 使用示例如下图:

<img src="https://img.alicdn.com/imgextra/i3/O1CN01OwciNG1WghAEX3yqR_!!6000000002818-0-tps-3024-1748.jpg" alt="store" width="500"/>

`java` Server 端代码的写入日志如下图:

<img src="https://img.alicdn.com/imgextra/i3/O1CN016xJM1Z1S8ZBfzmAB2_!!6000000002202-0-tps-3942-344.jpg" alt="store_log" width="500"/>

Tablestore(表格存储) 控制台数据存储结果如下图(可以看到同时生成了一些Meta信息):

<img src="https://img.alicdn.com/imgextra/i1/O1CN01HRdXO623CMFWL9OZc_!!6000000007219-0-tps-2520-1156.jpg" alt="store_ots" width="500"/>

##### 1.2 搜索文档

Tablestore(表格存储) 的多元索引支持向量、标量、全文检索等各种类型的组合查询，该示例代码中使用了混合检索，如需更复杂的查询，可以参考文章最后的“贡献代码和二次开发”章节了解如何自定义开发。

`cherry-studio` 搜索查询示例如下图:

<img src="https://img.alicdn.com/imgextra/i4/O1CN01vxoNPL1DjSrIQ5uLI_!!6000000000252-0-tps-3014-1722.jpg" alt="search_ui" width="500"/>

`java` Server 端的查询日志如下图:

<img src="https://img.alicdn.com/imgextra/i3/O1CN01u3WXVj21mQCiVJ0gM_!!6000000007027-0-tps-2794-294.jpg" alt="search_log" width="500"/>

Tablestore(表格存储) 控制台数据也可以进行查询，这里以全文检索示例:

<img src="https://img.alicdn.com/imgextra/i4/O1CN01s8Z5Ip1ObdrrisR3O_!!6000000001724-0-tps-2662-1500.jpg" alt="search_ots" width="500"/>

#### 2. 流程

<img src="https://img.alicdn.com/imgextra/i2/O1CN01eb4sGj2AFI5yyFNN7_!!6000000008173-0-tps-1830-1252.jpg" alt="search_ots" width="500"/>

MCP server 提供的 2 个工具十分简单：

1. 写入: 文档经过 MCP server 内置的 Embedding ( 默认为 [BAAI/bge-base-zh-v1.5](https://huggingface.co/BAAI/bge-base-zh-v1.5) ) 模型，写入到Tablestore(表格存储)即可。
2. 查询: 用户的查询文本经过 MCP server 内置的 Embedding 模型转成向量，然后调用表格存储的 [多元索引](https://help.aliyun.com/zh/tablestore/features-of-search-index)即可，其内部使用了
   [向量检索](https://help.aliyun.com/zh/tablestore/knn-vector-query-function/) 和 [全文检索](https://help.aliyun.com/zh/tablestore/full-text-search-of-search-index/) 进行混合查询，最终召回用户期望的结果。

#### 3. 本地运行

##### 3.1 下载源码

1. 使用 `git clone` 将代码下载到本地。
2. 进入 java 源码的根目录：`cd tablestore-mcp-server/tablestore-java-mcp-server`

##### 3.2 编译代码

代码需要 `jdk17` 版本以上进行构建，使用了 `mvn` 进行包和环境管理。

```bash
   # 确保 jdk17 环境
   ./mvnw package -DskipTests -s settings.xml
```

##### 3.3 配置环境变量

代码里所有的配置是通过环境变量来实现的，出完整的变量见下方表格。 主要依赖的数据库 [Tablestore(表格存储)](https://www.aliyun.com/product/ots) 支持按量付费，使用该工具，表和索引都会自动创建，仅需要在控制台上申请一个实例即可。

| 变量名                          |                              必填                              |         含义         |                                                      默认值                                                       |
|------------------------------|:------------------------------------------------------------:|:------------------:|:--------------------------------------------------------------------------------------------------------------:|
| TABLESTORE_INSTANCE_NAME     | <span style="color:red; font-weight:bold;">**是(yes)**</span> |        实例名         |                                                       -                                                        |
| TABLESTORE_ENDPOINT          | <span style="color:red; font-weight:bold;">**是(yes)**</span> |       实例访问地址       |                                                       -                                                        |
| TABLESTORE_ACCESS_KEY_ID     | <span style="color:red; font-weight:bold;">**是(yes)**</span> |       秘钥 ID        |                                                       -                                                        |
| TABLESTORE_ACCESS_KEY_SECRET | <span style="color:red; font-weight:bold;">**是(yes)**</span> |     秘钥 SECRET      |                                                       -                                                        |
| TABLESTORE_TABLE_NAME        |                             _否_                              |         表名         |                                              tablestore_java_mcp_server_v1                                               |
| TABLESTORE_INDEX_NAME        |                             _否_                              |        索引名         |                                           tablestore_java_mcp_server_index_v1                                            |
| TABLESTORE_VECTOR_DIMENSION  |                             _否_                              |        向量维度        |                                                      768                                                       |
| TABLESTORE_TEXT_FIELD        |                             _否_                              |       文本字段名        |                                                    _content                                                    |
| TABLESTORE_VECTOR_FIELD      |                             _否_                              |       向量字段名        |                                                   _embedding                                                   |
| TABLESTORE_TABLE_PK_NAME      |                             _否_                              |      主键字段名       |                                                       id                                                       |
| EMBEDDING_MODEL_NAME         |                             _否_                              |   Embedding 模型名字   | ai.djl.huggingface.rust/BAAI/bge-base-en-v1.5/0.0.1/bge-base-en-v1.5(维度是768, 和 TABLESTORE_VECTOR_DIMENSION 呼应) |


##### 3.4 Embedding
为了方便，这里不使用云服务的Embedding能力，而使用了内置的本地Embedding模型，这些模型都是可以应用生产的模型，示例代码仅支持了 [DeepJavaLibrary](https://djl.ai/) 上自带的Embedding模型，基本上都来自 Hugging Face，使用十分简单。

想用其它Embedding模型可以运行 `com.alicloud.openservices.tablestore.sample.service.EmbeddingService.listModels()` 方法查看支持的模型。

##### 3.5 运行 MCP 服务

```bash
   export TABLESTORE_ACCESS_KEY_ID=xx
   export TABLESTORE_ACCESS_KEY_SECRET=xx
   export TABLESTORE_ENDPOINT=xxx
   export TABLESTORE_INSTANCE_NAME=xxx
   
   java -jar target/tablestore-java-mcp-server-1.0-SNAPSHOT.jar
```

#### 4. 集成三方工具

##### 4.1 Cherry Studio

[Cherry-Studio](https://github.com/CherryHQ/cherry-studio)，是一个热门的开源的 AI Client 软件, 免费使用，其支持 MCP 服务。

安装 ：[Github链接](https://github.com/CherryHQ/cherry-studio/releases) 下载最新版本的适合自己机器运行环境的安装包. 比如我的电脑是m1芯片的mac，因此下载 Cherry-Studio-1.1.4-arm64.dmg 进行安装。安装好后，需要配置大模型的 api-key 相关信息，这里不再一一描述。

按照如下所示创建MCP服务:

<img src="https://img.alicdn.com/imgextra/i2/O1CN01MrmJh61XVzWTX6T5Y_!!6000000002930-0-tps-3024-1748.jpg" alt="search_ui" width="500"/>

在聊天里使用MCP服务（可以把一些模版填充到 Cherry Studio 的模版里，生成一个自己的特殊助手，后续可以直接使用）：

<img src="https://img.alicdn.com/imgextra/i2/O1CN01uELutj1XBNhRxZGJD_!!6000000002885-0-tps-3014-1732.jpg" alt="search_ui" width="500"/>


#### 5.1 拓展应用场景
MCP 的 Tool 的能力和场景是 Tool 的描述来提供的，因此我们可以定义一些特殊的能力，可以发挥你的想象力。另外，当前我们没有接入一些复杂的多字段自由 Filter 能力、稀疏向量(Sparse Vector)能力，后续有时间会继续进行集成。

仅需要修改如下配置即可, 如何写可以参考 [TablestoreMcp.java](src/main/java/com/alicloud/openservices/tablestore/sample/mcp/TablestoreMcp.java) 和 [Entry.java](src/main/java/com/alicloud/openservices/tablestore/sample/model/Entry.java) 和 [QueryRequest.java](src/main/java/com/alicloud/openservices/tablestore/sample/model/QueryRequest.java)

修改后从 MCP Client 中可以看到工具 (Tool) 的描述已经变成了自定义的描述，那么大模型（LLM）就会根据你的描述去使用工具(Tool)。

<img src="https://img.alicdn.com/imgextra/i3/O1CN01ei8Phx1CiGCaV1Cui_!!6000000000114-0-tps-2974-952.jpg" alt="search_ui" width="500"/>

#### 6. 贡献代码和二次开发

如果你需要基于此代码进行二次开发，可以参考如下。

##### 6.1 依赖

jdk 17

##### 6.2 本地调试: sse 模式

首先在 IDEA 里启动 [App.java](src/main/java/com/alicloud/openservices/tablestore/sample/App.java) 即可。然后运行可视化调试界面 `MCP Inspector`, 根据 Terminal的日志提示打开"http://localhost:5173"进行调试。
```shell
  # 启动 MCP Inspector
  npx @modelcontextprotocol/inspector node build/index.js
```
即可连接并展示MCP的一些能力，我们这里仅仅使用了Tools，可以直接在界面上进行调试和运行。

<img src="https://img.alicdn.com/imgextra/i1/O1CN01E6ZSor1XjH0dOGJ0P_!!6000000002959-0-tps-3012-1572.jpg" alt="search_ui" width="500"/>



</appdetail>




## 使用流程

<usedetail id="flushContent">

部署完成拿到 URL 后，准备好支持 SSE 的 MCP Client，通过 SSETransport 进行连接。

</usedetail>
