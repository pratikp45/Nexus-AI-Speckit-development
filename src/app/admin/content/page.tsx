'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Edit,
  Save,
  Eye,
  FileText,
  Target,
  Zap,
  Plus,
  X,
  ArrowUp,
  ArrowDown,
  Settings,
  RefreshCw
} from 'lucide-react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Define Content types
type HeroSection = {
  title: string
  subtitle: string
  description: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  backgroundImage: string
  showVideo: boolean
  videoUrl: string
}

type Feature = {
  id: string
  title: string
  description: string
  icon: string
  enabled: boolean
  order: number
}

type FeaturesSection = {
  title: string
  subtitle: string
  description: string
  features: Feature[]
  showGrid: boolean
  columns: number
}

type ProblemPoint = {
  id: string
  title: string
  description: string
  solution: string
  icon: string
  enabled: boolean
  order: number
}

type ProblemSection = {
  title: string
  subtitle: string
  description: string
  problems: ProblemPoint[]
  showSolution: boolean
}

type SiteContent = {
  hero: HeroSection
  features: FeaturesSection
  problem: ProblemSection
  lastUpdated: string
}

// Zod schemas for validation
const heroSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  subtitle: z.string().min(5, "Subtitle must be at least 5 characters").max(200, "Subtitle must be less than 200 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  primaryButtonText: z.string().min(2, "Button text must be at least 2 characters").max(30, "Button text must be less than 30 characters"),
  primaryButtonLink: z.string().min(1, "Button link is required"),
  secondaryButtonText: z.string().min(2, "Button text must be at least 2 characters").max(30, "Button text must be less than 30 characters"),
  secondaryButtonLink: z.string().min(1, "Button link is required"),
  backgroundImage: z.string().min(1, "Background image URL is required"),
  showVideo: z.boolean(),
  videoUrl: z.string().optional(),
})

const featureSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(300, "Description must be less than 300 characters"),
  icon: z.string().min(1, "Icon is required"),
  enabled: z.boolean(),
  order: z.number().min(0, "Order must be a positive number"),
})

const featuresSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  subtitle: z.string().min(5, "Subtitle must be at least 5 characters").max(200, "Subtitle must be less than 200 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  features: z.array(featureSchema).min(1, "At least one feature is required"),
  showGrid: z.boolean(),
  columns: z.number().min(1).max(4),
})

const problemPointSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(300, "Description must be less than 300 characters"),
  solution: z.string().min(10, "Solution must be at least 10 characters").max(300, "Solution must be less than 300 characters"),
  icon: z.string().min(1, "Icon is required"),
  enabled: z.boolean(),
  order: z.number().min(0, "Order must be a positive number"),
})

const problemSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  subtitle: z.string().min(5, "Subtitle must be at least 5 characters").max(200, "Subtitle must be less than 200 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  problems: z.array(problemPointSchema).min(1, "At least one problem is required"),
  showSolution: z.boolean(),
})

type HeroFormValues = z.infer<typeof heroSchema>
type FeaturesFormValues = z.infer<typeof featuresSchema>
type ProblemFormValues = z.infer<typeof problemSchema>

// Mock API for saving content
const saveContent = async (content: SiteContent): Promise<boolean> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Save to localStorage for persistence
  localStorage.setItem('siteContent', JSON.stringify({
    ...content,
    lastUpdated: new Date().toISOString()
  }))
  
  return true
}

