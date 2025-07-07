import type { User } from "@/data/user";
import { create } from "zustand";


interface UserStore {
  users: User[];
  selectedUser: User | null;

  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  removeUser: (id: string) => void;
  selectUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  selectedUser: null,

  setUsers: (users) => set({ users }),

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),

  updateUser: (user) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === user.id ? user : u)),
    })),

  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),

  selectUser: (user) => set({ selectedUser: user }),
}));
