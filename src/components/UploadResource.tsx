import { useState } from 'react'
import { Upload, FileText, Image, Tag, Zap, Check, X, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Progress } from './ui/progress'
import { Alert, AlertDescription } from './ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface UploadResourceProps {
  setCurrentPage: (page: string) => void
}

const categories = [
  { value: 'mcp', label: 'MCP 连接器' },
  { value: 'prompt', label: '提示词' },
  { value: 'dify', label: 'Dify 应用' },
]

const suggestedTags = [
  'AI', '自动化', '数据分析', '客服', '营销', '代码审查',
  '工作流', '企业级', '开发工具', '创意设计', '机器学习', '自然语言处理'
]

export function UploadResource({ setCurrentPage }: UploadResourceProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [] as string[],
    version: '1.0.0',
    file: null as File | null,
    icon: null as File | null
  })

  const [aiSuggestions, setAiSuggestions] = useState({
    title: 'AI 智能助手工具包',
    description: '基于先进的 AI 技术，提供智能对话、文本分析和自动化处理功能的综合工具包。',
    category: 'mcp',
    tags: ['AI', '智能助手', '自动化', '文本分析'],
    icon: '🤖'
  })

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
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, file: files[0] }))
      // 模拟 AI 分析文件
      simulateAIAnalysis()
    }
  }

  const simulateAIAnalysis = () => {
    setIsUploading(true)
    setUploadProgress(0)
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setCurrentStep(2)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, file }))
      simulateAIAnalysis()
    }
  }

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const applySuggestion = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // 提交逻辑
    setCurrentStep(4)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2">上传资源</h1>
            <p className="text-muted-foreground">分享您的 AI 工具和模板，与社区一起成长</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full border-2 
                      ${currentStep >= step 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'border-muted-foreground text-muted-foreground'
                      }
                    `}>
                      {currentStep > step ? <Check className="h-4 w-4" /> : step}
                    </div>
                    <div className="mt-2 text-xs text-center whitespace-nowrap">
                      {step === 1 && '上传文件'}
                      {step === 2 && '资源基本信息'}
                      {step === 3 && '资源附属信息'}
                      {step === 4 && '完成提交'}
                    </div>
                  </div>
                  {step < 4 && (
                    <div className="flex items-center justify-center mx-2" style={{height: '28px', marginTop: '-20px'}}>
                      <span className={`text-lg ${currentStep > step ? 'text-primary' : 'text-muted-foreground'}`}>
                        →
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <CardContent className="p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl mb-2">上传文件</h2>
                    <p className="text-muted-foreground">支持 .zip, .json, .yaml 格式</p>
                  </div>

                  <div
                    className={`
                      border-2 border-dashed rounded-lg p-12 text-center transition-colors
                      ${dragActive 
                        ? 'border-primary bg-primary/5' 
                        : formData.file 
                          ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                          : 'border-muted-foreground hover:border-primary'
                      }
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {formData.file ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center">
                          <FileText className="h-12 w-12 text-green-500" />
                        </div>
                        <div>
                          <p className="text-lg">{formData.file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                        >
                          重新选择
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center">
                          <Upload className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-lg">拖拽文件到此处或点击上传</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            最大文件大小: 10MB
                          </p>
                        </div>
                        <Button asChild>
                          <label className="cursor-pointer">
                            选择文件
                            <input
                              type="file"
                              className="hidden"
                              accept=".zip,.json,.yaml,.yml"
                              onChange={handleFileUpload}
                            />
                          </label>
                        </Button>
                      </div>
                    )}
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">AI 正在分析文件...</span>
                        <span className="text-sm">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl mb-2">AI 智能建议</h2>
                    <p className="text-muted-foreground">基于文件内容生成的建议信息</p>
                  </div>

                  <Alert>
                    <Zap className="h-4 w-4" />
                    <AlertDescription>
                      AI 已分析您的文件，以下是智能生成的建议信息，您可以直接使用或进行修改。
                    </AlertDescription>
                  </Alert>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center">
                          <Zap className="h-4 w-4 mr-2" />
                          AI 建议
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm text-muted-foreground">标题</label>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm">{aiSuggestions.title}</p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => applySuggestion('title', aiSuggestions.title)}
                            >
                              采用
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm text-muted-foreground">描述</label>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm line-clamp-3 flex-1 mr-2">{aiSuggestions.description}</p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => applySuggestion('description', aiSuggestions.description)}
                            >
                              采用
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm text-muted-foreground">分类</label>
                          <div className="flex items-center justify-between mt-1">
                            <Badge>{categories.find(c => c.value === aiSuggestions.category)?.label}</Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => applySuggestion('category', aiSuggestions.category)}
                            >
                              采用
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm text-muted-foreground">建议标签</label>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex flex-wrap gap-1 flex-1 mr-2">
                              {aiSuggestions.tags.map((tag) => (
                                <Badge key={tag} variant="outline">{tag}</Badge>
                              ))}
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => applySuggestion('tags', aiSuggestions.tags)}
                            >
                              采用
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm">资源标题 *</label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="输入资源标题"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm">资源描述 *</label>
                        <Textarea
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="详细描述您的资源功能和用途"
                          className="mt-1"
                          rows={4}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm">分类 *</label>
                        <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="选择分类" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      上一步
                    </Button>
                    <Button onClick={() => setCurrentStep(3)}>
                      下一步
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl mb-2">完善信息</h2>
                    <p className="text-muted-foreground">添加标签和其他详细信息</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm">版本号</label>
                        <Input
                          value={formData.version}
                          onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                          placeholder="1.0.0"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm">资源图标</label>
                      <div className="mt-1 border-2 border-dashed border-muted-foreground rounded-lg p-6 text-center">
                        <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">上传图标 (可选)</p>
                        <Button variant="outline" size="sm" className="mt-2" asChild>
                          <label className="cursor-pointer">
                            选择图片
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) setFormData(prev => ({ ...prev, icon: file }))
                              }}
                            />
                          </label>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm">标签</label>
                    <p className="text-xs text-muted-foreground mt-1 mb-3">
                      选择相关标签帮助用户找到您的资源
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={formData.tags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleTagToggle(tag)}
                        >
                          {tag}
                          {formData.tags.includes(tag) && (
                            <X className="h-3 w-3 ml-1" />
                          )}
                        </Badge>
                      ))}
                    </div>
                    
                    {formData.tags.length > 0 && (
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm mb-2">已选择的标签:</p>
                        <div className="flex flex-wrap gap-1">
                          {formData.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      上一步
                    </Button>
                    <Button onClick={handleSubmit}>
                      提交审核
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl mb-2">提交成功！</h2>
                    <p className="text-muted-foreground">
                      您的资源已提交审核，我们会在 24 小时内完成审核并通知您结果。
                    </p>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      您可以在"我的资源"页面查看审核状态和管理已上传的资源。
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-center space-x-4">
                    <Button onClick={() => setCurrentPage('profile')}>
                      查看我的资源
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setCurrentStep(1)
                      setFormData({
                        title: '',
                        description: '',
                        category: '',
                        tags: [],
                        version: '1.0.0',
                        license: 'MIT',
                        file: null,
                        icon: null
                      })
                    }}>
                      继续上传
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}