import { useState } from 'react'
import { 
  Eye, Check, X, AlertTriangle, Clock, Shield, 
  FileText, Settings, Users, Database, Activity,
  Search, Filter, RefreshCw, Download, Flag
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Alert, AlertDescription } from './ui/alert'
import { Progress } from './ui/progress'

interface AdminPanelProps {
  setCurrentPage: (page: string) => void
}

const pendingResources = [
  {
    id: '1',
    title: 'AI 图像识别模型',
    author: '新用户123',
    category: 'MCP',
    uploadDate: '2小时前',
    fileSize: '5.2 MB',
    aiSafety: 85,
    copyrightCheck: 92,
    qualityScore: 78,
    status: 'pending',
    riskLevel: 'low'
  },
  {
    id: '2',
    title: '批量邮件营销工具',
    author: '营销达人',
    category: 'Dify应用',
    uploadDate: '4小时前',
    fileSize: '1.8 MB',
    aiSafety: 45,
    copyrightCheck: 98,
    qualityScore: 65,
    status: 'pending',
    riskLevel: 'high'
  },
  {
    id: '3',
    title: '数据可视化模板',
    author: '设计师小王',
    category: 'Prompt',
    uploadDate: '6小时前',
    fileSize: '800 KB',
    aiSafety: 95,
    copyrightCheck: 88,
    qualityScore: 92,
    status: 'pending',
    riskLevel: 'low'
  }
]

const syncLogs = [
  {
    id: '1',
    node: '南京节点',
    type: 'auto',
    status: 'success',
    startTime: '2024-01-20 14:30:00',
    endTime: '2024-01-20 14:32:15',
    duration: '2分15秒',
    resourcesCount: 25,
    conflicts: 0
  },
  {
    id: '2',
    node: '上海节点',
    type: 'manual',
    status: 'success',
    startTime: '2024-01-20 14:25:00',
    endTime: '2024-01-20 14:28:30',
    duration: '3分30秒',
    resourcesCount: 18,
    conflicts: 2
  },
  {
    id: '3',
    node: '深圳节点',
    type: 'auto',
    status: 'failed',
    startTime: '2024-01-20 14:20:00',
    endTime: '2024-01-20 14:22:45',
    duration: '2分45秒',
    resourcesCount: 0,
    conflicts: 0,
    error: '网络连接超时'
  }
]

const systemStats = {
  totalUsers: 10234,
  totalResources: 1567,
  pendingReviews: 23,
  dailyDownloads: 2456,
  systemHealth: 98.5,
  storageUsed: 78.3,
  bandwidth: 65.2
}

