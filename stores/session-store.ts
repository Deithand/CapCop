import { create } from "zustand";

export interface GameInfo {
  id: string;
  name: string;
  icon: string;
  installed: boolean;
}

export interface SessionState {
  pcNumber: number;
  username: string;
  memberLevel: string;
  balance: number;
  sessionStart: Date;
  sessionEnd: Date;
  isLocked: boolean;
  timeRemaining: number;
  hardwareSpecs: {
    gpu: string;
    ram: string;
    cpu: string;
  };
  installedGames: GameInfo[];
  rewardPoints: number;
  networkPing: number;
}

interface SessionStore extends SessionState {
  updateTimeRemaining: (seconds: number) => void;
  extendSession: (hours: number) => void;
  lockSession: () => void;
  unlockSession: () => void;
  addBalance: (amount: number) => void;
  updateNetworkPing: (ping: number) => void;
  setSession: (session: Partial<SessionState>) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  pcNumber: 1,
  username: "Guest",
  memberLevel: "Bronze",
  balance: 500,
  sessionStart: new Date(),
  sessionEnd: new Date(Date.now() + 3600000), // 1 hour from now
  isLocked: false,
  timeRemaining: 3600,
  hardwareSpecs: {
    gpu: "RTX 4060",
    ram: "32GB DDR5",
    cpu: "AMD Ryzen 7 5800X",
  },
  installedGames: [
    { id: "cs2", name: "Counter-Strike 2", icon: "/games/cs2.png", installed: true },
    { id: "dota2", name: "Dota 2", icon: "/games/dota2.png", installed: true },
    { id: "valorant", name: "Valorant", icon: "/games/valorant.png", installed: true },
    { id: "lol", name: "League of Legends", icon: "/games/lol.png", installed: true },
    { id: "apex", name: "Apex Legends", icon: "/games/apex.png", installed: true },
    { id: "overwatch", name: "Overwatch 2", icon: "/games/overwatch.png", installed: true },
  ],
  rewardPoints: 1250,
  networkPing: 12,
  updateTimeRemaining: (seconds) => set({ timeRemaining: seconds }),
  extendSession: (hours) =>
    set((state) => ({
      sessionEnd: new Date(state.sessionEnd.getTime() + hours * 3600000),
      timeRemaining: state.timeRemaining + hours * 3600,
    })),
  lockSession: () => set({ isLocked: true }),
  unlockSession: () => set({ isLocked: false }),
  addBalance: (amount) => set((state) => ({ balance: state.balance + amount })),
  updateNetworkPing: (ping) => set({ networkPing: ping }),
  setSession: (session) => set(session),
}));
