import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { 
  CheckCircle, 
  MessageCircle, 
  Download, 
  Star, 
  Award,
  AlertTriangle,
  Server,
  Shield,
  Clock,
  MoreVertical,
  Trash2,
  Bell
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface NotificationItem {
  id: string
  type: 'approval' | 'comment' | 'download' | 'favorite' | 'featured' | 'audit' | 'sync_error' | 'monitor_error'
  title: string
  description: string
  time: string
  isRead: boolean
  resourceName?: string
  userName?: string
  userAvatar?: string
}

interface NotificationsProps {
  setCurrentPage: (page: string) => void
}

export function Notifications({ setCurrentPage }: NotificationsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all')
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'approval',
      title: '资源审核通过',
      description: '您的资源 "AI 智能客服助手" 已通过审核，现在可以在资源市场中查看',
      time: '5分钟前',
      isRead: false,
      resourceName: 'AI 智能客服助手'
    },
    {
      id: '2',
      type: 'comment',
      title: '收到新评论',
      description: '用户 "张开发" 评论了您的资源："这个工具非常实用，帮我节省了很多时间！"',
      time: '15分钟前',
      isRead: false,
      userName: '张开发',
      resourceName: '数据可视化组件库'
    },
    {
      id: '3',
      type: 'download',
      title: '资源被下载',
      description: '您的资源 "Dify 企业级工作流" 被下载了 12 次',
      time: '1小时前',
      isRead: true,
      resourceName: 'Dify 企业级工作流'
    },
    {
      id: '4',
      type: 'favorite',
      title: '资源被收藏',
      description: '用户 "李设计" 收藏了您的资源',
      time: '2小时前',
      isRead: true,
      userName: '李设计',
      resourceName: '代码审查助手'
    },
    {
      id: '5',
      type: 'featured',
      title: '资源被设为精选',
      description: '恭喜！您的资源 "营销文案生成器" 被管理员设为精选资源',
      time: '3小时前',
      isRead: true,
      resourceName: '营销文案生成器'
    }
  ])

  // 管理员通知（仅在管理员模式下显示）
  const [adminNotifications] = useState<NotificationItem[]>([
    {
      id: '6',
      type: 'audit',
      title: '资源待审核',
      description: '有 3 个新资源需要审核：智能代码补全工具、自动化测试框架、数据分析平台',
      time: '10分钟前',
      isRead: false
    },
    {
      id: '7',
      type: 'sync_error',
      title: '节点同步异常',
      description: '节点 "cluster-node-02" 同步失败，请检查网络连接和节点状态',
      time: '30分钟前',
      isRead: false
    },
    {
      id: '8',
      type: 'monitor_error',
      title: '系统监控异常',
      description: 'CPU 使用率超过 85%，当前使用率：89.2%',
      time: '1小时前',
      isRead: true
    }
  ])

  const isAdmin = true // 这里可以根据实际的用户角色来判断

  const getNotificationIcon = (type: NotificationItem['type']) => {
    const iconClass = "h-5 w-5"
    switch (type) {
      case 'approval':
        return <CheckCircle className={`${iconClass} text-green-500`} />
      case 'comment':
        return <MessageCircle className={`${iconClass} text-blue-500`} />
      case 'download':
        return <Download className={`${iconClass} text-purple-500`} />
      case 'favorite':
        return <Star className={`${iconClass} text-yellow-500`} />
      case 'featured':
        return <Award className={`${iconClass} text-orange-500`} />
      case 'audit':
        return <Shield className={`${iconClass} text-indigo-500`} />
      case 'sync_error':
        return <Server className={`${iconClass} text-red-500`} />
      case 'monitor_error':
        return <AlertTriangle className={`${iconClass} text-red-500`} />
      default:
        return <Bell className={iconClass} />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })))
  }

  const allNotifications = [
    ...(activeTab === 'all' ? notifications.filter(n => !n.isRead) : notifications),
    ...(isAdmin && activeTab === 'all' ? adminNotifications : [])
  ]

  const unreadCount = notifications.filter(n => !n.isRead).length + (isAdmin ? adminNotifications.filter(n => !n.isRead).length : 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">消息通知</h1>
            <p className="text-muted-foreground mt-2">查看您的最新通知和消息</p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              全部标记为已读
            </Button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
          >
            全部通知
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </Button>
          <Button
            variant={activeTab === 'unread' ? 'default' : 'outline'}
            onClick={() => setActiveTab('unread')}
          >
            未读通知
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {allNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">暂无通知</p>
              </CardContent>
            </Card>
          ) : (
            allNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all hover:shadow-md ${
                  !notification.isRead ? 'border-l-4 border-l-primary' : ''
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-lg">
                            {notification.title}
                          </CardTitle>
                          {!notification.isRead && (
                            <Badge variant="default" className="text-xs">
                              新
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="mt-1">
                          {notification.description}
                        </CardDescription>
                        {notification.resourceName && (
                          <div className="mt-2">
                            <Badge 
                              variant="outline" 
                              className="cursor-pointer hover:bg-accent"
                              onClick={() => setCurrentPage('detail')}
                            >
                              {notification.resourceName}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {notification.time}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {!notification.isRead && (
                            <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                              标记为已读
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            删除通知
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}