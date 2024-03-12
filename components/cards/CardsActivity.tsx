"use client"

import * as React from "react"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { useConfig } from "@/hooks/use-config"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { ThemesTabs } from "../ThemeTabs"
import { themes } from "@/registery/themes"


const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]

export function CardsActivityGoal() {
  const { theme: mode } = useTheme()
  const [config] = useConfig()
  const theme = themes.find((theme) => theme.name === config.theme)

  const [goal, setGoal] = React.useState(() => {
    const storedGoal = localStorage.getItem("codingGoal")
    return storedGoal ? parseInt(storedGoal, 10) : 1
  })

  const [countdown, setCountdown] = React.useState(0)

  React.useEffect(() => {
    const storedGoal = localStorage.getItem("codingGoal")
    const storedCountdown = localStorage.getItem("countdown")
    if (storedGoal && storedCountdown) {
      const remainingTime = Math.max(0, parseInt(storedGoal, 10) - (Date.now() - parseInt(storedCountdown, 10)))
      if (remainingTime > 0) {
        setCountdown(remainingTime)
      } else {
        setCountdown(0)
      }
    }
  }, [])

  const startCountdown = () => {
    const endTime = Date.now() + goal * 3600000; 
    setCountdown(goal * 3600000);
    localStorage.setItem("codingGoal", String(goal));
    localStorage.setItem("countdown", String(endTime));
    const countdownInterval = setInterval(() => {
      const remainingTime = Math.max(0, endTime - Date.now());
      const hours = Math.floor(remainingTime / 3600000);
      const minutes = Math.floor((remainingTime % 3600000) / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);
      if (remainingTime === 0) {
        clearInterval(countdownInterval);
        localStorage.removeItem("codingGoal");
        localStorage.removeItem("countdown");
      }
      setCountdown(remainingTime);
    }, 1000);
  };
  
  const onClick = (adjustment: number) => {
    setGoal((prevGoal) => Math.max(1, Math.min(100, prevGoal + adjustment)))
  }


  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Move Goal</CardTitle>
        <CardDescription>Set your daily Coding goal.</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-center space-x-2">
        <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(-1)}
            disabled={goal <= 1}
          >
            <MinusIcon className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-5xl font-bold tracking-tighter">{goal}</div>
            <div className="text-[0.70rem] uppercase text-muted-foreground">
             Hours/day
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(1)}
            disabled={goal >= 100}
          >
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
        {countdown !== null && (
          <div className="my-3 h-[60px]">
            <div className="text-center text-lg font-semibold">
              Time remaining: {Math.floor(countdown / 3600000)} hours {Math.floor((countdown % 3600000) / 60000)} minutes {Math.floor((countdown % 60000) / 1000)} seconds
            </div>
          </div>
        )}
        <div className="my-3 h-[60px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar
                dataKey="goal"
                style={
                  {
                    fill: "var(--theme-primary)",
                    opacity: 0.2,
                    "--theme-primary": `hsl(${
                      theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                    })`,
                  } as React.CSSProperties
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
      <Button className="w-full" onClick={startCountdown}>
          Set Goal
        </Button>
      </CardFooter>
    </Card>
  )
}