export function AdminPanel({ setCurrentPage }: AdminPanelProps) {
  const [selectedResource, setSelectedResource] = useState<string | null>(null)
  const [reviewStatus, setReviewStatus] = useState<'pending' | 'approved' | 'rejected'>('pending')

  const handleReview = (resourceId: string, action: 'approve' | 'reject' | 'feature') => {
    // 处理审核逻辑
    console.log(`${action} resource ${resourceId}`)
  }

  const handleSync = (nodeId: string) => {
    // 触发节点同步
    console.log(`Sync node ${nodeId}`)
  }

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return <Badge variant="destructive">高风险</Badge>
      case 'medium':
        return <Badge className="bg-yellow-500">中风险</Badge>
      case 'low':
        return <Badge className="bg-green-500">低风险</Badge>
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />
      case 'failed':
        return <X className="h-4 w-4 text-red-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2">管理后台</h1>
            <p className="text-muted-foreground">系统管理和资源审核</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-500">在线</Badge>
            <span className="text-sm text-muted-foreground">管理员模式</span>
          </div>
        </div>

        {/* System Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">待审核</p>
                  <p className="text-2xl">{systemStats.pendingReviews}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">总用户</p>
                  <p className="text-2xl">{systemStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">总资源</p>
                  <p className="text-2xl">{systemStats.totalResources.toLocaleString()}</p>
                </div>
                <Database className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">系统健康</p>
                  <p className="text-2xl">{systemStats.systemHealth}%</p>
                </div>
                <Activity className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="review" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="review">资源审核</TabsTrigger>
            <TabsTrigger value="sync">节点同步</TabsTrigger>
            <TabsTrigger value="system">系统监控</TabsTrigger>
          </TabsList>

          <TabsContent value="review" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl">资源审核队列</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="搜索资源..." className="pl-10 w-64" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="high">高风险</SelectItem>
                    <SelectItem value="medium">中风险</SelectItem>
                    <SelectItem value="low">低风险</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {pendingResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg">{resource.title}</h3>
                            {getRiskBadge(resource.riskLevel)}
                            <Badge variant="outline">{resource.category}</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>作者: {resource.author}</span>
                            <span>上传: {resource.uploadDate}</span>
                            <span>大小: {resource.fileSize}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" onClick={() => setCurrentPage('detail')}>
                            <Eye className="h-4 w-4 mr-2" />
                            预览
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            下载
                          </Button>
                        </div>
                      </div>

                      {/* AI审核结果 */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">安全检测</span>
                            <span className="text-sm">{resource.aiSafety}%</span>
                          </div>
                          <Progress 
                            value={resource.aiSafety} 
                            className={resource.aiSafety < 60 ? 'bg-red-100' : resource.aiSafety < 80 ? 'bg-yellow-100' : 'bg-green-100'} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">版权检查</span>
                            <span className="text-sm">{resource.copyrightCheck}%</span>
                          </div>
                          <Progress 
                            value={resource.copyrightCheck} 
                            className={resource.copyrightCheck < 60 ? 'bg-red-100' : resource.copyrightCheck < 80 ? 'bg-yellow-100' : 'bg-green-100'} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">质量评分</span>
                            <span className="text-sm">{resource.qualityScore}%</span>
                          </div>
                          <Progress 
                            value={resource.qualityScore} 
                            className={resource.qualityScore < 60 ? 'bg-red-100' : resource.qualityScore < 80 ? 'bg-yellow-100' : 'bg-green-100'} 
                          />
                        </div>
                      </div>

                      {/* 审核建议 */}
                      {resource.riskLevel === 'high' && (
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            AI检测发现潜在风险，建议仔细审核后再决定是否通过。
                          </AlertDescription>
                        </Alert>
                      )}

                      {/* 操作按钮 */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          等待审核时间: {resource.uploadDate}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleReview(resource.id, 'reject')}
                          >
                            <X className="h-4 w-4 mr-2" />
                            驳回
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleReview(resource.id, 'approve')}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            通过
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                            onClick={() => handleReview(resource.id, 'feature')}
                          >
                            ⭐ 精选
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sync" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl">节点同步管理</h2>
              <Button>
                <RefreshCw className="h-4 w-4 mr-2" />
                同步所有节点
              </Button>
            </div>

            {/* 节点状态 */}
            <div className="grid md:grid-cols-3 gap-6">
              {['南京节点', '上海节点', '深圳节点'].map((node, index) => (
                <Card key={node}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{node}</span>
                      <div className={`w-3 h-3 rounded-full ${
                        index === 2 ? 'bg-red-500' : 'bg-green-500'
                      }`}></div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>最后同步</span>
                        <span>{index === 0 ? '2分钟前' : index === 1 ? '5分钟前' : '1小时前'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>同步状态</span>
                        <span className={index === 2 ? 'text-red-500' : 'text-green-500'}>
                          {index === 2 ? '异常' : '正常'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>资源数量</span>
                        <span>{1567 - index * 50}</span>
                      </div>
                    </div>
                    <Button className="w-full" size="sm" onClick={() => handleSync(node)}>
                      手动同步
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 同步日志 */}
            <Card>
              <CardHeader>
                <CardTitle>同步日志</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {syncLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(log.status)}
                        <div>
                          <p className="text-sm">{log.node}</p>
                          <p className="text-xs text-muted-foreground">
                            {log.startTime} - {log.endTime}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="text-center">
                          <div className="text-foreground">{log.duration}</div>
                          <div>耗时</div>
                        </div>
                        <div className="text-center">
                          <div className="text-foreground">{log.resourcesCount}</div>
                          <div>资源</div>
                        </div>
                        {log.conflicts > 0 && (
                          <div className="text-center">
                            <div className="text-yellow-600">{log.conflicts}</div>
                            <div>冲突</div>
                          </div>
                        )}
                      </div>
                      
                      <Badge variant={log.type === 'manual' ? 'default' : 'outline'}>
                        {log.type === 'manual' ? '手动' : '自动'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <h2 className="text-2xl">系统监控</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>服务器状态</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">CPU 使用率</span>
                      <span className="text-sm">45%</span>
                    </div>
                    <Progress value={45} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">内存使用</span>
                      <span className="text-sm">68%</span>
                    </div>
                    <Progress value={68} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">存储空间</span>
                      <span className="text-sm">{systemStats.storageUsed}%</span>
                    </div>
                    <Progress value={systemStats.storageUsed} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">带宽使用</span>
                      <span className="text-sm">{systemStats.bandwidth}%</span>
                    </div>
                    <Progress value={systemStats.bandwidth} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>今日统计</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl text-blue-600">1,234</div>
                      <div className="text-sm text-muted-foreground">访问量</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl text-green-600">{systemStats.dailyDownloads}</div>
                      <div className="text-sm text-muted-foreground">下载次数</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl text-purple-600">89</div>
                      <div className="text-sm text-muted-foreground">新用户</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl text-orange-600">12</div>
                      <div className="text-sm text-muted-foreground">新资源</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>系统日志</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {[
                    { time: '14:35:23', level: 'INFO', message: '用户 "开发者123" 上传资源成功' },
                    { time: '14:32:15', level: 'SUCCESS', message: '南京节点同步完成' },
                    { time: '14:30:45', level: 'WARNING', message: '深圳节点连接超时' },
                    { time: '14:28:12', level: 'INFO', message: '审核员通过资源 "AI客服工具"' },
                    { time: '14:25:33', level: 'ERROR', message: '备份任务失败' },
                  ].map((log, index) => (
                    <div key={index} className="flex items-center space-x-4 text-sm p-2 rounded border">
                      <span className="text-muted-foreground">{log.time}</span>
                      <Badge variant={
                        log.level === 'ERROR' ? 'destructive' :
                        log.level === 'WARNING' ? 'secondary' :
                        log.level === 'SUCCESS' ? 'default' : 'outline'
                      }>
                        {log.level}
                      </Badge>
                      <span>{log.message}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}