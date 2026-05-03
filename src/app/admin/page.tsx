"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NexusCard } from '@/components/ui/nexus-card'
import { NexusButton } from '@/components/ui/nexus-button'
import { NexusBadge } from '@/components/ui/nexus-badge'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  BarChart3,
  FileText,
  Settings,
  Shield,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  UserPlus,
  CreditCard,
  Target
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts'

export default function AdminDashboard() {
  // Mock data for charts
  const userGrowthData = [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1450 },
    { month: 'Mar', users: 1680 },
    { month: 'Apr', users: 1920 },
    { month: 'May', users: 2340 },
    { month: 'Jun', users: 2845 },
  ]

  const conversionData = [
    { name: 'Basic', value: 450, color: '#3b82f6' },
    { name: 'Pro', value: 380, color: '#8b5cf6' },
    { name: 'Enterprise', value: 220, color: '#ec4899' },
  ]

  const recentActivity = [
    { id: 1, title: 'New user registration', description: 'John Doe signed up', time: '2 minutes ago', color: 'bg-green-500' },
    { id: 2, title: 'Payment received', description: '$299 from Pro plan', time: '1 hour ago', color: 'bg-blue-500' },
    { id: 3, title: 'Support ticket', description: 'New ticket #1234', time: '3 hours ago', color: 'bg-yellow-500' },
    { id: 4, title: 'System update', description: 'Database backup completed', time: '6 hours ago', color: 'bg-purple-500' },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="nexus-slide-up">
        <h1 className="text-4xl font-bold nexus-gradient-text nexus-heading">Admin Dashboard</h1>
        <p className="nexus-subheading">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="nexus-analytics-card blue nexus-slide-up nexus-card-hover" style={{ animationDelay: '0.1s' }}>
          <div className="nexus-analytics-content">
            <div className="nexus-analytics-header">
              <div className="nexus-analytics-icon blue nexus-card-icon">
                <Users className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="nexus-analytics-label">Total Users</div>
            <div className="nexus-analytics-value">2,845</div>
            <div className="nexus-analytics-trend positive">
              <ArrowUp className="nexus-analytics-trend-icon" />
              <span>+12% from last month</span>
            </div>
          </div>
        </div>
        
        <div className="nexus-analytics-card pink nexus-slide-up nexus-card-hover" style={{ animationDelay: '0.2s' }}>
          <div className="nexus-analytics-content">
            <div className="nexus-analytics-header">
              <div className="nexus-analytics-icon pink nexus-card-icon">
                <Target className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="nexus-analytics-label">Leads Collected</div>
            <div className="nexus-analytics-value">1,432</div>
            <div className="nexus-analytics-trend positive">
              <ArrowUp className="nexus-analytics-trend-icon" />
              <span>+23% from last month</span>
            </div>
          </div>
        </div>
        
        <div className="nexus-analytics-card purple nexus-slide-up nexus-card-hover" style={{ animationDelay: '0.3s' }}>
          <div className="nexus-analytics-content">
            <div className="nexus-analytics-header">
              <div className="nexus-analytics-icon purple nexus-card-icon">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="nexus-analytics-label">Active Subscriptions</div>
            <div className="nexus-analytics-value">1,145</div>
            <div className="nexus-analytics-trend positive">
              <ArrowUp className="nexus-analytics-trend-icon" />
              <span>+8% from last month</span>
            </div>
          </div>
        </div>
        
        <div className="nexus-analytics-card amber nexus-slide-up nexus-card-hover" style={{ animationDelay: '0.4s' }}>
          <div className="nexus-analytics-content">
            <div className="nexus-analytics-header">
              <div className="nexus-analytics-icon amber nexus-card-icon">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="nexus-analytics-label">Revenue</div>
            <div className="nexus-analytics-value">$45,231</div>
            <div className="nexus-analytics-trend positive">
              <ArrowUp className="nexus-analytics-trend-icon" />
              <span>+15% from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* User Growth Chart */}
        <div className="nexus-glass-card col-span-4 nexus-slide-up nexus-card-hover" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold nexus-gradient-text">User Growth</h3>
            <button className="nexus-button-secondary nexus-small text-sm px-3 py-1 nexus-interactive">
              View All
            </button>
          </div>
          <p className="nexus-subheading mb-6">
            Monthly user registration trends
          </p>
          <div className="h-64 relative">
            {/* Chart background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-xl" />
            
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={userGrowthData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="rgba(147, 51, 234, 0.08)" 
                  strokeWidth={1}
                />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(147, 51, 234, 0.4)" 
                  strokeWidth={1}
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                />
                <YAxis 
                  stroke="rgba(147, 51, 234, 0.4)" 
                  strokeWidth={1}
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 10, 15, 0.95)', 
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(147, 51, 234, 0.3)',
                    borderRadius: '16px',
                    color: '#f8fafc',
                    boxShadow: '0 8px 32px rgba(147, 51, 234, 0.2)',
                    fontSize: 13,
                    padding: '12px 16px'
                  }} 
                  labelStyle={{ color: '#e0e7ff', fontWeight: 600 }}
                  itemStyle={{ color: '#ffffff', padding: '4px 0' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="url(#lineGradient)" 
                  strokeWidth={3}
                  dot={{ 
                    fill: '#8b5cf6', 
                    r: 5,
                    stroke: '#ffffff',
                    strokeWidth: 2
                  }}
                  activeDot={{ 
                    r: 8, 
                    fill: '#8b5cf6',
                    stroke: '#ffffff',
                    strokeWidth: 3,
                    style: { filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))' }
                  }}
                  animationDuration={2000}
                  animationEasing="ease-in-out"
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Conversions Chart */}
        <div className="nexus-glass-card col-span-3 nexus-slide-up nexus-card-hover" style={{ animationDelay: '0.6s' }}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold nexus-gradient-text">Conversions</h3>
            <p className="nexus-subheading">
              Subscription plan distribution
            </p>
          </div>
          <div className="h-64 relative">
            {/* Chart background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-xl" />
            
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={conversionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="rgba(147, 51, 234, 0.08)" 
                  strokeWidth={1}
                />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(147, 51, 234, 0.4)" 
                  strokeWidth={1}
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                />
                <YAxis 
                  stroke="rgba(147, 51, 234, 0.4)" 
                  strokeWidth={1}
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 10, 15, 0.95)', 
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(147, 51, 234, 0.3)',
                    borderRadius: '16px',
                    color: '#f8fafc',
                    boxShadow: '0 8px 32px rgba(147, 51, 234, 0.2)',
                    fontSize: 13,
                    padding: '12px 16px'
                  }} 
                  labelStyle={{ color: '#e0e7ff', fontWeight: 600 }}
                  itemStyle={{ color: '#ffffff', padding: '4px 0' }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[8, 8, 0, 0]}
                  animationDuration={2000}
                  animationEasing="ease-in-out"
                >
                  {conversionData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      style={{
                        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
                      }}
                    />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="barGradient3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={1} />
                    <stop offset="100%" stopColor="#db2777" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="nexus-glass-card nexus-slide-up nexus-card-hover" style={{ animationDelay: '0.7s' }}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold nexus-gradient-text">Recent Activity</h3>
          <p className="nexus-subheading">
            Latest user actions and system events
          </p>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.title}
                </p>
                <p className="text-sm nexus-body">
                  {activity.description} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="nexus-glass-card nexus-slide-up nexus-card-hover" style={{ animationDelay: '0.8s' }}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold nexus-gradient-text">Quick Actions</h3>
          <p className="nexus-subheading">
            Common administrative tasks and shortcuts
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <button className="nexus-button-secondary h-20 flex-col justify-center nexus-interactive">
            <Users className="h-6 w-6 mb-2" />
            Manage Users
          </button>
          <button className="nexus-button-secondary h-20 flex-col justify-center nexus-interactive">
            <FileText className="h-6 w-6 mb-2" />
            View Content
          </button>
          <button className="nexus-button-secondary h-20 flex-col justify-center nexus-interactive">
            <Settings className="h-6 w-6 mb-2" />
            Settings
          </button>
          <button className="nexus-button-secondary h-20 flex-col justify-center nexus-interactive">
            <DollarSign className="h-6 w-6 mb-2" />
            Pricing
          </button>
        </div>
      </div>
    </div>
  )
}
