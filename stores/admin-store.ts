import { create } from "zustand";

export interface PCStatus {
  id: number;
  status: "available" | "occupied" | "maintenance";
  currentUser?: string;
  timeRemaining?: number;
  debt: number;
  hardwareSpecs: {
    gpu: string;
    ram: string;
    cpu: string;
  };
  performance: {
    fps: number;
    cpuUsage: number;
    ramUsage: number;
    temperature: number;
  };
  sessionStart?: Date;
}

export interface UserAccount {
  id: string;
  username: string;
  email: string;
  balance: number;
  memberLevel: "Bronze" | "Silver" | "Gold" | "Platinum";
  loyaltyPoints: number;
  totalSpent: number;
  joinDate: Date;
  lastVisit: Date;
  isBanned: boolean;
  avatarUrl?: string;
}

export interface RevenueData {
  todayRevenue: number;
  weekRevenue: number;
  monthRevenue: number;
  activeSessions: number;
  totalUsers: number;
}

interface AdminStore {
  pcs: PCStatus[];
  users: UserAccount[];
  revenue: RevenueData;
  selectedPC: number | null;
  updatePCStatus: (id: number, status: Partial<PCStatus>) => void;
  endSession: (pcId: number) => void;
  extendSession: (pcId: number, hours: number) => void;
  rebootPC: (pcId: number) => void;
  selectPC: (id: number | null) => void;
  addRevenue: (amount: number) => void;
  updateUser: (id: string, data: Partial<UserAccount>) => void;
  banUser: (id: string) => void;
  unbanUser: (id: string) => void;
}

// Mock data
const mockPCs: PCStatus[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  status: i % 3 === 0 ? "available" : i % 7 === 0 ? "maintenance" : "occupied",
  currentUser: i % 3 !== 0 && i % 7 !== 0 ? `User${i + 1}` : undefined,
  timeRemaining: i % 3 !== 0 && i % 7 !== 0 ? Math.floor(Math.random() * 7200) : undefined,
  debt: i % 5 === 0 ? Math.floor(Math.random() * 500) : 0,
  hardwareSpecs: {
    gpu: i % 2 === 0 ? "RTX 4060" : "RTX 3060 Ti",
    ram: "32GB DDR5",
    cpu: "AMD Ryzen 7 5800X",
  },
  performance: {
    fps: Math.floor(Math.random() * 60) + 140,
    cpuUsage: Math.floor(Math.random() * 40) + 20,
    ramUsage: Math.floor(Math.random() * 30) + 40,
    temperature: Math.floor(Math.random() * 20) + 55,
  },
  sessionStart: i % 3 !== 0 && i % 7 !== 0 ? new Date(Date.now() - Math.random() * 10800000) : undefined,
}));

const mockUsers: UserAccount[] = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  username: `Player${i + 1}`,
  email: `player${i + 1}@example.com`,
  balance: Math.floor(Math.random() * 2000),
  memberLevel: ["Bronze", "Silver", "Gold", "Platinum"][Math.floor(Math.random() * 4)] as any,
  loyaltyPoints: Math.floor(Math.random() * 5000),
  totalSpent: Math.floor(Math.random() * 50000),
  joinDate: new Date(Date.now() - Math.random() * 31536000000),
  lastVisit: new Date(Date.now() - Math.random() * 86400000),
  isBanned: false,
}));

export const useAdminStore = create<AdminStore>((set) => ({
  pcs: mockPCs,
  users: mockUsers,
  revenue: {
    todayRevenue: 45680,
    weekRevenue: 287450,
    monthRevenue: 1245890,
    activeSessions: 14,
    totalUsers: 523,
  },
  selectedPC: null,
  updatePCStatus: (id, status) =>
    set((state) => ({
      pcs: state.pcs.map((pc) => (pc.id === id ? { ...pc, ...status } : pc)),
    })),
  endSession: (pcId) =>
    set((state) => ({
      pcs: state.pcs.map((pc) =>
        pc.id === pcId
          ? {
              ...pc,
              status: "available" as const,
              currentUser: undefined,
              timeRemaining: undefined,
              sessionStart: undefined,
            }
          : pc
      ),
    })),
  extendSession: (pcId, hours) =>
    set((state) => ({
      pcs: state.pcs.map((pc) =>
        pc.id === pcId && pc.timeRemaining
          ? { ...pc, timeRemaining: pc.timeRemaining + hours * 3600 }
          : pc
      ),
    })),
  rebootPC: (pcId) =>
    set((state) => ({
      pcs: state.pcs.map((pc) =>
        pc.id === pcId ? { ...pc, status: "maintenance" as const } : pc
      ),
    })),
  selectPC: (id) => set({ selectedPC: id }),
  addRevenue: (amount) =>
    set((state) => ({
      revenue: {
        ...state.revenue,
        todayRevenue: state.revenue.todayRevenue + amount,
      },
    })),
  updateUser: (id, data) =>
    set((state) => ({
      users: state.users.map((user) => (user.id === id ? { ...user, ...data } : user)),
    })),
  banUser: (id) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, isBanned: true } : user
      ),
    })),
  unbanUser: (id) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, isBanned: false } : user
      ),
    })),
}));
