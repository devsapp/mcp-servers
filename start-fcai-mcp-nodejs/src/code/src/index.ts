import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';


// Create a new server instance every time a new connection is made to ensure concurrency
const createServer = () => {
  // Create server instance
  const server = new McpServer({
    name: "my-mcp-server",
    version: "1.0.0",
  });
  
  // Implement your tools here
  server.tool(
    "hello_world",
    "Return string 'hello world!'",
    {
      // Define input parameters using zod. example: 
      // prefix: z.string().describe('prefix').optional(),
    },
    async () => {
      console.log("Hello World tool called");
      return {
        content: [{
          type: "text",
          text: 'hello world!',
        }]
      }
    },
  );
  return server;
}
// Create a new server instance
const server = createServer();
// Create a new stdio transport instance
const transport = new StdioServerTransport();
// Start the server
server.connect(transport).then(() => {
  console.log("Server started");
}).catch((err) => {
  console.error("Error starting server:", err);
});