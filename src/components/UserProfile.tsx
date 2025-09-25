import { useState } from 'react'
import { 
  User, Settings, Download, Star, Heart, Upload, Award, 
  Calendar, Eye, TrendingUp, Edit, Save, X, Plus, Minus 
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Progress } from './ui/progress'
import { ResourceCard } from './ResourceCard'

interface UserProfileProps {
  setCurrentPage: (page: string) => void
}

const mockUser = {
  id: '1',
  name: '开发者123',
  email: 'developer123@example.com',
  bio: '热爱AI技术的全栈开发者，专注于智能化工具的开发和分享。',
  avatar: '',
  role: '高级开发者',
  joinDate: '2023-03-15',
  location: '北京, 中国',
  website: 'https://developer123.com',
  points: 1250,
  level: 5,
  nextLevelPoints: 1500,
  stats: {
    uploads: 12,
    downloads: 5600,
    likes: 234,
    favorites: 5,
    followers: 89,
    following: 45
  }
}

const badges = [
  { id: '1', name: '早期用户', description: '平台首批注册用户', icon: '🏆', earned: true, date: '2023-03-15' },
  { id: '2', name: '上传达人', description: '上传超过10个资源', icon: '📤', earned: true, date: '2023-12-20' },
  { id: '3', name: '社区之星', description: '获得100个点赞', icon: '⭐', earned: true, date: '2024-01-10' },
  { id: '4', name: '代码大师', description: '上传超过50个资源', icon: '💻', earned: false },
  { id: '5', name: 'AI专家', description: '在AI分类获得1000下载', icon: '🤖', earned: false },
  { id: '6', name: '年度贡献者', description: '年度最活跃贡献者', icon: '🎖️', earned: false }
]

const myResources = [
  {
    id: '1',
    title: 'AI 智能客服 MCP 连接器',
    description: '高度可定制的AI客服解决方案，支持多平台集成',
    author: '开发者123',
    category: 'MCP',
    tags: ['AI', '客服', '自动化'],
    rating: 4.8,
    downloads: 1230,
    views: 5600,
    isFeatured: true,
    uploadDate: '2天前',
    version: '2.1.0',
    status: 'published'
  },
  {
    id: '2',
    title: '代码审查助手',
    description: '智能代码审查工具，支持多种编程语言',
    author: '开发者123',
    category: 'MCP',
    tags: ['代码审查', '开发工具'],
    rating: 4.6,
    downloads: 342,
    views: 1200,
    uploadDate: '1天前',
    version: '1.0.5',
    status: 'published'
  },
  {
    id: '3',
    title: '数据可视化模板',
    description: '专业的数据可视化解决方案',
    author: '开发者123',
    category: 'Prompt',
    tags: ['数据可视化', '图表'],
    rating: 0,
    downloads: 0,
    views: 0,
    uploadDate: '刚刚',
    version: '1.0.0',
    status: 'pending'
  }
]

const favoriteResources = [
  {
    id: '101',
    title: '企业级数据分析平台',
    description: '完整的企业级数据分析解决方案，支持多种数据源和可视化图表。',
    author: '数据专家',
    category: 'Dify应用',
    tags: ['数据分析', '企业级', 'BI'],
    rating: 4.9,
    downloads: 2340,
    views: 8900,
    uploadDate: '1周前',
    version: '3.2.1',
    favoriteDate: '3天前',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300'
  },
  {
    id: '102',
    title: '智能内容生成器',
    description: '基于GPT的智能内容生成工具，支持多种文本格式和风格。',
    author: '内容创作者',
    category: 'Prompt',
    tags: ['内容生成', 'GPT', 'AI写作'],
    rating: 4.7,
    downloads: 1890,
    views: 6500,
    uploadDate: '3天前',
    version: '2.0.3',
    favoriteDate: '2天前',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300'
  },
  {
    id: '103',
    title: '自动化测试框架',
    description: '完整的自动化测试解决方案，支持Web、API和移动端测试。',
    author: '测试工程师',
    category: 'MCP',
    tags: ['自动化测试', '测试框架', 'CI/CD'],
    rating: 4.8,
    downloads: 1560,
    views: 4200,
    uploadDate: '5天前',
    version: '1.5.2',
    favoriteDate: '1天前',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300'
  },
  {
    id: '104',
    title: '客户关系管理系统',
    description: '全功能的CRM系统模板，包含客户管理、销售跟踪、报表分析等功能。',
    author: '企业架构师',
    category: 'Dify应用',
    tags: ['CRM', '客户管理', '销售'],
    rating: 4.6,
    downloads: 980,
    views: 3100,
    uploadDate: '1周前',
    version: '2.1.0',
    favoriteDate: '5天前',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300'
  },
  {
    id: '105',
    title: '社交媒体管理工具',
    description: '多平台社交媒体内容管理和发布工具，支持定时发布和数据统计。',
    author: '营销专家',
    category: 'MCP',
    tags: ['社交媒体', '营销', '内容管理'],
    rating: 4.5,
    downloads: 756,
    views: 2800,
    uploadDate: '4天前',
    version: '1.8.3',
    favoriteDate: '6天前',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300'
  }
]