const loadContent = (): SiteContent => {
  // Try to load from localStorage first
  const saved = localStorage.getItem('siteContent')
  if (saved) {
    return JSON.parse(saved)
  }
  
  // Default content
  return {
    hero: {
      title: "Nexus AI",
      subtitle: "Transform Your Business with AI",
      description: "Experience the future of artificial intelligence with our cutting-edge platform designed to accelerate your growth and innovation.",
      primaryButtonText: "Get Started Free",
      primaryButtonLink: "/signup",
      secondaryButtonText: "Watch Demo",
      secondaryButtonLink: "/demo",
      backgroundImage: "/hero-bg.jpg",
      showVideo: true,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    features: {
      title: "Powerful Features",
      subtitle: "Everything you need to succeed",
      description: "Our comprehensive suite of AI-powered tools helps you automate workflows, gain insights, and make data-driven decisions.",
      features: [
        {
          id: "1",
          title: "AI Automation",
          description: "Automate repetitive tasks and workflows with intelligent AI agents that learn from your patterns.",
          icon: "Zap",
          enabled: true,
          order: 1,
        },
        {
          id: "2",
          title: "Advanced Analytics",
          description: "Get deep insights into your data with our powerful analytics engine and predictive modeling.",
          icon: "Target",
          enabled: true,
          order: 2,
        },
        {
          id: "3",
          title: "Smart Integration",
          description: "Seamlessly connect with your favorite tools and platforms for a unified experience.",
          icon: "Settings",
          enabled: true,
          order: 3,
        },
      ],
      showGrid: true,
      columns: 3,
    },
    problem: {
      title: "Solve Real Problems",
      subtitle: "Address your biggest challenges",
      description: "Our platform tackles the most pressing issues faced by modern businesses, providing solutions that drive real results.",
      problems: [
        {
          id: "1",
          title: "Inefficient Workflows",
          description: "Manual processes and repetitive tasks slow down your team and waste valuable resources.",
          solution: "Our AI automation tools streamline workflows, reducing manual effort by up to 80% and freeing your team to focus on high-value activities.",
          icon: "Clock",
          enabled: true,
          order: 1,
        },
        {
          id: "2",
          title: "Data Silos",
          description: "Disconnected systems and fragmented data make it impossible to get a complete view of your business.",
          solution: "Unified data platform breaks down silos, providing comprehensive insights and enabling data-driven decision making across your organization.",
          icon: "Database",
          enabled: true,
          order: 2,
        },
      ],
      showSolution: true,
    },
    lastUpdated: new Date().toISOString(),
  }
}

export default function ContentPage() {
  const [content, setContent] = useState<SiteContent>(loadContent())
  const [activeTab, setActiveTab] = useState("hero")
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)

  // Hero form
  const heroForm = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: content.hero,
  })

  // Features form
  const featuresForm = useForm<FeaturesFormValues>({
    resolver: zodResolver(featuresSchema),
    defaultValues: content.features,
  })

  // Problem form
  const problemForm = useForm<ProblemFormValues>({
    resolver: zodResolver(problemSchema),
    defaultValues: content.problem,
  })

  const handleSave = async (section: keyof SiteContent) => {
    setIsSaving(true)
    
    try {
      let updatedContent: SiteContent
      
      switch (section) {
        case 'hero':
          const heroData = heroForm.getValues()
          updatedContent = { ...content, hero: { ...heroData, videoUrl: heroData.videoUrl || "" } }
          break
        case 'features':
          const featuresData = featuresForm.getValues()
          updatedContent = { 
            ...content, 
            features: {
              ...featuresData,
              features: featuresData.features.map(f => ({ ...f, id: f.id || Date.now().toString() }))
            }
          }
          break
        case 'problem':
          const problemData = problemForm.getValues()
          updatedContent = { 
            ...content, 
            problem: {
              ...problemData,
              problems: problemData.problems.map(p => ({ ...p, id: p.id || Date.now().toString() }))
            }
          }
          break
        default:
          updatedContent = content
      }
      
      const success = await saveContent(updatedContent)
      
      if (success) {
        setContent(updatedContent)
        setLastSaved(new Date().toLocaleString())
        
        // Update all forms with new content
        heroForm.reset(updatedContent.hero)
        featuresForm.reset(updatedContent.features)
        problemForm.reset(updatedContent.problem)
      }
    } catch (error) {
      console.error('Failed to save content:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveAll = async () => {
    setIsSaving(true)
    
    try {
      const heroData = heroForm.getValues()
      const featuresData = featuresForm.getValues()
      const problemData = problemForm.getValues()
      
      const updatedContent: SiteContent = {
        hero: { ...heroData, videoUrl: heroData.videoUrl || "" },
        features: {
          ...featuresData,
          features: featuresData.features.map(f => ({ ...f, id: f.id || Date.now().toString() }))
        },
        problem: {
          ...problemData,
          problems: problemData.problems.map(p => ({ ...p, id: p.id || Date.now().toString() }))
        },
        lastUpdated: new Date().toISOString(),
      }
      
      const success = await saveContent(updatedContent)
      
      if (success) {
        setContent(updatedContent)
        setLastSaved(new Date().toLocaleString())
        
        // Update all forms with new content
        heroForm.reset(updatedContent.hero)
        featuresForm.reset(updatedContent.features)
        problemForm.reset(updatedContent.problem)
      }
    } catch (error) {
      console.error('Failed to save content:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const addFeature = () => {
    const currentFeatures = featuresForm.getValues("features")
    const newFeature: Feature = {
      id: Date.now().toString(),
      title: "New Feature",
      description: "Feature description here",
      icon: "Zap",
      enabled: true,
      order: currentFeatures.length + 1,
    }
    featuresForm.setValue("features", [...currentFeatures, newFeature])
  }

  const removeFeature = (id: string) => {
    const currentFeatures = featuresForm.getValues("features")
    featuresForm.setValue("features", currentFeatures.filter(f => f.id !== id))
  }

  const addProblem = () => {
    const currentProblems = problemForm.getValues("problems")
    const newProblem: ProblemPoint = {
      id: Date.now().toString(),
      title: "New Problem",
      description: "Problem description here",
      solution: "Solution description here",
      icon: "AlertCircle",
      enabled: true,
      order: currentProblems.length + 1,
    }
    problemForm.setValue("problems", [...currentProblems, newProblem])
  }

  const removeProblem = (id: string) => {
    const currentProblems = problemForm.getValues("problems")
    problemForm.setValue("problems", currentProblems.filter(p => p.id !== id))
  }

  const moveFeature = (index: number, direction: 'up' | 'down') => {
    const currentFeatures = featuresForm.getValues("features")
    const newFeatures = [...currentFeatures]
    
    if (direction === 'up' && index > 0) {
      ;[newFeatures[index - 1], newFeatures[index]] = [newFeatures[index], newFeatures[index - 1]]
    } else if (direction === 'down' && index < currentFeatures.length - 1) {
      ;[newFeatures[index], newFeatures[index + 1]] = [newFeatures[index + 1], newFeatures[index]]
    }
    
    featuresForm.setValue("features", newFeatures.map((f, i) => ({ ...f, order: i + 1 })))
  }

  const moveProblem = (index: number, direction: 'up' | 'down') => {
    const currentProblems = problemForm.getValues("problems")
    const newProblems = [...currentProblems]
    
    if (direction === 'up' && index > 0) {
      ;[newProblems[index - 1], newProblems[index]] = [newProblems[index], newProblems[index - 1]]
    } else if (direction === 'down' && index < currentProblems.length - 1) {
      ;[newProblems[index], newProblems[index + 1]] = [newProblems[index + 1], newProblems[index]]
    }
    
    problemForm.setValue("problems", newProblems.map((p, i) => ({ ...p, order: i + 1 })))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">
            Edit landing page sections and content.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {lastSaved && (
            <Badge variant="outline" className="text-xs">
              Last saved: {lastSaved}
            </Badge>
          )}
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {previewMode ? 'Edit Mode' : 'Preview'}
          </Button>
          <Button onClick={handleSaveAll} disabled={isSaving}>
            {isSaving ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save All
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hero Section</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">
              Main landing section
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Features</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.features.features.length}</div>
            <p className="text-xs text-muted-foreground">
              Total features
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Problems</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.problem.problems.length}</div>
            <p className="text-xs text-muted-foreground">
              Problem points
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(content.lastUpdated).toLocaleDateString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Content refresh
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Editor */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="problem">Problem Section</TabsTrigger>
        </TabsList>

        {/* Hero Section Editor */}
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hero Section</CardTitle>
                  <CardDescription>
                    Edit the main hero section content and appearance.
                  </CardDescription>
                </div>
                <Button onClick={() => handleSave('hero')} disabled={isSaving}>
                  {isSaving ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Hero
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero-title">Title</Label>
                    <Input
                      id="hero-title"
                      {...heroForm.register("title")}
                      placeholder="Nexus AI"
                    />
                    {heroForm.formState.errors.title && (
                      <p className="text-sm text-destructive">{heroForm.formState.errors.title.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-subtitle">Subtitle</Label>
                    <Input
                      id="hero-subtitle"
                      {...heroForm.register("subtitle")}
                      placeholder="Transform Your Business with AI"
                    />
                    {heroForm.formState.errors.subtitle && (
                      <p className="text-sm text-destructive">{heroForm.formState.errors.subtitle.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero-description">Description</Label>
                  <Textarea
                    id="hero-description"
                    {...heroForm.register("description")}
                    placeholder="Experience the future of artificial intelligence..."
                    rows={3}
                  />
                  {heroForm.formState.errors.description && (
                    <p className="text-sm text-destructive">{heroForm.formState.errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-button-text">Primary Button Text</Label>
                    <Input
                      id="primary-button-text"
                      {...heroForm.register("primaryButtonText")}
                      placeholder="Get Started Free"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primary-button-link">Primary Button Link</Label>
                    <Input
                      id="primary-button-link"
                      {...heroForm.register("primaryButtonLink")}
                      placeholder="/signup"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="secondary-button-text">Secondary Button Text</Label>
                    <Input
                      id="secondary-button-text"
                      {...heroForm.register("secondaryButtonText")}
                      placeholder="Watch Demo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-button-link">Secondary Button Link</Label>
                    <Input
                      id="secondary-button-link"
                      {...heroForm.register("secondaryButtonLink")}
                      placeholder="/demo"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="background-image">Background Image URL</Label>
                    <Input
                      id="background-image"
                      {...heroForm.register("backgroundImage")}
                      placeholder="/hero-bg.jpg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-url">Video URL (if enabled)</Label>
                    <Input
                      id="video-url"
                      {...heroForm.register("videoUrl")}
                      placeholder="https://www.youtube.com/embed/..."
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-video"
                    checked={heroForm.watch("showVideo")}
                    onCheckedChange={(checked) => heroForm.setValue("showVideo", checked)}
                  />
                  <Label htmlFor="show-video">Show Video Background</Label>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Section Editor */}
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Features Section</CardTitle>
                  <CardDescription>
                    Manage features section content and feature items.
                  </CardDescription>
                </div>
                <Button onClick={() => handleSave('features')} disabled={isSaving}>
                  {isSaving ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Features
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="features-title">Title</Label>
                    <Input
                      id="features-title"
                      {...featuresForm.register("title")}
                      placeholder="Powerful Features"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="features-subtitle">Subtitle</Label>
                    <Input
                      id="features-subtitle"
                      {...featuresForm.register("subtitle")}
                      placeholder="Everything you need to succeed"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features-description">Description</Label>
                  <Textarea
                    id="features-description"
                    {...featuresForm.register("description")}
                    placeholder="Our comprehensive suite of AI-powered tools..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-grid"
                      checked={featuresForm.watch("showGrid")}
                      onCheckedChange={(checked) => featuresForm.setValue("showGrid", checked)}
                    />
                    <Label htmlFor="show-grid">Show Grid Layout</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="columns">Grid Columns</Label>
                    <Input
                      id="columns"
                      type="number"
                      {...featuresForm.register("columns", { valueAsNumber: true })}
                      min="1"
                      max="4"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Features</Label>
                    <Button type="button" variant="outline" onClick={addFeature}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {featuresForm.watch("features").map((feature, index) => (
                      <Card key={feature.id} className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Order {feature.order}</Badge>
                            <div className="flex items-center gap-1">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => moveFeature(index, 'up')}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-3 w-3" />
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => moveFeature(index, 'down')}
                                disabled={index === featuresForm.watch("features").length - 1}
                              >
                                <ArrowDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={feature.enabled}
                              onCheckedChange={(checked) => {
                                const currentFeatures = featuresForm.getValues("features")
                                currentFeatures[index].enabled = checked
                                featuresForm.setValue("features", currentFeatures)
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeFeature(feature.id || '')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Feature Title</Label>
                            <Input
                              value={feature.title}
                              onChange={(e) => {
                                const currentFeatures = featuresForm.getValues("features")
                                currentFeatures[index].title = e.target.value
                                featuresForm.setValue("features", currentFeatures)
                              }}
                              placeholder="Feature title"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Icon Name</Label>
                            <Input
                              value={feature.icon}
                              onChange={(e) => {
                                const currentFeatures = featuresForm.getValues("features")
                                currentFeatures[index].icon = e.target.value
                                featuresForm.setValue("features", currentFeatures)
                              }}
                              placeholder="Zap"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={feature.description}
                            onChange={(e) => {
                              const currentFeatures = featuresForm.getValues("features")
                              currentFeatures[index].description = e.target.value
                              featuresForm.setValue("features", currentFeatures)
                            }}
                            placeholder="Feature description..."
                            rows={2}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Problem Section Editor */}
        <TabsContent value="problem" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Problem Section</CardTitle>
                  <CardDescription>
                    Edit problem section content and problem points.
                  </CardDescription>
                </div>
                <Button onClick={() => handleSave('problem')} disabled={isSaving}>
                  {isSaving ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Problem
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="problem-title">Title</Label>
                    <Input
                      id="problem-title"
                      {...problemForm.register("title")}
                      placeholder="Solve Real Problems"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="problem-subtitle">Subtitle</Label>
                    <Input
                      id="problem-subtitle"
                      {...problemForm.register("subtitle")}
                      placeholder="Address your biggest challenges"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="problem-description">Description</Label>
                  <Textarea
                    id="problem-description"
                    {...problemForm.register("description")}
                    placeholder="Our platform tackles the most pressing issues..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-solution"
                    checked={problemForm.watch("showSolution")}
                    onCheckedChange={(checked) => problemForm.setValue("showSolution", checked)}
                  />
                  <Label htmlFor="show-solution">Show Solutions</Label>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Problem Points</Label>
                    <Button type="button" variant="outline" onClick={addProblem}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Problem
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {problemForm.watch("problems").map((problem, index) => (
                      <Card key={problem.id} className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Order {problem.order}</Badge>
                            <div className="flex items-center gap-1">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => moveProblem(index, 'up')}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-3 w-3" />
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => moveProblem(index, 'down')}
                                disabled={index === problemForm.watch("problems").length - 1}
                              >
                                <ArrowDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={problem.enabled}
                              onCheckedChange={(checked) => {
                                const currentProblems = problemForm.getValues("problems")
                                currentProblems[index].enabled = checked
                                problemForm.setValue("problems", currentProblems)
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeProblem(problem.id || '')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Problem Title</Label>
                            <Input
                              value={problem.title}
                              onChange={(e) => {
                                const currentProblems = problemForm.getValues("problems")
                                currentProblems[index].title = e.target.value
                                problemForm.setValue("problems", currentProblems)
                              }}
                              placeholder="Problem title"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Icon Name</Label>
                            <Input
                              value={problem.icon}
                              onChange={(e) => {
                                const currentProblems = problemForm.getValues("problems")
                                currentProblems[index].icon = e.target.value
                                problemForm.setValue("problems", currentProblems)
                              }}
                              placeholder="AlertCircle"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Problem Description</Label>
                          <Textarea
                            value={problem.description}
                            onChange={(e) => {
                              const currentProblems = problemForm.getValues("problems")
                              currentProblems[index].description = e.target.value
                              problemForm.setValue("problems", currentProblems)
                            }}
                            placeholder="Problem description..."
                            rows={2}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Solution</Label>
                          <Textarea
                            value={problem.solution}
                            onChange={(e) => {
                              const currentProblems = problemForm.getValues("problems")
                              currentProblems[index].solution = e.target.value
                              problemForm.setValue("problems", currentProblems)
                            }}
                            placeholder="Solution description..."
                            rows={2}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
