'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/data-table'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, UserPlus, Filter, Download, Eye, Trash2, Search, Edit, Trash } from 'lucide-react'
import { ColumnDef } from "@tanstack/react-table"
import { TableSkeleton } from '@/components/ui/skeleton-loaders'
import { EmptyUsersState, ErrorState, NetworkErrorState } from '@/components/ui/error-states'

// Define user type
type User = {
  id: string
  name: string
  email: string
  role: string
  status: string
  joinDate: string
  lastActive: string
}

// Extended mock data for better demonstration
const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    joinDate: '2024-01-15',
    lastActive: '2 hours ago',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'Active',
    joinDate: '2024-02-20',
    lastActive: '5 minutes ago',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'Inactive',
    joinDate: '2024-03-10',
    lastActive: '3 days ago',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'Moderator',
    status: 'Active',
    joinDate: '2024-01-25',
    lastActive: '1 hour ago',
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'User',
    status: 'Active',
    joinDate: '2024-04-05',
    lastActive: '30 minutes ago',
  },
  {
    id: '6',
    name: 'Diana Martinez',
    email: 'diana.martinez@example.com',
    role: 'User',
    status: 'Active',
    joinDate: '2024-03-15',
    lastActive: '1 day ago',
  },
  {
    id: '7',
    name: 'Ethan Davis',
    email: 'ethan.davis@example.com',
    role: 'Moderator',
    status: 'Inactive',
    joinDate: '2024-02-10',
    lastActive: '1 week ago',
  },
  {
    id: '8',
    name: 'Fiona Garcia',
    email: 'fiona.garcia@example.com',
    role: 'User',
    status: 'Active',
    joinDate: '2024-04-20',
    lastActive: '15 minutes ago',
  },
]

// Column definitions for the data table
const columns: ColumnDef<typeof users[0]>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium text-white">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="lowercase text-white/70">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return (
        <span className={`nexus-table-badge ${role.toLowerCase()}`}>
          {role}
        </span>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <span className={`nexus-table-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: "joinDate",
    header: "Created Date",
    cell: ({ row }) => (
      <div className="text-white/60">{row.getValue("joinDate")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className="nexus-table-actions">
          <button className="nexus-action-btn edit">
            <Edit className="h-4 w-4" />
          </button>
          <button className="nexus-action-btn delete">
            <Trash className="h-4 w-4" />
          </button>
        </div>
      )
    },
  },
]

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [users, setUsers] = useState<User[]>([])

  // Simulate data loading
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Simulate random error (10% chance)
        if (Math.random() < 0.1) {
          throw new Error('Failed to load users')
        }
        
        // Mock data
        const mockUsers = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            status: 'Active',
            joinDate: '2024-01-15',
            lastActive: '2 hours ago',
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            status: 'Active',
            joinDate: '2024-02-20',
            lastActive: '1 day ago',
          },
          {
            id: '3',
            name: 'Bob Johnson',
            email: 'bob.johnson@example.com',
            role: 'Moderator',
            status: 'Inactive',
            joinDate: '2024-03-10',
            lastActive: '3 days ago',
          },
        ]
        
        setUsers(mockUsers)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    loadUsers()
  }, [])

  const handleRetry = () => {
    // Trigger reload
    window.location.reload()
  }

  const handleAddUser = () => {
    // Handle add user action
    console.log('Add user clicked')
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground">Manage user accounts and permissions.</p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
        <TableSkeleton rows={5} columns={6} />
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground">Manage user accounts and permissions.</p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
        <NetworkErrorState onRetry={handleRetry} />
      </div>
    )
  }

  // Show empty state
  if (users.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground">Manage user accounts and permissions.</p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
        <EmptyUsersState onAdd={handleAddUser} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold nexus-gradient-text nexus-heading">Users</h1>
          <p className="nexus-subheading">
            Manage your platform users and their permissions.
          </p>
        </div>
        <button className="nexus-button-primary nexus-interactive">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Modern Search Bar */}
      <div className="nexus-search-container">
        <Search className="nexus-search-icon h-4 w-4" />
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="nexus-search-input nexus-input-focus"
        />
      </div>

      {/* Modern Data Table */}
      <div className="nexus-data-table-container">
        <table className="nexus-data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="nexus-list-item">
                <td className="font-medium text-white">{user.name}</td>
                <td className="text-white/70 lowercase">{user.email}</td>
                <td>
                  <span className={`nexus-table-badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`nexus-table-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td className="text-white/60">{user.joinDate}</td>
                <td>
                  <div className="nexus-table-actions">
                    <button className="nexus-button-icon secondary nexus-interactive">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="nexus-button-icon secondary nexus-interactive">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
