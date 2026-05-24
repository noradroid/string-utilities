import { useState } from 'react'
import { ChevronLeft, ChevronRight, Menu, Moon, Sun, Type, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { useTheme } from '@/components/ThemeProvider'

export type UtilityId = 'string-generator' | 'text-counter'

const NAV_ITEMS: { id: UtilityId; label: string; icon: React.ReactNode }[] = [
  { id: 'string-generator', label: 'String Generator', icon: <Wand2 className="size-4 shrink-0" /> },
  { id: 'text-counter',     label: 'Text Counter',     icon: <Type  className="size-4 shrink-0" /> },
]

interface Props {
  active: UtilityId
  onSelect: (id: UtilityId) => void
  children: React.ReactNode
}

function NavLinks({
  active,
  onSelect,
  collapsed,
  onNavigate,
}: {
  active: UtilityId
  onSelect: (id: UtilityId) => void
  collapsed?: boolean
  onNavigate?: () => void
}) {
  return (
    <nav className="flex flex-col gap-1 p-2">
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => { onSelect(item.id); onNavigate?.() }}
          title={collapsed ? item.label : undefined}
          className={[
            'flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors text-left w-full',
            collapsed ? 'justify-center' : 'gap-2.5 px-3',
            active === item.id
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          ].join(' ')}
        >
          {item.icon}
          {!collapsed && item.label}
        </button>
      ))}
    </nav>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <Button variant="ghost" size="icon-sm" onClick={toggle} aria-label="Toggle theme">
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}

export function AppLayout({ active, onSelect, children }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-svh bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside
        className={[
          'hidden md:flex flex-col border-r border-border shrink-0 transition-all duration-200',
          collapsed ? 'w-12' : 'w-56',
        ].join(' ')}
      >
        <div className={[
          'flex items-center border-b border-border h-11 shrink-0',
          collapsed ? 'justify-center px-2' : 'justify-between px-3',
        ].join(' ')}>
          {!collapsed && <span className="font-semibold text-sm tracking-tight">Utilities</span>}
          {!collapsed && <ThemeToggle />}
          {collapsed && <ThemeToggle />}
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <NavLinks active={active} onSelect={onSelect} collapsed={collapsed} />
        </div>

        <div className={[
          'border-t border-border flex h-10 shrink-0',
          collapsed ? 'justify-center items-center' : 'justify-end items-center px-2',
        ].join(' ')}>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCollapsed(c => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </Button>
        </div>
      </aside>

      {/* Mobile top bar + content */}
      <div className="flex flex-col flex-1 min-w-0">
        <header className="flex md:hidden items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <span className="font-semibold text-sm tracking-tight">Utilities</span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Open menu">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-56 p-0">
                <SheetHeader className="px-4 py-3 border-b border-border">
                  <SheetTitle className="text-sm font-semibold">Utilities</SheetTitle>
                </SheetHeader>
                <Separator />
                <NavLinks active={active} onSelect={onSelect} onNavigate={() => setDrawerOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
