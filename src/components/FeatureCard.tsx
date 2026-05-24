import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
}

export function FeatureCard({ icon, title, description, children }: Props) {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {children}
        </CardContent>
      </Card>
    </div>
  )
}
