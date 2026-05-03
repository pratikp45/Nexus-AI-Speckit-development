'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

const keywords = [
  'AI-powered',
  'productivity',
  'automation',
  'intelligence',
  'efficiency',
  'innovation'
]

export function Hero() {
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const interval = setInterval(() => {
      setCurrentKeywordIndex((prev) => (prev + 1) % keywords.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" as any }
    }
  }

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, delay: 0.2 }
    }
  }

  const keywordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.3 }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.4 }
    }
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px] opacity-10"></div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={textVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-cyan-300 bg-cyan-900/30 border border-cyan-500/30 rounded-full backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span>Powered by Advanced AI</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-6">
            <span className="block">Transform your workflow with</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 bg-gradient-to-r">
              <motion.span
                key={currentKeywordIndex}
                variants={keywordVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {keywords[currentKeywordIndex]}
              </motion.span>
            </span>
            <span className="block">solutions</span>
          </h1>

          {/* Subheading */}
          <motion.p
            variants={textVariants}
            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Nexus AI revolutionizes how teams collaborate and work. Our intelligent platform combines cutting-edge AI technology with intuitive design to automate repetitive tasks, enhance productivity, and deliver insights that drive business growth. Experience the future of work today.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={buttonVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="group border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-cyan-500/15 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ rotate: [0, 15, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    <Play className="h-5 w-5" />
                  </motion.div>
                  Watch Demo
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-center text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Setup in minutes</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full opacity-60 blur-sm"
      />
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-32 right-20 w-3 h-3 bg-purple-400 rounded-full opacity-60 blur-sm"
      />
      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [0, 8, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-40 left-32 w-5 h-5 bg-pink-400 rounded-full opacity-50 blur-sm"
      />
    </motion.section>
  )
}
