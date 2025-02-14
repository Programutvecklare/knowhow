'use client'

import { authClient } from '@/lib/auth-client'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Skeleton } from './ui/skeleton'
import { Progress } from './ui/progress'

export default function Navbar({ xp }: { xp: number }) {
  const { data: session, isPending } = authClient.useSession()

  const router = useRouter()
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh()
        },
      },
    })
  }

  const XP_PER_LEVEL = 150

  function calculateLevel(xp: number): number {
    return Math.floor(xp / XP_PER_LEVEL) + 1
  }

  function getXPForNextLevel(currentXP: number): number {
    const currentLevel = calculateLevel(currentXP)
    return currentLevel * XP_PER_LEVEL
  }

  const currentLevel = calculateLevel(xp)
  const nextLevelXP = getXPForNextLevel(xp)
  const currentLevelXP = (currentLevel - 1) * XP_PER_LEVEL
  const progressToNextLevel =
    ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100

  return (
    <nav className="sticky top-0 z-50 border-b bg-white dark:bg-black h-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold">Knowhow</span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/challenges" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Challenges
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-4">
            {isPending ? (
              <Skeleton className="relative size-10 rounded-full" />
            ) : session ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex justify-center items-center p-1 rounded-full">
                      <Zap />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col gap-1">
                        <p>{xp} XP</p>
                        <Progress
                          value={progressToNextLevel}
                          className="w-full"
                        />
                        <div className="flex items-center justify-between text-sm">
                          <p>Level {currentLevel}</p>
                          <div>
                            <span className="text-muted-foreground">
                              {nextLevelXP - xp} XP to
                            </span>{' '}
                            Level {currentLevel + 1}
                          </div>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative size-10 rounded-full"
                    >
                      <Avatar className="size-10">
                        <AvatarImage
                          src={session?.user?.image || undefined}
                          alt={session?.user?.name || undefined}
                        />
                        <AvatarFallback>
                          {session?.user?.name?.[0] || <User />}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session?.user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session?.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
