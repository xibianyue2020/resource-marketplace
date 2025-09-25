import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { HomePage } from './components/HomePage'
import { ResourceBrowse } from './components/ResourceBrowse'
import { ResourceDetail } from './components/ResourceDetail'
import { UploadResource } from './components/UploadResource'
import { UserProfile } from './components/UserProfile'
import { Community } from './components/Community'
import { AdminPanel } from './components/AdminPanel'
import { Notifications } from './components/Notifications'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isDark, setIsDark] = useState(false)

  // 监听系统主题偏好
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // 应用主题
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />
      case 'browse':
        return <ResourceBrowse setCurrentPage={setCurrentPage} />
      case 'detail':
        return <ResourceDetail setCurrentPage={setCurrentPage} />
      case 'upload':
        return <UploadResource setCurrentPage={setCurrentPage} />
      case 'profile':
      case 'favorites':
        return <UserProfile setCurrentPage={setCurrentPage} />
      case 'community':
      case 'leaderboard':
        return <Community setCurrentPage={setCurrentPage} />
      case 'admin':
        return <AdminPanel setCurrentPage={setCurrentPage} />
      case 'notifications':
        return <Notifications setCurrentPage={setCurrentPage} />
      default:
        return <HomePage setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isDark={isDark}
        setIsDark={setIsDark}
      />
      <main>
        {renderCurrentPage()}
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg mb-4">ResourceHub</h3>
              <p className="text-sm text-muted-foreground">
                专业的AI资源市场平台，为开发者提供优质的工具和模板。
              </p>
            </div>
            <div>
              <h4 className="text-sm mb-4">产品</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => setCurrentPage('browse')}>资源市场</button></li>
                <li><button onClick={() => setCurrentPage('upload')}>上传资源</button></li>
                <li><button onClick={() => setCurrentPage('community')}>社区</button></li>
                <li><button onClick={() => setCurrentPage('admin')}>开发者工具</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm mb-4">支持</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">帮助中心</a></li>
                <li><a href="#" className="hover:text-foreground">API 文档</a></li>
                <li><a href="#" className="hover:text-foreground">联系我们</a></li>
                <li><a href="#" className="hover:text-foreground">状态页面</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm mb-4">法律</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">服务条款</a></li>
                <li><a href="#" className="hover:text-foreground">隐私政策</a></li>
                <li><a href="#" className="hover:text-foreground">版权政策</a></li>
                <li><a href="#" className="hover:text-foreground">安全</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 ResourceHub. 保留所有权利。
            </p>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsDark(!isDark)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {isDark ? '浅色模式' : '深色模式'}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}