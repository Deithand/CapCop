export class WebSocketManager {
  private ws: WebSocket | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;

  constructor(private url: string) {}

  connect(
    onMessage: (data: any) => void,
    onError?: (error: Event) => void,
    onOpen?: () => void
  ) {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log("WebSocket connected");
        this.reconnectAttempts = 0;
        onOpen?.();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage(data);
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        onError?.(error);
      };

      this.ws.onclose = () => {
        console.log("WebSocket disconnected");
        this.attemptReconnect(onMessage, onError, onOpen);
      };
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
    }
  }

  private attemptReconnect(
    onMessage: (data: any) => void,
    onError?: (error: Event) => void,
    onOpen?: () => void
  ) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      return;
    }

    this.reconnectAttempts++;
    console.log(
      `Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
    );

    this.reconnectTimeout = setTimeout(() => {
      this.connect(onMessage, onError, onOpen);
    }, this.reconnectDelay);
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error("WebSocket is not connected");
    }
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

// Mock WebSocket for development
export function createMockWebSocket() {
  return {
    connect: (onMessage: (data: any) => void) => {
      // Simulate real-time updates every 5 seconds
      const interval = setInterval(() => {
        onMessage({
          type: "pc_update",
          data: {
            pcId: Math.floor(Math.random() * 20) + 1,
            timeRemaining: Math.floor(Math.random() * 7200),
            performance: {
              fps: Math.floor(Math.random() * 60) + 140,
              cpuUsage: Math.floor(Math.random() * 40) + 20,
              ramUsage: Math.floor(Math.random() * 30) + 40,
            },
          },
        });
      }, 5000);

      return () => clearInterval(interval);
    },
    send: (data: any) => console.log("Mock send:", data),
    disconnect: () => console.log("Mock disconnect"),
  };
}
