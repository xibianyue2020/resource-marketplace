import { useState } from 'react'
import { 
  Star, Download, Heart, Eye, Tag, Clock, User, 
  ThumbsUp, MessageCircle, Flag, ChevronDown, ChevronUp,
  Share2, BookOpen, Settings, GitBranch, Home, Layout, Play 
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface ResourceDetailProps {
  setCurrentPage: (page: string) => void
}

const mockResource = {
  id: '1',
  title: 'AI 智能客服 MCP 连接器',
  description: '这是一个高度可定制的AI客服解决方案，支持多平台集成，提供智能对话和工单管理功能。该连接器采用最新的AI技术，能够理解用户意图，提供准确的回答，并可以无缝集成到现有的客服系统中。',
  author: 'AI开发者',
  authorAvatar: '',
  category: 'MCP',
  tags: ['AI', '客服', '自动化', '智能对话', '工单管理'],
  rating: 4.8,
  downloads: 1230,
  views: 5600,
  likes: 89,
  isFeatured: true,
  uploadDate: '2天前',
  lastUpdate: '2024-01-20',
  version: '2.1.0',
  fileSize: '2.3 MB',
  thumbnail: '/src/images/computer.jpg',
  features: [
    '智能意图识别',
    '多平台集成支持',
    '自定义对话流程',
    '工单自动创建',
    '数据统计分析',
    '24/7 在线服务'
  ],
  requirements: [
    'Python 3.8+',
    'OpenAI API Key',
    '最少 512MB RAM',
    '网络连接'
  ]
}

const mockComments = [
  {
    id: '1',
    user: '开发者小李',
    avatar: '',
    content: '这个MCP连接器真的很棒！集成到我们的客服系统后，响应时间提升了50%，客户满意度也有明显提升。',
    date: '2天前',
    likes: 12,
    replies: [
      {
        id: '1-1',
        user: 'AI开发者',
        avatar: '',
        content: '感谢您的反馈！很高兴听到这个消息。如果有任何问题或建议，随时联系我。',
        date: '1天前',
        likes: 3
      }
    ]
  },
  {
    id: '2',
    user: '产品经理王总',
    avatar: '',
    content: '部署过程很顺利，文档很详细。希望能增加更多的自定义选项。',
    date: '3天前',
    likes: 8,
    replies: []
  }
]

const mockVersionHistory = [
  {
    version: '2.1.0',
    date: '2024-01-20',
    changes: [
      '新增多语言支持',
      '优化响应速度',
      '修复已知bug'
    ]
  },
  {
    version: '2.0.0',
    date: '2024-01-15',
    changes: [
      '重构核心架构',
      '增加工单管理功能',
      '支持自定义对话流程'
    ]
  }
]

export function ResourceDetail({ setCurrentPage }: ResourceDetailProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [expandedComments, setExpandedComments] = useState<string[]>([])
  const [newComment, setNewComment] = useState('')

  const ratingDistribution = [
    { stars: 5, count: 120, percentage: 78 },
    { stars: 4, count: 25, percentage: 16 },
    { stars: 3, count: 8, percentage: 5 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 0, percentage: 0 }
  ]

  const toggleCommentExpansion = (commentId: string) => {
    setExpandedComments(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* 面包屑导航 */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 hover:text-foreground"
            onClick={() => setCurrentPage('home')}
          >
            <Home className="h-4 w-4 mr-1" />
            首页
          </Button>
          <span>/</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 hover:text-foreground"
            onClick={() => setCurrentPage('browse')}
          >
            <Layout className="h-4 w-4 mr-1" />
            资源市场
          </Button>
          <span>/</span>
          <span className="text-foreground font-medium">{mockResource.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      精选
                    </Badge>
                    <Badge variant="outline">{mockResource.category}</Badge>
                  </div>
                  <h1 className="text-3xl">{mockResource.title}</h1>
                  <p className="text-muted-foreground max-w-2xl">
                    {mockResource.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={mockResource.authorAvatar} alt={mockResource.author} />
                    <AvatarFallback>{mockResource.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">{mockResource.author}</p>
                    <p className="text-xs text-muted-foreground">发布于 {mockResource.uploadDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{mockResource.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="h-4 w-4" />
                    <span>{mockResource.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{mockResource.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {mockResource.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Preview Image */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={mockResource.thumbnail}
                    alt={mockResource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">概览</TabsTrigger>
                <TabsTrigger value="docs">文档</TabsTrigger>
                <TabsTrigger value="reviews">评价</TabsTrigger>
                <TabsTrigger value="versions">版本</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>功能特性</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {mockResource.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>系统要求</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {mockResource.requirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></div>
                          <span className="text-sm">{req}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="docs">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>使用文档</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-sm max-w-none">
                    <h3>安装说明</h3>
                    <p>1. 下载资源包并解压到您的项目目录</p>
                    <p>2. 安装必要的依赖包</p>
                    <p>3. 配置 API 密钥和连接参数</p>
                    
                    <h3>快速开始</h3>
                    <p>按照以下步骤可以快速集成到您的系统中...</p>
                    
                    <h3>API 参考</h3>
                    <p>详细的 API 文档和使用示例...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>用户评价</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-4xl mb-2">{mockResource.rating}</div>
                          <div className="flex justify-center mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= Math.floor(mockResource.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">基于 154 个评价</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {ratingDistribution.map((item) => (
                          <div key={item.stars} className="flex items-center space-x-3">
                            <span className="text-sm w-12">{item.stars} 星</span>
                            <Progress value={item.percentage} className="flex-1" />
                            <span className="text-sm text-muted-foreground w-8">{item.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-4">
                      <Textarea
                        placeholder="写下您的评价..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <Button>提交评价</Button>
                    </div>
                    
                    <div className="space-y-6 mt-8">
                      {mockComments.map((comment) => (
                        <div key={comment.id} className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.avatar} alt={comment.user} />
                              <AvatarFallback>{comment.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">{comment.user}</span>
                                <span className="text-xs text-muted-foreground">{comment.date}</span>
                              </div>
                              <p className="text-sm">{comment.content}</p>
                              <div className="flex items-center space-x-4">
                                <Button variant="ghost" size="sm">
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  {comment.likes}
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => toggleCommentExpansion(comment.id)}
                                >
                                  <MessageCircle className="h-3 w-3 mr-1" />
                                  回复 ({comment.replies.length})
                                </Button>
                              </div>
                              
                              {expandedComments.includes(comment.id) && comment.replies.length > 0 && (
                                <div className="ml-4 space-y-3 pt-3 border-l pl-4">
                                  {comment.replies.map((reply) => (
                                    <div key={reply.id} className="flex items-start space-x-3">
                                      <Avatar className="h-6 w-6">
                                        <AvatarImage src={reply.avatar} alt={reply.user} />
                                        <AvatarFallback className="text-xs">{reply.user[0]}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                          <span className="text-xs">{reply.user}</span>
                                          <span className="text-xs text-muted-foreground">{reply.date}</span>
                                        </div>
                                        <p className="text-xs mt-1">{reply.content}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="versions">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <GitBranch className="h-5 w-5" />
                      <span>版本历史</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {mockVersionHistory.map((version, index) => (
                        <div key={version.version} className="relative">
                          {index !== mockVersionHistory.length - 1 && (
                            <div className="absolute left-4 top-8 bottom-0 w-px bg-border"></div>
                          )}
                          <div className="flex items-start space-x-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                              {version.version.split('.')[0]}
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">{version.version}</span>
                                <Badge variant="outline">{version.date}</Badge>
                              </div>
                              <ul className="space-y-1">
                                {version.changes.map((change, changeIndex) => (
                                  <li key={changeIndex} className="text-sm text-muted-foreground">
                                    • {change}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button size="lg" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    立即拉取
                  </Button>
                  
                  <Button variant="secondary" size="lg" className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    试运行
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <ThumbsUp className={`mr-2 h-4 w-4 ${isLiked ? 'fill-primary' : ''}`} />
                      点赞
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsFavorited(!isFavorited)}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                      收藏
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>资源信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">版本</span>
                  <span className="text-sm">{mockResource.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">文件大小</span>
                  <span className="text-sm">{mockResource.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">最后更新</span>
                  <span className="text-sm">{mockResource.lastUpdate}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>作者信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={mockResource.authorAvatar} alt={mockResource.author} />
                    <AvatarFallback>{mockResource.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4>{mockResource.author}</h4>
                    <p className="text-sm text-muted-foreground">AI 开发专家</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  查看主页
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}