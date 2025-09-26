import { Search, User, Bell, Menu, Sun, Moon, Download, Star, Zap } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface HeaderProps {
  currentPage: string
  setCurrentPage: (page: string) => void
  isDark: boolean
  setIsDark: (isDark: boolean) => void
}

export function Header({ currentPage, setCurrentPage, isDark, setIsDark }: HeaderProps) {
  const navigation = [
    { name: '首页', id: 'home' },
    { name: '资源市场', id: 'browse' },
    { name: '社区', id: 'community' }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl tracking-tight">AI-ResourceHub</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Search */}
        <div className="flex flex-1 items-center justify-center px-6 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索资源、作者、标签..."
              className="w-full pl-10 pr-4"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="h-9 w-9"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Upload button */}
          <Button
            onClick={() => setCurrentPage('upload')}
            className="hidden sm:inline-flex"
          >
            上传资源
          </Button>

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-9 w-9"
            onClick={() => setCurrentPage('notifications')}
          >
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
              3
            </Badge>
          </Button>

          {/* User menu */}
          <div className="flex items-center space-x-2">
            {/* Direct profile link */}
            <Avatar 
              className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={() => setCurrentPage('profile')}
            >
              <AvatarImage src="/placeholder-avatar.jpg" alt="用户头像" />
              <AvatarFallback>用户</AvatarFallback>
            </Avatar>
            
            {/* Dropdown menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="text-sm">开发者123</p>
                  <p className="text-xs text-muted-foreground">积分: 1,250</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setCurrentPage('profile')}>
                <User className="mr-2 h-4 w-4" />
                个人主页
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setCurrentPage('favorites')}>
                <Star className="mr-2 h-4 w-4" />
                我的收藏
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setCurrentPage('admin')}>
                管理后台
              </DropdownMenuItem>
              <DropdownMenuItem>
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>

          {/* Mobile menu */}
          <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}