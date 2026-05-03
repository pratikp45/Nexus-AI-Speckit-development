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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { 
  MoreHorizontal, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageSquare,
  GripVertical,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Define FAQ type
type FAQ = {
  id: string,
  question: string,
  answer: string,
  category: string,
  order: number,
  date: string,
  status: string,
}

// Zod schema for FAQ validation
const faqSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters").max(200, "Question must be less than 200 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters").max(1000, "Answer must be less than 1000 characters"),
  category: z.string().min(2, "Category must be at least 2 characters").max(50, "Category must be less than 50 characters"),
  order: z.number().min(0, "Order must be a positive number"),
})

type FAQFormValues = z.infer<typeof faqSchema>

// FAQ Accordion Component for Preview
function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <Card key={faq.id} className="w-full">
          <Collapsible
            open={openItems.includes(faq.id)}
            onOpenChange={() => toggleItem(faq.id)}
          >
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="outline" className="text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-left">{faq.question}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Order: {faq.order}
                    </Badge>
                    {openItems.includes(faq.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="pl-7">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                    <span>Created: {faq.date}</span>
                    <span>Status: {faq.status}</span>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  )
}

// Column definitions for the FAQ data table
const columns: ColumnDef<FAQ>[] = [
  {
    accessorKey: "order",
    header: "Order",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
        <Badge variant="outline" className="text-xs">
          {row.getValue("order")}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "question",
    header: "Question",
    cell: ({ row }) => (
      <div className="max-w-md">
        <div className="font-medium">{row.getValue("question")}</div>
      </div>
    ),
  },
  {
    accessorKey: "answer",
    header: "Answer",
    cell: ({ row }) => {
      const answer = row.getValue("answer") as string
      return (
        <div className="max-w-xs truncate" title={answer}>
          {answer}
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("category")}</Badge>
    ),
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
      const faq = row.original

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
              Edit FAQ
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ArrowUp className="mr-2 h-4 w-4" />
              Move up
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ArrowDown className="mr-2 h-4 w-4" />
              Move down
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {faq.status === 'Published' ? 'Unpublish' : 'Publish'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete FAQ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function FAQPage() {
  // Mock data for FAQs
  const [faqs, setFaqs] = useState([
    {
      id: '1',
      question: 'What is Nexus AI and how does it work?',
      answer: 'Nexus AI is an advanced artificial intelligence platform that helps businesses automate workflows, analyze data, and make intelligent decisions. It uses machine learning algorithms to process your data and provide actionable insights.',
      category: 'General',
      order: 1,
      date: '2024-06-15',
      status: 'Published',
    },
    {
      id: '2',
      question: 'How secure is my data with Nexus AI?',
      answer: 'We take data security very seriously. All data is encrypted both in transit and at rest using industry-standard encryption protocols. We comply with GDPR, CCPA, and other major data protection regulations.',
      category: 'Security',
      order: 2,
      date: '2024-06-14',
      status: 'Published',
    },
    {
      id: '3',
      question: 'What integrations are available?',
      answer: 'Nexus AI integrates with over 100+ popular business tools including Slack, Microsoft Teams, Salesforce, HubSpot, Google Workspace, and many more. We also provide a robust API for custom integrations.',
      category: 'Integrations',
      order: 3,
      date: '2024-06-13',
      status: 'Published',
    },
    {
      id: '4',
      question: 'Can I customize the AI models for my specific needs?',
      answer: 'Yes! Nexus AI allows you to fine-tune our pre-trained models on your specific data. You can also create custom workflows and automation rules tailored to your business processes.',
      category: 'Features',
      order: 4,
      date: '2024-06-12',
      status: 'Draft',
    },
    {
      id: '5',
      question: 'What kind of support do you offer?',
      answer: 'We offer 24/7 email support, business hours phone support for Enterprise plans, and a comprehensive knowledge base. Enterprise customers also get a dedicated account manager and priority support.',
      category: 'Support',
      order: 5,
      date: '2024-06-11',
      status: 'Published',
    },
    {
      id: '6',
      question: 'Is there a free trial available?',
      answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required. After the trial, you can choose the plan that best fits your needs.',
      category: 'Pricing',
      order: 6,
      date: '2024-06-10',
      status: 'Published',
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null)
  const [previewMode, setPreviewMode] = useState(false)

  const form = useForm<FAQFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: "",
      answer: "",
      category: "",
      order: 0,
    },
  })

  const onSubmit = (data: FAQFormValues) => {
    if (editingFAQ) {
      // Edit existing FAQ
      setFaqs(prev => 
        prev.map(f => 
          f.id === editingFAQ.id 
            ? { ...f, ...data, date: new Date().toISOString().split('T')[0] }
            : f
        )
      )
      setEditingFAQ(null)
    } else {
      // Add new FAQ
      const newFAQ = {
        id: Date.now().toString(),
        ...data,
        date: new Date().toISOString().split('T')[0],
        status: 'Draft',
      }
      setFaqs(prev => [...prev, newFAQ])
    }
    
    form.reset()
    setIsAddDialogOpen(false)
  }

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq)
    form.reset({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id))
  }

  const handleMoveUp = (id: string) => {
    setFaqs(prev => {
      const index = prev.findIndex(f => f.id === id)
      if (index <= 0) return prev
      
      const newFaqs = [...prev]
      ;[newFaqs[index - 1], newFaqs[index]] = [newFaqs[index], newFaqs[index - 1]]
      
      // Update order values
      return newFaqs.map((faq, idx) => ({
        ...faq,
        order: idx + 1
      }))
    })
  }

  const handleMoveDown = (id: string) => {
    setFaqs(prev => {
      const index = prev.findIndex(f => f.id === id)
      if (index >= prev.length - 1) return prev
      
      const newFaqs = [...prev]
      ;[newFaqs[index], newFaqs[index + 1]] = [newFaqs[index + 1], newFaqs[index]]
      
      // Update order values
      return newFaqs.map((faq, idx) => ({
        ...faq,
        order: idx + 1
      }))
    })
  }

  const toggleStatus = (id: string) => {
    setFaqs(prev => 
      prev.map(f => 
        f.id === id 
          ? { ...f, status: f.status === 'Published' ? 'Draft' : 'Published' }
          : f
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FAQ Management</h1>
          <p className="text-muted-foreground">
            Manage frequently asked questions and help content.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {previewMode ? 'Table View' : 'Preview'}
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingFAQ(null)
                form.reset()
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Add FAQ
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
                </DialogTitle>
                <DialogDescription>
                  {editingFAQ ? 'Update the FAQ details.' : 'Add a new frequently asked question.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Input
                    id="question"
                    {...form.register("question")}
                    placeholder="What is Nexus AI?"
                  />
                  {form.formState.errors.question && (
                    <p className="text-sm text-destructive">{form.formState.errors.question.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="answer">Answer</Label>
                  <Textarea
                    id="answer"
                    {...form.register("answer")}
                    placeholder="Provide a detailed answer..."
                    rows={4}
                  />
                  {form.formState.errors.answer && (
                    <p className="text-sm text-destructive">{form.formState.errors.answer.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      {...form.register("category")}
                      placeholder="General"
                    />
                    {form.formState.errors.category && (
                      <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order">Order</Label>
                    <Input
                      id="order"
                      type="number"
                      {...form.register("order", { valueAsNumber: true })}
                      placeholder="1"
                    />
                    {form.formState.errors.order && (
                      <p className="text-sm text-destructive">{form.formState.errors.order.message}</p>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingFAQ ? 'Update' : 'Add'} FAQ
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total FAQs</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{faqs.length}</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {faqs.filter(f => f.status === 'Published').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Visible to users
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {faqs.filter(f => f.status === 'Draft').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Pending review
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {[...new Set(faqs.map(f => f.category))].length}
            </div>
            <p className="text-xs text-muted-foreground">
              Unique categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Content */}
      {previewMode ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>FAQ Preview</CardTitle>
                <CardDescription>
                  This is how your FAQs will appear to users.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <FAQAccordion faqs={faqs.filter(f => f.status === 'Published')} />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All FAQs</CardTitle>
                <CardDescription>
                  Manage frequently asked questions and their order.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={columns} 
              data={faqs} 
              searchColumn="question"
              searchPlaceholder="Search FAQs by question..."
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
