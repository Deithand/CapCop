// API functions for session management
// In production, these would make actual API calls to your backend

export interface SessionData {
  id: string;
  pcId: number;
  userId: string;
  startTime: Date;
  endTime: Date;
  status: "active" | "paused" | "ended";
  totalCost: number;
}

export async function createSession(
  pcId: number,
  userId: string,
  hours: number
): Promise<SessionData> {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `session-${Date.now()}`,
        pcId,
        userId,
        startTime: new Date(),
        endTime: new Date(Date.now() + hours * 3600000),
        status: "active",
        totalCost: hours * 150,
      });
    }, 500);
  });
}

export async function extendSession(
  sessionId: string,
  hours: number
): Promise<SessionData> {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: sessionId,
        pcId: 1,
        userId: "user-1",
        startTime: new Date(),
        endTime: new Date(Date.now() + hours * 3600000),
        status: "active",
        totalCost: hours * 150,
      });
    }, 500);
  });
}

export async function endSession(sessionId: string): Promise<void> {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

export async function pauseSession(sessionId: string): Promise<void> {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

export async function getActiveSessions(): Promise<SessionData[]> {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 500);
  });
}
