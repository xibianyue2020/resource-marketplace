import { useState } from 'react'
import { 
  Trophy, Medal, Star, TrendingUp, Users, Calendar, 
  Gift, Target, Award, Zap, Download, Eye 
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface CommunityProps {
  setCurrentPage: (page: string) => void
}

const leaderboards = {
  authors: [
    { rank: 1, name: 'AI开发者', avatar: '', points: 12500, uploads: 45, downloads: 25600, trend: 'up' },
    { rank: 2, name: '数据专家', avatar: '', points: 9800, uploads: 32, downloads: 18900, trend: 'up' },
    { rank: 3, name: '企业架构师', avatar: '', points: 8900, uploads: 28, downloads: 16700, trend: 'down' },
    { rank: 4, name: '代码大师', avatar: '', points: 7600, uploads: 23, downloads: 14200, trend: 'up' },
    { rank: 5, name: '营销专家', avatar: '', points: 6800, uploads: 19, downloads: 12300, trend: 'stable' }
  ],
  resources: [
    { rank: 1, title: 'AI 智能客服 MCP 连接器', author: 'AI开发者', downloads: 5600, rating: 4.9, category: 'MCP' },
    { rank: 2, title: '数据分析 Prompt 模板库', author: '数据专家', downloads: 4200, rating: 4.8, category: 'Prompt' },
    { rank: 3, title: 'Dify 企业级工作流', author: '企业架构师', downloads: 3800, rating: 4.7, category: 'Dify应用' },
    { rank: 4, title: '代码审查助手', author: '代码大师', downloads: 3200, rating: 4.6, category: 'MCP' },
    { rank: 5, title: '营销文案生成器', author: '营销专家', downloads: 2900, rating: 4.5, category: 'Prompt' }
  ],
  nodes: [
    { rank: 1, name: '南京节点', syncCount: 1250, uptime: 5.0, lastSync: '2分钟前', status: 'healthy' },
    { rank: 2, name: '上海节点', syncCount: 1180, uptime: 4.9, lastSync: '3分钟前', status: 'healthy' },
    { rank: 3, name: '深圳节点', syncCount: 950, uptime: 4.8, lastSync: '5分钟前', status: 'warning' },
    { rank: 4, name: '广州节点', syncCount: 840, uptime: 4.9, lastSync: '1分钟前', status: 'healthy' },
    { rank: 5, name: '杭州节点', syncCount: 720, uptime: 4.8, lastSync: '10分钟前', status: 'error' }
  ]
}

const missions = {
  daily: [
    { id: '1', title: '每日登录', description: '登录平台获得积分', reward: 10, completed: true, progress: 1, total: 1 },
    { id: '2', title: '浏览资源', description: '浏览5个资源页面', reward: 20, completed: false, progress: 3, total: 5 },
    { id: '3', title: '下载资源', description: '下载1个资源', reward: 30, completed: false, progress: 0, total: 1 }
  ],
  weekly: [
    { id: '4', title: '上传资源', description: '本周上传1个资源', reward: 100, completed: false, progress: 0, total: 1 },
    { id: '5', title: '收获点赞', description: '资源获得10个点赞', reward: 150, completed: false, progress: 7, total: 10 },
    { id: '6', title: '社区互动', description: '评论或回复20次', reward: 80, completed: false, progress: 12, total: 20 }
  ],
  special: [
    { id: '7', title: '新年挑战', description: '1月份上传5个高质量资源', reward: 500, completed: false, progress: 2, total: 5, deadline: '2024-01-31' },
    { id: '8', title: 'AI达人', description: 'AI分类资源下载量达到1000', reward: 300, completed: false, progress: 650, total: 1000, deadline: '2024-02-29' }
  ]
}



export function Community({ setCurrentPage }: CommunityProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [selectedLeaderboard, setSelectedLeaderboard] = useState('authors')

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />
    return <span className="text-sm text-muted-foreground">#{rank}</span>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2">社区中心</h1>
          <p className="text-muted-foreground">参与社区活动，获得积分奖励，展示您的成就</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl">10,234</div>
              <div className="text-sm text-muted-foreground">活跃用户</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl">2,250</div>
              <div className="text-sm text-muted-foreground">资源总数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Download className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl">156,890</div>
              <div className="text-sm text-muted-foreground">总下载量</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl">4.8</div>
              <div className="text-sm text-muted-foreground">平均评分</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="leaderboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="leaderboard">排行榜</TabsTrigger>
            <TabsTrigger value="missions">任务中心</TabsTrigger>
            <TabsTrigger value="points">积分系统</TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl">社区排行榜</h2>
              <div className="flex space-x-2">
                {['week', 'month', 'all'].map((period) => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPeriod(period)}
                  >
                    {period === 'week' ? '本周' : period === 'month' ? '本月' : '总榜'}
                  </Button>
                ))}
              </div>
            </div>

            <Tabs value={selectedLeaderboard} onValueChange={setSelectedLeaderboard}>
              <TabsList>
                <TabsTrigger value="authors">作者榜</TabsTrigger>
                <TabsTrigger value="resources">资源榜</TabsTrigger>
                <TabsTrigger value="nodes">节点榜</TabsTrigger>
              </TabsList>

              <TabsContent value="authors" className="space-y-4">
                {leaderboards.authors.map((author) => (
                  <Card key={author.rank} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12">
                            {getRankBadge(author.rank)}
                          </div>
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={author.avatar} alt={author.name} />
                            <AvatarFallback>{author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg">{author.name}</h3>
                            <p className="text-sm text-muted-foreground">{author.points.toLocaleString()} 积分</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="text-center">
                            <div className="text-lg text-foreground">{author.uploads}</div>
                            <div>上传</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg text-foreground">{author.downloads.toLocaleString()}</div>
                            <div>下载</div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {getTrendIcon(author.trend)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                {leaderboards.resources.map((resource) => (
                  <Card key={resource.rank} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12">
                            {getRankBadge(resource.rank)}
                          </div>
                          <div>
                            <h3 className="text-lg">{resource.title}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm text-muted-foreground">by {resource.author}</span>
                              <Badge variant="outline">{resource.category}</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="text-center">
                            <div className="text-lg text-foreground">{resource.downloads.toLocaleString()}</div>
                            <div>下载</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-lg text-foreground">{resource.rating}</span>
                            </div>
                            <div>评分</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="nodes" className="space-y-4">
                {leaderboards.nodes.map((node) => (
                  <Card key={node.rank} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12">
                            {getRankBadge(node.rank)}
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(node.status)}`}></div>
                            <div>
                              <h3 className="text-lg">{node.name}</h3>
                              <p className="text-sm text-muted-foreground">最后同步: {node.lastSync}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="text-center">
                            <div className="text-lg text-foreground">{node.syncCount}</div>
                            <div>资源个数</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg text-foreground">{node.uptime}</div>
                            <div>平均评分</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="missions" className="space-y-6">
            <h2 className="text-2xl">任务中心</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>每日任务</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {missions.daily.map((mission) => (
                    <div key={mission.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm">{mission.title}</h4>
                        <Badge variant={mission.completed ? 'default' : 'secondary'}>
                          {mission.completed ? '已完成' : `+${mission.reward}`}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{mission.description}</p>
                      <Progress value={(mission.progress / mission.total) * 100} />
                      <p className="text-xs text-muted-foreground">
                        {mission.progress} / {mission.total}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>每周挑战</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {missions.weekly.map((mission) => (
                    <div key={mission.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm">{mission.title}</h4>
                        <Badge variant={mission.completed ? 'default' : 'secondary'}>
                          {mission.completed ? '已完成' : `+${mission.reward}`}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{mission.description}</p>
                      <Progress value={(mission.progress / mission.total) * 100} />
                      <p className="text-xs text-muted-foreground">
                        {mission.progress} / {mission.total}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gift className="h-5 w-5" />
                    <span>特殊活动</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {missions.special.map((mission) => (
                    <div key={mission.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm">{mission.title}</h4>
                        <Badge variant="outline">+{mission.reward}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{mission.description}</p>
                      <Progress value={(mission.progress / mission.total) * 100} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{mission.progress} / {mission.total}</span>
                        <span>截止: {mission.deadline}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="points" className="space-y-6">
            <div>
              <h2 className="text-2xl mb-2">积分系统</h2>
              <p className="text-muted-foreground">了解如何获得和使用积分</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>积分规则</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg">获得积分</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <span>每日登录</span>
                        <span className="text-green-600 dark:text-green-400">+10</span>
                      </div>
                      <div className="flex justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <span>上传资源</span>
                        <span className="text-green-600 dark:text-green-400">+100</span>
                      </div>
                      <div className="flex justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <span>资源被下载</span>
                        <span className="text-green-600 dark:text-green-400">+5</span>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <span>获得点赞</span>
                        <span className="text-green-600 dark:text-green-400">+3</span>
                      </div>
                      <div className="flex justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <span>评论互动</span>
                        <span className="text-green-600 dark:text-green-400">+2</span>
                      </div>
                      <div className="flex justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <span>完成任务</span>
                        <span className="text-green-600 dark:text-green-400">+10~500</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg">消耗积分</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                        <span>下载资源</span>
                        <span className="text-red-600 dark:text-red-400">-2</span>
                      </div>
                      <div className="flex justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                        <span>兑换徽章</span>
                        <span className="text-red-600 dark:text-red-400">-50</span>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                        <span>购买特权</span>
                        <span className="text-red-600 dark:text-red-400">-100</span>
                      </div>
                      <div className="flex justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                        <span>提升资源优先级</span>
                        <span className="text-red-600 dark:text-red-400">-20</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg">等级系统</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                      <div>
                        <span className="text-sm">新手 (0-99积分)</span>
                        <p className="text-xs text-muted-foreground">基础功能访问</p>
                      </div>
                      <Badge variant="outline">等级 1</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div>
                        <span className="text-sm">进阶 (100-499积分)</span>
                        <p className="text-xs text-muted-foreground">高级工具访问</p>
                      </div>
                      <Badge variant="outline">等级 2-3</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                      <div>
                        <span className="text-sm">专家 (500-1499积分)</span>
                        <p className="text-xs text-muted-foreground">专属功能和优先级</p>
                      </div>
                      <Badge variant="outline">等级 4-5</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-lg">
                      <div>
                        <span className="text-sm">大师 (1500+积分)</span>
                        <p className="text-xs text-muted-foreground">全部功能和特殊权限</p>
                      </div>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">等级 6+</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}