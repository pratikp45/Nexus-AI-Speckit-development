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
import { MoreHorizontal, UserPlus, Filter, Download, Eye, Trash2 } from 'lucide-react'
import { ColumnDef } from "@tanstack/react-table"

// Extended mock data for better demonstration
const users = [
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
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("role")}</Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "Active" ? "default" : "secondary"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "joinDate",
    header: "Created Date",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("joinDate")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Change role</DropdownMenuItem>
            <DropdownMenuItem>Reset password</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage your platform users and their permissions.
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,341</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">504</div>
            <p className="text-xs text-muted-foreground">
              -3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                A list of all users in your platform including their name, email, role, and status.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={users} 
            searchColumn="name"
            searchPlaceholder="Search users by name..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
