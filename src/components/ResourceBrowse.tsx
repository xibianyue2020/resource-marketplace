import { useState } from 'react'
import { Search, Filter, Grid, List, SlidersHorizontal, TrendingUp, Clock, Star } from 'lucide-react'
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
    thumbnail: '/src/images/AI.jpg'
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
    version: '1.3.2',
    thumbnail: '/src/images/data-analytics.jpg'
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
    version: '3.0.1',
    thumbnail: '/src/images/coding-workflow.jpg'
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
    version: '1.0.5',
    thumbnail: '/src/images/computer.jpg'
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
    version: '2.2.0',
    thumbnail: '/src/images/creative-design.jpg'
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
    version: '1.2.3',
    thumbnail: '/src/images/MCP.jpg'
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
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl">24</div>
                    <p className="text-xs text-muted-foreground">
                      本周精选推荐
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 工具栏 */}
            <section className="mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="搜索资源..."
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="排序方式" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="downloads">下载量</SelectItem>
                          <SelectItem value="rating">评分</SelectItem>
                          <SelectItem value="views">浏览量</SelectItem>
                          <SelectItem value="date">发布时间</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                      >
                        {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 资源列表 */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">资源列表</h2>
                <Badge variant="outline">
                  {filteredResources.length} 个结果
                </Badge>
              </div>
              
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onView={(id) => setCurrentPage('detail')}
                  />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}