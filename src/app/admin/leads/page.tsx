'use client'

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
import { MoreHorizontal, Download, Eye, Trash2, MessageSquare, Calendar, Mail } from 'lucide-react'
import { ColumnDef } from "@tanstack/react-table"

// Mock data for contact form submissions
const leads = [
  {
    id: '1',
    name: 'Michael Chen',
    email: 'michael.chen@techcorp.com',
    message: 'I\'m interested in your enterprise solution. We have a team of 50+ developers and need better collaboration tools. Can you schedule a demo?',
    date: '2024-06-15',
    status: 'New',
    source: 'Contact Form',
    priority: 'High',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@startup.io',
    message: 'Love your product! We\'re a small startup looking for AI-powered productivity solutions. What\'s your pricing for teams of 10?',
    date: '2024-06-14',
    status: 'Contacted',
    source: 'Website',
    priority: 'Medium',
  },
  {
    id: '3',
    name: 'David Williams',
    email: 'd.williams@consulting.com',
    message: 'We need a custom solution for our consulting firm. We handle sensitive client data and require enterprise-grade security features.',
    date: '2024-06-13',
    status: 'New',
    source: 'Contact Form',
    priority: 'High',
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'emily.brown@retail.com',
    message: 'Interested in your AI automation features for our retail business. How does it integrate with existing systems?',
    date: '2024-06-12',
    status: 'Qualified',
    source: 'Referral',
    priority: 'Medium',
  },
  {
    id: '5',
    name: 'Robert Taylor',
    email: 'rtaylor@manufacturing.net',
    message: 'We need to streamline our manufacturing processes. Can your platform handle inventory management and production scheduling?',
    date: '2024-06-11',
    status: 'New',
    source: 'Contact Form',
    priority: 'Low',
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.a@healthcare.org',
    message: 'Healthcare organization looking for secure AI solutions. We need HIPAA compliance and patient data protection.',
    date: '2024-06-10',
    status: 'Contacted',
    source: 'LinkedIn',
    priority: 'High',
  },
  {
    id: '7',
    name: 'James Wilson',
    email: 'jwilson@finance.com',
    message: 'Financial services company interested in AI for fraud detection and risk assessment. What compliance standards do you support?',
    date: '2024-06-09',
    status: 'Qualified',
    source: 'Cold Email',
    priority: 'Medium',
  },
  {
    id: '8',
    name: 'Maria Garcia',
    email: 'maria.g@education.edu',
    message: 'Educational institution looking for AI-powered learning management tools. Do you offer discounts for non-profits?',
    date: '2024-06-08',
    status: 'New',
    source: 'Contact Form',
    priority: 'Low',
  },
]

// Column definitions for the leads data table
const columns: ColumnDef<typeof leads[0]>[] = [
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
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <div className="lowercase">{row.getValue("email")}</div>
      </div>
    ),
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.getValue("message") as string
      return (
        <div className="max-w-xs truncate" title={message}>
          {message}
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <div>{row.getValue("date")}</div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variant = status === "New" ? "default" : 
                      status === "Contacted" ? "secondary" : "outline"
      return (
        <Badge variant={variant}>{status}</Badge>
      )
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string
      const color = priority === "High" ? "destructive" : 
                    priority === "Medium" ? "default" : "secondary"
      return (
        <Badge variant={color}>{priority}</Badge>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const lead = row.original

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
            <DropdownMenuItem>Mark as contacted</DropdownMenuItem>
            <DropdownMenuItem>Assign to sales</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              Send email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete lead
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// Export functionality
const exportLeads = () => {
  const csvContent = [
    ['Name', 'Email', 'Message', 'Date', 'Status', 'Priority', 'Source'],
    ...leads.map(lead => [
      lead.name,
      lead.email,
      lead.message.replace(/,/g, ';'), // Replace commas to avoid CSV issues
      lead.date,
      lead.status,
      lead.priority,
      lead.source
    ])
  ].map(row => row.join(',')).join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.setAttribute('hidden', '')
  a.setAttribute('href', url)
  a.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Manage contact form submissions and potential customers.
          </p>
        </div>
        <Button onClick={exportLeads}>
          <Download className="mr-2 h-4 w-4" />
          Export Leads
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,432</div>
            <p className="text-xs text-muted-foreground">
              +23% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
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
            <CardTitle className="text-sm font-medium">Contacted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Leads</CardTitle>
              <CardDescription>
                Contact form submissions and potential customer inquiries.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={leads} 
            searchColumn="name"
            searchPlaceholder="Search leads by name..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
