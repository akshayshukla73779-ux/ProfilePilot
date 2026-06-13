'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [linkedinProfile, setLinkedinProfile] = useState<any>(null)
  const [showProfilePreview, setShowProfilePreview] = useState(false)

  const loadingMessages = [
    "Fetching LinkedIn profile...",
    "Preparing profile data...",
    "Analyzing profile...",
    "Generating recommendations...",
    "This usually takes less than 1 Minute",
    "We are unlocking you potentials...",
    "Get Ready to see what Employers are Looking For...",
    "Finalizing report..."
  ]

  const acceptedFormats = ['image/png', 'image/jpeg', 'image/webp']
  const acceptedExtensions = '.png,.jpg,.jpeg,.webp'

  const validateFile = (file: File): boolean => {
    if (!acceptedFormats.includes(file.type)) {
      alert('Please upload only PNG, JPG, JPEG, or WEBP images.')
      return false
    }
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      alert('File size exceeds 10MB limit.')
      return false
    }
    return true
  }

  const generatePreview = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleFileChange = async (files: FileList) => {
    const newFiles: File[] = []
    const newPreviews: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (validateFile(file)) {
        newFiles.push(file)
        const preview = await generatePreview(file)
        newPreviews.push(preview)
      }
    }

    setSelectedFiles([...selectedFiles, ...newFiles])
    setPreviews([...previews, ...newPreviews])
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files) {
      handleFileChange(e.dataTransfer.files)
    }
  }

  const handleFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      handleFileChange(e.currentTarget.files)
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index))
    setPreviews(previews.filter((_, i) => i !== index))
  }

  const handleAnalyze = async () => {
    if (selectedFiles.length === 0) return

    setIsLoading(true)
    setLoadingMessage('Uploading screenshots...')
    setErrorMessage(null)

    try {
      const formData = new FormData()
      selectedFiles.forEach((file, index) => {
        formData.append(`images`, file)
      })

      const messageInterval = setInterval(() => {
        const currentIndex = loadingMessages.indexOf(loadingMessage)
        if (currentIndex < loadingMessages.length - 1) {
          setLoadingMessage(loadingMessages[currentIndex + 1])
        }
      }, 1500)

      const response = await fetch('/api/profile-analyze', {
        method: 'POST',
        body: formData,
      })

      clearInterval(messageInterval)

      if (!response.ok) {
        let errorText = 'Unknown error'
        try {
          const errorData = await response.json()
          errorText = errorData.error || `HTTP ${response.status}: ${response.statusText}`
        } catch {
          errorText = await response.text()
        }
        
        setErrorMessage(errorText)
        setIsLoading(false)
        return
      }
      const analysisData = await response.json()

      sessionStorage.setItem(
        'analysisResults',
        JSON.stringify(analysisData)
      )

      router.push('/results')

      } catch (error) {
        const errorMsg =
          error instanceof Error
            ? error.message
            : String(error)

        setErrorMessage(`Network/Client Error: ${errorMsg}`)
        setIsLoading(false)
      }
      }
      
  const handleLinkedinAnalyze = async () => {

    if (!linkedinUrl) {
      alert("Please enter a LinkedIn URL")
      return
    }

    setIsLoading(true)
    setLoadingMessage("Fetching LinkedIn profile...")
    let messageIndex = 0

    const messageInterval = setInterval(() => {
      messageIndex++

      if (messageIndex < loadingMessages.length) {
        setLoadingMessage(loadingMessages[messageIndex])
      }
    }, 800)
    setErrorMessage(null)

    try {

      // Fetch LinkedIn profile
      const linkedinResponse = await fetch("/api/fetch-linkedin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          linkedinUrl,
        }),
      })
  
      const linkedinData = await linkedinResponse.json()
      console.log(linkedinData)
      console.log(linkedinData.data)
      console.log("avatar =", linkedinData.avatar)
      console.log("profile_picture =", linkedinData.profile_picture)
      console.log("image =", linkedinData.image)
      console.log("linkedinData =", linkedinData)
      console.log("linkedinData.data =", linkedinData.data)
      console.log(
        "LinkedIn response:",
        JSON.stringify(linkedinData, null, 2)
      )
      setLinkedinProfile(linkedinData)
      setShowProfilePreview(true)

      setIsLoading(false)

      return
  

      // Send to OpenAI
      setLoadingMessage("Analyzing profile...")

      const analysisResponse = await fetch("/api/profile-analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          linkedinData,
        }),
      })

      if (!analysisResponse.ok) {
        const errorData = await analysisResponse.json()

        setErrorMessage(errorData.error || "Analysis failed")
        setIsLoading(false)

        return
      }

      const analysisData = await analysisResponse.json()
      clearInterval(messageInterval)

      sessionStorage.setItem(
        "analysisResults",
        JSON.stringify(analysisData)
      )

      router.push("/results")

    } catch (error) {
      clearInterval(messageInterval)
      const errorMsg =
        error instanceof Error
          ? error.message
          : String(error)

      setErrorMessage(errorMsg)
      setIsLoading(false)
    }
  }
  const handleProfileAnalysis = async () => {

    setIsLoading(true)
    setLoadingMessage("Analyzing profile...")
    let messageIndex = 0

    const messageInterval = setInterval(() => {
      messageIndex++

      if (messageIndex < loadingMessages.length) {
        setLoadingMessage(loadingMessages[messageIndex])
      }
    }, 800)

    try {

      const response = await fetch("/api/profile-analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          linkedinData: linkedinProfile,
        }),
      })

      const analysisData = await response.json()

      clearInterval(messageInterval)

      sessionStorage.setItem(
        "analysisResults",
        JSON.stringify(analysisData)
      )

      router.push("/results")

    } catch (error) {

      clearInterval(messageInterval)

      const errorMsg =
        error instanceof Error
          ? error.message
          : String(error)

      setErrorMessage(errorMsg)
      setIsLoading(false)

    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Upload className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {loadingMessage}
              </h2>
              <div className="w-48 h-1 bg-border rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-accent animate-pulse" style={{ width: '33%' }} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Upload LinkedIn Screenshots
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload screenshots of your LinkedIn profile sections to receive an AI-powered score.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-500 text-sm font-mono whitespace-pre-wrap break-words">
                {errorMessage}
              </p>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-xs text-red-400 hover:text-red-300 mt-2"
              >
                Dismiss
              </button>
            </div>
          )}
          {/* LinkedIn URL Card */}

            <div className="border border-border rounded-2xl p-8 bg-card mb-8">

              <h2 className="text-xl font-semibold text-foreground mb-4">
                Analyze Using LinkedIn URL
              </h2>

              <input
                type="text"
                placeholder="https://linkedin.com/in/your-profile"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full p-4 rounded-xl border border-border bg-background text-foreground mb-6"
              />

              <Button
                onClick={handleLinkedinAnalyze}
                className="w-full h-12 bg-primary text-primary-foreground"
              >
                Analyze LinkedIn URL
              </Button>

            </div>
            {showProfilePreview && linkedinProfile && (

              <div className="border border-border rounded-2xl p-8 bg-card mb-8">

                <div className="flex items-start gap-6">

                  <img
                    src={linkedinProfile.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border border-border object-cover"
                  />

                  <div className="flex-1">

                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {linkedinProfile.name}
                    </h2>

                    <p className="text-muted-foreground mb-2">
                      {linkedinProfile.position}
                    </p>

                    <p className="text-sm text-muted-foreground mb-4">
                      {linkedinProfile.city}
                    </p>

                    <div className="flex gap-6 text-sm text-muted-foreground mb-6">
                      <span>
                        Followers: {linkedinProfile.followers}
                      </span>

                      <span>
                        Connections: {linkedinProfile.connections}
                      </span>
                    </div>

                    <Button
                      onClick={handleProfileAnalysis}
                      className="bg-accent text-accent-foreground"
                    >
                      Analyze Profile
                    </Button>

                  </div>

                </div>

              </div>

            )}
          {/* Upload Card */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-12 transition-all text-center cursor-pointer mb-8 ${
              dragActive
                ? 'border-accent bg-accent/5 scale-105'
                : 'border-border bg-card hover:border-accent/50 hover:bg-card/50'
            }`}
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-accent" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Drag and drop images here
                </h2>
                <p className="text-muted-foreground mb-6">
                  Or click below to browse your computer
                </p>
              </div>

              <Button
                onClick={handleFileInput}
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base font-semibold"
              >
                Choose Files
              </Button>

              <p className="text-sm text-muted-foreground">
                Supported formats: PNG, JPG, JPEG, WEBP (Max 10MB each)
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedExtensions}
                multiple
                onChange={handleInputChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Image Previews */}
          {selectedFiles.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Uploaded Images ({selectedFiles.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="border border-border rounded-lg overflow-hidden bg-card aspect-square">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <button
                        onClick={() => removeFile(index)}
                        className="p-2 bg-destructive rounded-lg hover:bg-destructive/90 transition-colors"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground truncate">
                        {selectedFiles[index].name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFiles[index].size)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          {selectedFiles.length > 0 && (
            <Button
              onClick={handleAnalyze}
              className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold mb-8"
            >
              Analyze Profile ({selectedFiles.length} images)
            </Button>
          )}

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="p-6 border border-border rounded-lg bg-card/50">
              <div className="text-sm text-accent font-semibold mb-2">STEP 1</div>
              <p className="text-sm text-foreground">Upload screenshots</p>
            </div>
            <div className="p-6 border border-border rounded-lg bg-card/50">
              <div className="text-sm text-accent font-semibold mb-2">STEP 2</div>
              <p className="text-sm text-foreground">AI analyzes profile</p>
            </div>
            <div className="p-6 border border-border rounded-lg bg-card/50">
              <div className="text-sm text-accent font-semibold mb-2">STEP 3</div>
              <p className="text-sm text-foreground">Get your score</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
