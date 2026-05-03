import { useToast } from './use-toast'

export interface AdminToastOptions {
  title?: string
  description?: string
  action?: any
}

export function useAdminToast() {
  const { toast } = useToast()

  const showSuccess = (options: AdminToastOptions) => {
    return toast({
      title: options.title || 'Success',
      description: options.description,
      variant: 'default',
      action: options.action,
    })
  }

  const showError = (options: AdminToastOptions) => {
    return toast({
      title: options.title || 'Error',
      description: options.description,
      variant: 'destructive',
      action: options.action,
    })
  }

  const showWarning = (options: AdminToastOptions) => {
    return toast({
      title: options.title || 'Warning',
      description: options.description,
      variant: 'default',
      action: options.action,
    })
  }

  const showInfo = (options: AdminToastOptions) => {
    return toast({
      title: options.title || 'Info',
      description: options.description,
      variant: 'default',
      action: options.action,
    })
  }

  // CRUD operation helpers
  const createSuccess = (entity: string, name?: string) => {
    return showSuccess({
      title: `${entity} Created`,
      description: name ? `${name} has been created successfully.` : `New ${entity.toLowerCase()} has been created successfully.`,
    })
  }

  const updateSuccess = (entity: string, name?: string) => {
    return showSuccess({
      title: `${entity} Updated`,
      description: name ? `${name} has been updated successfully.` : `${entity} has been updated successfully.`,
    })
  }

  const deleteSuccess = (entity: string, name?: string) => {
    return showSuccess({
      title: `${entity} Deleted`,
      description: name ? `${name} has been deleted successfully.` : `${entity} has been deleted successfully.`,
    })
  }

  const createError = (entity: string, error?: string) => {
    return showError({
      title: `Failed to Create ${entity}`,
      description: error || `There was an error creating the ${entity.toLowerCase()}. Please try again.`,
    })
  }

  const updateError = (entity: string, error?: string) => {
    return showError({
      title: `Failed to Update ${entity}`,
      description: error || `There was an error updating the ${entity.toLowerCase()}. Please try again.`,
    })
  }

  const deleteError = (entity: string, error?: string) => {
    return showError({
      title: `Failed to Delete ${entity}`,
      description: error || `There was an error deleting the ${entity.toLowerCase()}. Please try again.`,
    })
  }

  const saveSuccess = (entity: string) => {
    return showSuccess({
      title: `${entity} Saved`,
      description: `Your changes have been saved successfully.`,
    })
  }

  const saveError = (entity: string, error?: string) => {
    return showError({
      title: `Failed to Save ${entity}`,
      description: error || `There was an error saving your changes. Please try again.`,
    })
  }

  const networkError = (action?: string) => {
    return showError({
      title: 'Network Error',
      description: `Unable to connect to the server${action ? ` while ${action}` : ''}. Please check your internet connection and try again.`,
    })
  }

  const unauthorized = () => {
    return showError({
      title: 'Access Denied',
      description: 'You do not have permission to perform this action.',
    })
  }

  const validationError = (field?: string) => {
    return showWarning({
      title: 'Validation Error',
      description: field ? `Please check the ${field} field.` : 'Please check all required fields.',
    })
  }

  return {
    // Basic toast methods
    showSuccess,
    showError,
    showWarning,
    showInfo,
    
    // CRUD operation helpers
    createSuccess,
    updateSuccess,
    deleteSuccess,
    createError,
    updateError,
    deleteError,
    saveSuccess,
    saveError,
    networkError,
    unauthorized,
    validationError,
    
    // Direct toast access
    toast,
  }
}
