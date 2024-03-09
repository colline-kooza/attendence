import { useTheme } from "next-themes"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts"

import { useConfig } from "@/hooks/use-config"
import { ThemesTabs } from "../ThemeTabs"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { themes } from "@/registery/themes"


const data = [
  {
    revenue: 10400,
    subscription: 240,
  },
  {
    revenue: 14405,
    subscription: 300,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 189,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11244,
    subscription: 278,
  },
  {
    revenue: 26475,
    subscription: 189,
  },
]

export function CardsStats() { 
    const { theme: mode } = useTheme();
    const [config] = useConfig()

    const theme = themes.find((theme) => theme.name === config.theme)

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">


      {/* studentCard */}
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        </CardHeader>
        <CardContent className="flex items-center gap-4 w-full">
        <div className=" w-[40%]">
          <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxhdmF0YXJ8ZW58MHwwfHx8MTY5MTg0NzYxMHww&ixlib=rb-4.0.3&q=80&w=1080"
          className="w-28 group-hover:w-36 group-hover:h-36 h-28 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
         />
          </div>
       <div className="w-[60%] flex flex-col gap-3 lg:gap-1 items-center">
       <h2 className=" font-bold text-xl lg:text-lg line-clamp-1">WASSWA COLLINE</h2>
          <p className="text-xs text-muted-foreground">
           Senior Dev At Desishub
          </p>

       </div>
          
        </CardContent>

      </Card>




      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
          <div className="mt-4 h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar
                  dataKey="subscription"
                  style={
                    {
                      fill: "var(--theme-primary)",
                      opacity: 1,
                      "--theme-primary": `hsl(${
                        theme?.cssVars[mode === "dark" ? "dark" : "light"]
                          .primary
                      })`,
                    } as React.CSSProperties
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}