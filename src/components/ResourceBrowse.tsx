import { useState } from 'react'
import { Search, Filter, Grid, List, SlidersHorizontal, TrendingUp, Clock, Trophy } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { ResourceCard } from './ResourceCard'

interface ResourceBrowseProps {
  setCurrentPage: (page: string) => void
}

const categories = [
  { id: 'all', name: '全部资源', count: 1250 },
  { id: 'mcp', name: 'MCP 连接器', count: 342 },
  { id: 'prompt', name: 'Prompt 模板', count: 456 },
  { id: 'dify', name: 'Dify 应用', count: 234 },
  { id: 'system', name: '系统资源', count: 156 },
  { id: 'workflow', name: '工作流模板', count: 62 }
]

const tags = [
  'AI', '自动化', '数据分析', '客服', '营销', '代码审查', 
  '工作流', '企业级', '开发工具', '创意设计'
]

const mockResources = [
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
  },
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
  },
  {
    id: '6',
    title: '自动化测试工作流',
    description: '完整的自动化测试解决方案，支持多种测试类型和持续集成。',
    author: '测试工程师',
    category: 'Dify应用',
    tags: ['测试', '自动化', '持续集成'],
    rating: 4.4,
    downloads: 234,
    views: 567,
    uploadDate: '1周前',
    version: '1.2.3'
  }
]

export function ResourceBrowse({ setCurrentPage }: ResourceBrowseProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('downloads')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredResources = mockResources.filter(resource => {
    if (selectedCategory !== 'all' && resource.category !== selectedCategory) return false
    if (selectedTags.length > 0 && !selectedTags.some(tag => resource.tags.includes(tag))) return false
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4">分类筛选</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span>{category.name}</span>
                      <Badge variant={selectedCategory === category.id ? 'secondary' : 'outline'}>
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4">标签筛选</h3>
                <div className="space-y-3">
                  {tags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={tag}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() => handleTagToggle(tag)}
                      />
                      <label
                        htmlFor={tag}
                        className="text-sm cursor-pointer"
                      >
                        {tag}
                      </label>
                    </div>
                  ))}
                </div>
                
                {selectedTags.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">已选标签</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTags([])}
                      >
                        清除
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => handleTagToggle(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* 统计卡片 */}
            <section className="mb-8">
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
                    <CardTitle className="text-sm">精选资源新增</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl">89</div>
                    <p className="text-xs text-muted-foreground">
                      本周新增精选资源
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Search and Controls */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="搜索资源..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  高级筛选
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    找到 {filteredResources.length} 个资源
                  </span>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="downloads">下载量</SelectItem>
                      <SelectItem value="rating">评分</SelectItem>
                      <SelectItem value="date">发布时间</SelectItem>
                      <SelectItem value="views">浏览量</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Resources Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onView={(id) => setCurrentPage('detail')}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>
                  上一页
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <span className="px-2">...</span>
                <Button variant="outline">10</Button>
                <Button variant="outline">
                  下一页
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}