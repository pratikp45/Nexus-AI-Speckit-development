'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DataTable } from '@/components/ui/data-table'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  MoreHorizontal, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Star,
  Quote,
  Building,
  User,
  MessageSquare
} from 'lucide-react'
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Zod schema for testimonial validation
const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  role: z.string().min(2, "Role must be at least 2 characters").max(100, "Role must be less than 100 characters"),
  company: z.string().min(2, "Company must be at least 2 characters").max(100, "Company must be less than 100 characters"),
  review: z.string().min(10, "Review must be at least 10 characters").max(500, "Review must be less than 500 characters"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
})

type TestimonialFormValues = z.infer<typeof testimonialSchema>

// Column definitions for the testimonials data table
const columns: ColumnDef<{
  id: string,
  name: string,
  role: string,
  company: string,
  review: string,
  rating: number,
  date: string,
  status: string,
}>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">{row.getValue("role")}</div>
    ),
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Building className="h-4 w-4 text-muted-foreground" />
        <div>{row.getValue("company")}</div>
      </div>
    ),
  },
  {
    accessorKey: "review",
    header: "Review",
    cell: ({ row }) => {
      const review = row.getValue("review") as string
      return (
        <div className="max-w-xs truncate" title={review}>
          {review}
        </div>
      )
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number
      return (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-1 text-sm">({rating})</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variant = status === "Published" ? "default" : "secondary"
      return (
        <Badge variant={variant}>{status}</Badge>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">{row.getValue("date")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const testimonial = row.original

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
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit testimonial
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {testimonial.status === 'Published' ? 'Unpublish' : 'Publish'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete testimonial
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// Testimonial Card Component for Preview
function TestimonialCard({ testimonial }: { testimonial: {
  id: string,
  name: string,
  role: string,
  company: string,
  review: string,
  rating: number,
  date: string,
  status: string,
} }) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <blockquote className="text-sm italic text-muted-foreground">
              "{testimonial.review}"
            </blockquote>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TestimonialsPage() {
  // Mock data for testimonials
  const [testimonials, setTestimonials] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechStart Inc.',
      review: 'Nexus AI has completely transformed our workflow. The AI-powered features have increased our productivity by 40% and the team loves the intuitive interface.',
      rating: 5,
      date: '2024-06-15',
      status: 'Published',
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Innovation Labs',
      review: 'The best AI platform we\'ve ever used. The automation features are incredible and the customer support is outstanding. Highly recommended!',
      rating: 5,
      date: '2024-06-12',
      status: 'Published',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      company: 'Growth Co.',
      review: 'Nexus AI helped us streamline our marketing campaigns and improve our ROI. The analytics features are exactly what we needed.',
      rating: 4,
      date: '2024-06-10',
      status: 'Draft',
    },
    {
      id: '4',
      name: 'David Williams',
      role: 'CTO',
      company: 'Dev Solutions',
      review: 'Excellent platform with powerful features. The API integration was seamless and the documentation is comprehensive.',
      rating: 5,
      date: '2024-06-08',
      status: 'Published',
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      role: 'Operations Manager',
      company: 'Streamline Corp',
      review: 'Great tool for team collaboration. The real-time features have improved our communication and project management significantly.',
      rating: 4,
      date: '2024-06-05',
      status: 'Draft',
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<typeof testimonials[0] | null>(null)
  const [previewTestimonial, setPreviewTestimonial] = useState<typeof testimonials[0] | null>(null)

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      role: "",
      company: "",
      review: "",
      rating: 5,
    },
  })

  const onSubmit = (data: TestimonialFormValues) => {
    if (editingTestimonial) {
      // Edit existing testimonial
      setTestimonials(prev => 
        prev.map(t => 
          t.id === editingTestimonial.id 
            ? { ...t, ...data, date: new Date().toISOString().split('T')[0] }
            : t
        )
      )
      setEditingTestimonial(null)
    } else {
      // Add new testimonial
      const newTestimonial = {
        id: Date.now().toString(),
        ...data,
        date: new Date().toISOString().split('T')[0],
        status: 'Draft',
      }
      setTestimonials(prev => [newTestimonial, ...prev])
    }
    
    form.reset()
    setIsAddDialogOpen(false)
  }

  const handleEdit = (testimonial: typeof testimonials[0]) => {
    setEditingTestimonial(testimonial)
    form.reset({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      review: testimonial.review,
      rating: testimonial.rating,
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id))
  }

  const handlePreview = (testimonial: typeof testimonials[0]) => {
    setPreviewTestimonial(testimonial)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground">
            Manage customer testimonials and reviews.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingTestimonial(null)
              form.reset()
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </DialogTitle>
              <DialogDescription>
                {editingTestimonial ? 'Update the testimonial details.' : 'Add a new customer testimonial.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="John Doe"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    {...form.register("role")}
                    placeholder="CEO"
                  />
                  {form.formState.errors.role && (
                    <p className="text-sm text-destructive">{form.formState.errors.role.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  {...form.register("company")}
                  placeholder="Tech Company"
                />
                {form.formState.errors.company && (
                  <p className="text-sm text-destructive">{form.formState.errors.company.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="review">Review</Label>
                <Textarea
                  id="review"
                  {...form.register("review")}
                  placeholder="Customer review text..."
                  rows={4}
                />
                {form.formState.errors.review && (
                  <p className="text-sm text-destructive">{form.formState.errors.review.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => form.setValue("rating", star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= form.watch("rating")
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({form.watch("rating")} stars)
                  </span>
                </div>
                {form.formState.errors.rating && (
                  <p className="text-sm text-destructive">{form.formState.errors.rating.message}</p>
                )}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTestimonial ? 'Update' : 'Add'} Testimonial
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testimonials.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {testimonials.filter(t => t.status === 'Published').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Active on website
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {testimonials.filter(t => t.status === 'Draft').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Pending review
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of 5 stars
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Testimonials</CardTitle>
              <CardDescription>
                Manage customer testimonials and reviews.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={testimonials} 
            searchColumn="name"
            searchPlaceholder="Search testimonials by name..."
          />
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={!!previewTestimonial} onOpenChange={() => setPreviewTestimonial(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Testimonial Preview</DialogTitle>
            <DialogDescription>
              This is how the testimonial will appear on the website.
            </DialogDescription>
          </DialogHeader>
          {previewTestimonial && (
            <TestimonialCard testimonial={previewTestimonial} />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewTestimonial(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
