package org.springframework.ai.mcp.sample.server;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;

@Service
public class McpService {
	public McpService() {}
	/**
	 * A sample tool. Return string 'Hello World!'
	 * @return String
	 */
	@Tool(description = "Return string 'Hello World!'")
	public String helloWorld() {
		return "Hello World!";
	}

	public static void main(String[] args) {
		McpService client = new McpService();
		System.out.println(client.helloWorld());
	}
}