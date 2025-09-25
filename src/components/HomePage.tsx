import { ChevronRight, TrendingUp, Clock, Star, Trophy, Zap, Users, Download } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { ResourceCard } from './ResourceCard'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface HomePageProps {
  setCurrentPage: (page: string) => void
}

const featuredResources = [
  {
    id: '1',
    title: 'AI 智能客服 MCP 连接器',
    description: '高度可定制的AI客服解决方案，支持多平台集成，提供智能对话和工单管理功能。',
    author: 'AI开发者',
    category: 'MCP',
    tags: ['AI', '客服', '自动化'],
    rating: 4.8,
    downloads: 1230,
    views: 5600,
    isFeatured: true,
    uploadDate: '2天前',
    version: '2.1.0',
    thumbnail: 'https://images.unsplash.com/photo-1531535807748-218331acbcb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU4NjcxNTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '2',
    title: '数据分析 Prompt 模板库',
    description: '包含100+精选数据分析提示词，涵盖报表生成、趋势分析、预测建模等场景。',
    author: '数据专家',
    category: 'Prompt',
    tags: ['数据分析', '模板', 'BI'],
    rating: 4.9,
    downloads: 890,
    views: 3200,
    uploadDate: '5天前',
    version: '1.3.2'
  },
  {
    id: '3',
    title: 'Dify 企业级工作流',
    description: '企业级自动化工作流模板，包含审批流程、数据处理、通知系统等功能。',
    author: '企业架构师',
    category: 'Dify应用',
    tags: ['工作流', '企业', '自动化'],
    rating: 4.7,
    downloads: 567,
    views: 2100,
    uploadDate: '1周前',
    version: '3.0.1'
  }
]

const recentResources = [
  {
    id: '4',
    title: '代码审查助手',
    description: '智能代码审查工具，支持多种编程语言，提供详细的改进建议。',
    author: '代码大师',
    category: 'MCP',
    tags: ['代码审查', '开发工具'],
    rating: 4.6,
    downloads: 342,
    views: 1200,
    uploadDate: '1天前',
    version: '1.0.5'
  },
  {
    id: '5',
    title: '营销文案生成器',
    description: '专业的营销文案生成模板，适用于社交媒体、广告投放、邮件营销等场景。',
    author: '营销专家',
    category: 'Prompt',
    tags: ['营销', '文案', '创意'],
    rating: 4.5,
    downloads: 298,
    views: 890,
    uploadDate: '3天前',
    version: '2.2.0'
  }
]

const stats = [
  { icon: Users, label: '注册用户', value: '10,000+' },
  { icon: Download, label: '资源下载', value: '50,000+' },
  { icon: Star, label: '五星评价', value: '95%' },
  { icon: Zap, label: '活跃开发者', value: '1,500+' }
]

export function HomePage({ setCurrentPage }: HomePageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  🚀 全新升级
                </Badge>
                <h1 className="text-4xl md:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI 资源市场
                </h1>
                <p className="text-xl text-muted-foreground max-w-md">
                  发现、分享和部署最优质的 AI 工具和模板，让您的项目更加智能高效
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => setCurrentPage('browse')}
                >
                  立即探索
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => setCurrentPage('upload')}>
                  上传资源
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1696041754237-e0c1ffd10138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0cGxhY2UlMjB0ZWNobm9sb2d5JTIwYmFubmVyfGVufDF8fHx8MTc1ODc2Mjc5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="数字市场平台"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl mb-2">精选资源</h2>
              <p className="text-muted-foreground">编辑精选的高质量资源推荐</p>
            </div>
            <Button variant="outline" onClick={() => setCurrentPage('browse')}>
              查看全部
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onView={(id) => setCurrentPage('detail')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">热门下载</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">2,350</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% 较上周
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">最新发布</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">156</div>
                <p className="text-xs text-muted-foreground">
                  本周新增资源
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">社区活跃度</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">89%</div>
                <p className="text-xs text-muted-foreground">
                  用户满意度
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl mb-2">最新发布</h2>
              <p className="text-muted-foreground">社区最新分享的优质资源</p>
            </div>
            <Button variant="outline" onClick={() => setCurrentPage('browse')}>
              查看更多
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onView={(id) => setCurrentPage('detail')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6 text-white">
            <h2 className="text-3xl">准备好分享您的创作了吗？</h2>
            <p className="text-xl opacity-90">
              加入我们的开发者社区，分享您的 AI 工具和模板，获得积分奖励和社区认可
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setCurrentPage('upload')}
              >
                立即上传
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => setCurrentPage('community')}
              >
                加入社区
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}