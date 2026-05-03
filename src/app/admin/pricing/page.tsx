'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
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
  Edit, 
  Save, 
  Eye, 
  Star,
  Check,
  X,
  DollarSign,
  Users,
  Zap,
  Shield,
  Crown,
  ArrowRight,
  Settings,
  Plus
} from 'lucide-react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Define Pricing Plan type
type PricingPlan = {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  currency: string
  features: string[]
  recommended: boolean
  popular: boolean
  color: string
  buttonText: string
  buttonVariant: 'default' | 'outline' | 'secondary'
}

// Zod schema for pricing plan validation
const pricingPlanSchema = z.object({
  name: z.string().min(2, "Plan name must be at least 2 characters").max(50, "Plan name must be less than 50 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(200, "Description must be less than 200 characters"),
  monthlyPrice: z.number().min(0, "Monthly price must be a positive number"),
  yearlyPrice: z.number().min(0, "Yearly price must be a positive number"),
  currency: z.string().min(1, "Currency is required").max(3, "Currency must be 1-3 characters"),
  features: z.array(z.string().min(1, "Feature cannot be empty")).min(1, "At least one feature is required"),
  recommended: z.boolean(),
  popular: z.boolean(),
  color: z.string().min(1, "Color is required"),
  buttonText: z.string().min(2, "Button text must be at least 2 characters").max(30, "Button text must be less than 30 characters"),
  buttonVariant: z.enum(['default', 'outline', 'secondary']),
})

type PricingPlanFormValues = z.infer<typeof pricingPlanSchema>

// Pricing Card Component for Preview
function PricingCard({ plan, isYearly }: { plan: PricingPlan; isYearly: boolean }) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
  const savings = plan.monthlyPrice > 0 ? Math.round(((plan.monthlyPrice * 12 - plan.yearlyPrice) / (plan.monthlyPrice * 12)) * 100) : 0

  return (
    <Card className={`relative ${plan.recommended ? 'border-primary shadow-lg scale-105' : ''} ${plan.popular ? 'ring-2 ring-primary/20' : ''}`}>
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-3 py-1">
            <Star className="w-3 h-3 mr-1" />
            Recommended
          </Badge>
        </div>
      )}
      {plan.popular && (
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="text-xs">
            Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center mb-2">
          {plan.name === 'Basic' && <Users className="w-8 h-8 text-blue-500" />}
          {plan.name === 'Pro' && <Zap className="w-8 h-8 text-purple-500" />}
          {plan.name === 'Enterprise' && <Crown className="w-8 h-8 text-yellow-500" />}
          {plan.name !== 'Basic' && plan.name !== 'Pro' && plan.name !== 'Enterprise' && <Shield className="w-8 h-8 text-green-500" />}
        </div>
        <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
        <CardDescription className="text-sm">{plan.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center">
            <span className="text-3xl font-bold">{plan.currency}{price}</span>
            <span className="text-muted-foreground ml-1">/{isYearly ? 'year' : 'month'}</span>
          </div>
          {isYearly && savings > 0 && (
            <p className="text-xs text-green-600 mt-1">Save {savings}% with yearly billing</p>
          )}
        </div>
        
        <div className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button 
          className={`w-full ${plan.recommended ? 'bg-primary' : ''}`}
          variant={plan.buttonVariant}
        >
          {plan.buttonText}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default function PricingPage() {
  // Mock data for pricing plans
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([
    {
      id: '1',
      name: 'Basic',
      description: 'Perfect for individuals and small teams getting started',
      monthlyPrice: 29,
      yearlyPrice: 290,
      currency: '$',
      features: [
        'Up to 5 users',
        '10 GB storage',
        'Basic support',
        'Core features',
        'Mobile app access',
        'Email integration'
      ],
      recommended: false,
      popular: false,
      color: 'blue',
      buttonText: 'Get Started',
      buttonVariant: 'outline',
    },
    {
      id: '2',
      name: 'Pro',
      description: 'Ideal for growing teams and businesses',
      monthlyPrice: 99,
      yearlyPrice: 950,
      currency: '$',
      features: [
        'Up to 20 users',
        '100 GB storage',
        'Priority support',
        'Advanced features',
        'Mobile app access',
        'Email integration',
        'API access',
        'Custom integrations',
        'Advanced analytics'
      ],
      recommended: true,
      popular: true,
      color: 'purple',
      buttonText: 'Start Free Trial',
      buttonVariant: 'default',
    },
    {
      id: '3',
      name: 'Enterprise',
      description: 'Complete solution for large organizations',
      monthlyPrice: 299,
      yearlyPrice: 2890,
      currency: '$',
      features: [
        'Unlimited users',
        'Unlimited storage',
        '24/7 dedicated support',
        'All features included',
        'Mobile app access',
        'Email integration',
        'Advanced API access',
        'Custom integrations',
        'Advanced analytics',
        'Custom branding',
        'SLA guarantee',
        'Dedicated account manager'
      ],
      recommended: false,
      popular: false,
      color: 'yellow',
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary',
    },
  ])

  const [isYearly, setIsYearly] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null)
  const [previewMode, setPreviewMode] = useState(false)

  const form = useForm<PricingPlanFormValues>({
    resolver: zodResolver(pricingPlanSchema),
    defaultValues: {
      name: "",
      description: "",
      monthlyPrice: 0,
      yearlyPrice: 0,
      currency: "$",
      features: [""],
      recommended: false,
      popular: false,
      color: "blue",
      buttonText: "Get Started",
      buttonVariant: "outline",
    },
  })

  const onSubmit = (data: PricingPlanFormValues) => {
    if (editingPlan) {
      // Edit existing plan
      setPricingPlans(prev => 
        prev.map(plan => 
          plan.id === editingPlan.id 
            ? { ...plan, ...data }
            : plan
        )
      )
      setEditingPlan(null)
    } else {
      // Add new plan
      const newPlan: PricingPlan = {
        id: Date.now().toString(),
        ...data,
      }
      setPricingPlans(prev => [...prev, newPlan])
    }
    
    form.reset()
    setIsEditDialogOpen(false)
  }

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan)
    form.reset({
      name: plan.name,
      description: plan.description,
      monthlyPrice: plan.monthlyPrice,
      yearlyPrice: plan.yearlyPrice,
      currency: plan.currency,
      features: plan.features,
      recommended: plan.recommended,
      popular: plan.popular,
      color: plan.color,
      buttonText: plan.buttonText,
      buttonVariant: plan.buttonVariant,
    })
    setIsEditDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setPricingPlans(prev => prev.filter(plan => plan.id !== id))
  }

  const toggleRecommended = (id: string) => {
    setPricingPlans(prev => 
      prev.map(plan => ({
        ...plan,
        recommended: plan.id === id ? !plan.recommended : false
      }))
    )
  }

  const togglePopular = (id: string) => {
    setPricingPlans(prev => 
      prev.map(plan => 
        plan.id === id ? { ...plan, popular: !plan.popular } : plan
      )
    )
  }

  const addFeature = () => {
    const currentFeatures = form.getValues("features")
    form.setValue("features", [...currentFeatures, ""])
  }

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features")
    form.setValue("features", currentFeatures.filter((_, i) => i !== index))
  }

  const updateFeature = (index: number, value: string) => {
    const currentFeatures = form.getValues("features")
    currentFeatures[index] = value
    form.setValue("features", currentFeatures)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pricing Management</h1>
          <p className="text-muted-foreground">
            Manage pricing tiers, features, and billing options.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="yearly-toggle">Monthly</Label>
            <Switch
              id="yearly-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="yearly-toggle">Yearly</Label>
          </div>
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {previewMode ? 'Edit Mode' : 'Preview'}
          </Button>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingPlan(null)
                form.reset()
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPlan ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
                </DialogTitle>
                <DialogDescription>
                  {editingPlan ? 'Update the pricing plan details.' : 'Add a new pricing plan to your offering.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Plan Name</Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      placeholder="Basic"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input
                      id="currency"
                      {...form.register("currency")}
                      placeholder="$"
                      maxLength={3}
                    />
                    {form.formState.errors.currency && (
                      <p className="text-sm text-destructive">{form.formState.errors.currency.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...form.register("description")}
                    placeholder="Perfect for individuals and small teams..."
                    rows={2}
                  />
                  {form.formState.errors.description && (
                    <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyPrice">Monthly Price</Label>
                    <Input
                      id="monthlyPrice"
                      type="number"
                      {...form.register("monthlyPrice", { valueAsNumber: true })}
                      placeholder="29"
                    />
                    {form.formState.errors.monthlyPrice && (
                      <p className="text-sm text-destructive">{form.formState.errors.monthlyPrice.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearlyPrice">Yearly Price</Label>
                    <Input
                      id="yearlyPrice"
                      type="number"
                      {...form.register("yearlyPrice", { valueAsNumber: true })}
                      placeholder="290"
                    />
                    {form.formState.errors.yearlyPrice && (
                      <p className="text-sm text-destructive">{form.formState.errors.yearlyPrice.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="space-y-2">
                    {form.watch("features").map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          placeholder="Enter feature..."
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeature(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addFeature}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>
                  {form.formState.errors.features && (
                    <p className="text-sm text-destructive">{form.formState.errors.features.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="buttonText">Button Text</Label>
                    <Input
                      id="buttonText"
                      {...form.register("buttonText")}
                      placeholder="Get Started"
                    />
                    {form.formState.errors.buttonText && (
                      <p className="text-sm text-destructive">{form.formState.errors.buttonText.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Theme Color</Label>
                    <select
                      id="color"
                      {...form.register("color")}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="blue">Blue</option>
                      <option value="purple">Purple</option>
                      <option value="yellow">Yellow</option>
                      <option value="green">Green</option>
                      <option value="red">Red</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="recommended"
                      checked={form.watch("recommended")}
                      onCheckedChange={(checked) => form.setValue("recommended", checked)}
                    />
                    <Label htmlFor="recommended">Recommended Plan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="popular"
                      checked={form.watch("popular")}
                      onCheckedChange={(checked) => form.setValue("popular", checked)}
                    />
                    <Label htmlFor="popular">Popular Plan</Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    {editingPlan ? 'Update' : 'Add'} Plan
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
            <CardTitle className="text-sm font-medium">Total Plans</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pricingPlans.length}</div>
            <p className="text-xs text-muted-foreground">
              Active pricing tiers
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recommended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pricingPlans.filter(plan => plan.recommended).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Highlighted plans
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Popular</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pricingPlans.filter(plan => plan.popular).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Trending plans
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(pricingPlans.reduce((sum, plan) => sum + (isYearly ? plan.yearlyPrice : plan.monthlyPrice), 0) / pricingPlans.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per {isYearly ? 'year' : 'month'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Content */}
      {previewMode ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pricing Preview</CardTitle>
                <CardDescription>
                  This is how your pricing will appear to customers.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pricing Plans</CardTitle>
                <CardDescription>
                  Manage your pricing tiers and features.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pricingPlans.map((plan) => (
                <Card key={plan.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{plan.name}</h3>
                        {plan.recommended && <Badge className="bg-primary">Recommended</Badge>}
                        {plan.popular && <Badge variant="outline">Popular</Badge>}
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{plan.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-medium">{plan.currency}{plan.monthlyPrice}/month</span>
                        <span className="font-medium">{plan.currency}{plan.yearlyPrice}/year</span>
                        <span className="text-muted-foreground">{plan.features.length} features</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleRecommended(plan.id)}
                      >
                        <Star className="h-4 w-4 mr-1" />
                        {plan.recommended ? 'Unrecommend' : 'Recommend'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePopular(plan.id)}
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        {plan.popular ? 'Unpopular' : 'Popular'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(plan)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(plan.id)}
                        className="text-destructive"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
