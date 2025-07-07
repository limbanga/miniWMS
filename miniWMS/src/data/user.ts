export type UserRole = "admin" | "manager" | "staff";
export type UserStatus = "active" | "inactive" | "suspended";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

export const sampleUsers: User[] = [
  {
    id: "1",
    username: "admin01",
    email: "admin01@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2025-07-05T10:20:00Z",
    createdAt: "2025-01-10T09:00:00Z",
    updatedAt: "2025-07-01T14:30:00Z",
  },
  {
    id: "2",
    username: "manager01",
    email: "manager01@example.com",
    role: "manager",
    status: "inactive",
    lastLogin: "2025-06-20T15:00:00Z",
    createdAt: "2025-02-01T08:30:00Z",
    updatedAt: "2025-06-25T09:45:00Z",
  },
  {
    id: "3",
    username: "staff01",
    email: "staff01@example.com",
    role: "staff",
    status: "suspended",
    lastLogin: "2025-05-10T12:10:00Z",
    createdAt: "2025-03-15T11:00:00Z",
    updatedAt: "2025-06-01T16:00:00Z",
  },
]
