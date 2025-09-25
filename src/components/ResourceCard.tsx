import { Star, Download, Heart, Eye, Tag, Clock } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface ResourceCardProps {
  resource: {
    id: string
    title: string
    description: string
    author: string
    authorAvatar?: string
    category: string
    tags: string[]
    rating: number
    downloads: number
    views: number
    thumbnail?: string
    isFeatured?: boolean
    uploadDate: string
    version: string
  }
  onView?: (id: string) => void
}

export function ResourceCard({ resource, onView }: ResourceCardProps) {
  const {
    title,
    description,
    author,
    authorAvatar,
    category,
    tags,
    rating,
    downloads,
    views,
    thumbnail,
    isFeatured,
    uploadDate,
    version
  } = resource

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/20">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          {thumbnail ? (
            <ImageWithFallback
              src={thumbnail}
              alt={title}
              className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="h-40 w-full flex items-center justify-center">
              <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Tag className="h-8 w-8 text-white" />
              </div>
            </div>
          )}
          
          {isFeatured && (
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              精选
            </Badge>
          )}
          
          <div className="absolute top-2 right-2 flex items-center space-x-1">
            <Badge variant="secondary" className="bg-white/90 text-gray-800">
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {description}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={authorAvatar} alt={author} />
              <AvatarFallback className="text-xs">{author[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{author}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">v{version}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>{downloads.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{views.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              onClick={() => onView?.(resource.id)}
              className="h-8"
            >
              查看详情
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-2 pt-2 border-t text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{uploadDate}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}