const activityLog = [
  { type: 'points-earned', title: '每日登录', date: '今天', points: 10 },
  { type: 'points-earned', title: '资源被下载', date: '今天', points: 5 },
  { type: 'upload', title: '上传了 AI 智能客服 MCP 连接器', date: '2天前' },
  { type: 'points-earned', title: '上传资源审核通过', date: '昨天', points: 100 },
  { type: 'points-spent', title: '下载资源', date: '昨天', points: -2 },
  { type: 'download', title: '下载了 营销文案生成器', date: '3天前' },
  { type: 'points-earned', title: '获得点赞', date: '2天前', points: 3 },
  { type: 'like', title: '点赞了 Dify 企业级工作流', date: '5天前' },
  { type: 'points-earned', title: '完成每日任务', date: '3天前', points: 20 },
  { type: 'follow', title: '关注了 AI开发者', date: '1周前' },
  { type: 'points-spent', title: '兑换徽章', date: '1周前', points: -50 }
]

export function UserProfile({ setCurrentPage }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: mockUser.name,
    bio: mockUser.bio,
    location: mockUser.location,
    website: mockUser.website
  })

  const levelProgress = ((mockUser.points - (mockUser.level - 1) * 250) / 250) * 100

  const handleSave = () => {
    // 保存用户信息
    setIsEditing(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">已发布</Badge>
      case 'pending':
        return <Badge variant="outline">审核中</Badge>
      case 'rejected':
        return <Badge variant="destructive">已驳回</Badge>
      default:
        return <Badge variant="secondary">草稿</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback className="text-2xl">{mockUser.name[0]}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  更换头像
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="用户名"
                    />
                    <Textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="个人简介"
                      rows={3}
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        value={editForm.location}
                        onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="所在地"
                      />
                      <Input
                        value={editForm.website}
                        onChange={(e) => setEditForm(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="个人网站"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        保存
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                        <X className="h-4 w-4 mr-2" />
                        取消
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <h1 className="text-3xl">{mockUser.name}</h1>
                      <Badge>{mockUser.role}</Badge>
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        编辑
                      </Button>
                    </div>
                    
                    <p className="text-muted-foreground">{mockUser.bio}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>加入于 {mockUser.joinDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{mockUser.location}</span>
                      </div>
                      {mockUser.website && (
                        <div className="flex items-center space-x-1">
                          <span>🌐</span>
                          <a href={mockUser.website} className="text-primary hover:underline">
                            个人网站
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl">{mockUser.stats.uploads}</div>
                    <div className="text-sm text-muted-foreground">上传</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">{mockUser.stats.downloads.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">下载量</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">{mockUser.stats.favorites}</div>
                    <div className="text-sm text-muted-foreground">收藏</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">{mockUser.stats.followers}</div>
                    <div className="text-sm text-muted-foreground">关注者</div>
                  </div>
                </div>

                {/* Level Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">等级 {mockUser.level}</span>
                    <span className="text-sm text-muted-foreground">
                      {mockUser.points} / {mockUser.nextLevelPoints} 积分
                    </span>
                  </div>
                  <Progress value={levelProgress} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="resources">我的资源</TabsTrigger>
            <TabsTrigger value="favorites">我的收藏</TabsTrigger>
            <TabsTrigger value="badges">徽章成就</TabsTrigger>
            <TabsTrigger value="activity">活动记录</TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl">我的资源</h2>
              <Button onClick={() => setCurrentPage('upload')}>
                <Upload className="h-4 w-4 mr-2" />
                上传新资源
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myResources.map((resource) => (
                <div key={resource.id} className="relative">
                  <ResourceCard
                    resource={resource}
                    onView={(id) => setCurrentPage('detail')}
                  />
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(resource.status)}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl">我的收藏</h2>
                <p className="text-muted-foreground mt-1">收藏的优质资源</p>
              </div>
              <div className="text-sm text-muted-foreground">
                共 {favoriteResources.length} 个收藏
              </div>
            </div>

            {favoriteResources.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg mb-2">暂无收藏资源</h3>
                  <p className="text-muted-foreground mb-4">
                    浏览资源市场，收藏喜欢的资源吧
                  </p>
                  <Button onClick={() => setCurrentPage('browse')}>
                    去逛逛
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteResources.map((resource) => (
                  <div key={resource.id} className="relative">
                    <ResourceCard
                      resource={resource}
                      onView={(id) => setCurrentPage('detail')}
                    />
                    <div className="absolute top-2 right-2 flex items-center space-x-1">
                      <Badge variant="secondary" className="text-xs">
                        {resource.favoriteDate} 收藏
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 bg-white/80 hover:bg-white/90 dark:bg-black/80 dark:hover:bg-black/90"
                        onClick={(e) => {
                          e.stopPropagation()
                          // 取消收藏逻辑
                        }}
                      >
                        <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <div>
              <h2 className="text-2xl mb-2">徽章成就</h2>
              <p className="text-muted-foreground">展示您在社区中的成就和贡献</p>
            </div>

            {/* 积分情况 */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* 积分余额 */}
                  <div className="text-center">
                    <h3 className="text-lg text-muted-foreground mb-2">积分余额</h3>
                    <div className="text-4xl mb-2">{mockUser.points.toLocaleString()}</div>
                    <p className="text-muted-foreground">当前积分</p>
                  </div>

                  {/* 等级进度 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">等级进度</span>
                      <span className="text-sm">等级 {mockUser.level}</span>
                    </div>
                    <Progress value={levelProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      距离下一级还需 {mockUser.nextLevelPoints - mockUser.points} 积分
                    </p>
                  </div>

                  {/* 本周积分变化 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 text-center">
                      <div className="text-2xl text-green-600 dark:text-green-400 mb-1">+150</div>
                      <p className="text-sm text-muted-foreground">本周获得</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 text-center">
                      <div className="text-2xl text-red-600 dark:text-red-400 mb-1">-20</div>
                      <p className="text-sm text-muted-foreground">本周消耗</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge) => (
                <Card 
                  key={badge.id} 
                  className={`${badge.earned ? 'border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-950/10' : 'opacity-60'}`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <h3 className="text-lg mb-2">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>
                    {badge.earned ? (
                      <Badge className="bg-yellow-500">
                        获得于 {badge.date}
                      </Badge>
                    ) : (
                      <Badge variant="outline">未解锁</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <h2 className="text-2xl">活动记录</h2>
            <div className="space-y-4">
              {activityLog.map((activity, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          activity.type === 'upload' ? 'bg-blue-100 dark:bg-blue-900/20' :
                          activity.type === 'download' ? 'bg-green-100 dark:bg-green-900/20' :
                          activity.type === 'like' ? 'bg-red-100 dark:bg-red-900/20' :
                          activity.type === 'follow' ? 'bg-purple-100 dark:bg-purple-900/20' :
                          activity.type === 'points-earned' ? 'bg-emerald-100 dark:bg-emerald-900/20' :
                          'bg-orange-100 dark:bg-orange-900/20'
                        }`}>
                          {activity.type === 'upload' && <Upload className="h-4 w-4 text-blue-600" />}
                          {activity.type === 'download' && <Download className="h-4 w-4 text-green-600" />}
                          {activity.type === 'like' && <Heart className="h-4 w-4 text-red-600" />}
                          {activity.type === 'follow' && <User className="h-4 w-4 text-purple-600" />}
                          {activity.type === 'points-earned' && <Plus className="h-4 w-4 text-emerald-600" />}
                          {activity.type === 'points-spent' && <Minus className="h-4 w-4 text-orange-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                      {activity.points && (
                        <div className={`text-sm font-medium ${
                          activity.type === 'points-earned' ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-600 dark:text-orange-400'
                        }`}>
                          {activity.type === 'points-earned' ? '+' : ''}{activity.points}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}