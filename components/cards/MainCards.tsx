import getData from "@/utils/getData";
import { CardsCalendar } from "./Calendar";
import { CardsStats } from "./CardStats";
import { CardsActivityGoal } from "./CardsActivity";
import CardsShare from "./CardsShare";
import { CardsTeamMembers } from "./CardsTeam";
import { CardsCookieSettings } from "./Cookie";
import { CardsDataTable } from "./DataTable";
import { CardsMetric } from "./Metrics";
import { DemoNotifications } from "./Notifications";
import { CardsReportIssue } from "./Report-issue";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CardsStat from "./CardsStat";
export default async function MainCards() {
  const checkIns=await getData("/check-in")
  const checkOuts=await getData("/check-out")
  const students=await getData("/students")
  return (
    <>
     <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center justify-center lg:justify-start">
              <TabsList>
                <TabsTrigger value="all">Latest Arrivals</TabsTrigger>
                <TabsTrigger value="draft">Student</TabsTrigger>
                <TabsTrigger value="active">Overall </TabsTrigger>
                {/* <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger> */}
              </TabsList>
            </div>
            <TabsContent value="all">
              <CardsShare students={students} checkOuts={checkOuts}/>
            </TabsContent>
            <TabsContent value="active">
              <CardsStat studentsData={students} checkOutData={checkOuts} checkInData={checkIns}/>
            {/* <CardsTeamMembers studentsData={students} checkOutData={checkOuts} checkInData={checkIns}/> */}
            </TabsContent>
            <TabsContent value="draft">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3 w-full grid-cols-1 lg:mt-8 mt-6">
              
                <div>
                <CardsMetric/>
                </div>

                <div className="">
                 <CardsActivityGoal/>
                </div>

                <div>
                <CardsStats/>
                </div>

                {/* <div>
               <CardsDataTable />
                </div> */}
              </div>
              {/* <CardsShare students={students} checkOuts={checkOuts}/> */}
            </TabsContent>
          </Tabs>
      </main>
    </>
    // <div className="md:grids-col-2 grid md:gap-4 lg:grid-cols-10 xl:grid-cols-11 xl:gap-4 w-full mt-2 overflow-hidden">
    //   <div className="space-y-4 lg:col-span-8 xl:col-span-6 xl:space-y-4">
    //     <CardsStats />
        
    //     <div className="grid gap-1 sm:grid-cols-[280px_1fr] md:hidden">
    //       <CardsCalendar />
    //       <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-4">
    //         {/* <CardsActivityGoal /> */}
           
    //       </div>
    //       <div className="pt-3 sm:col-span-2 xl:pt-4">
    //         <CardsMetric />
    //       </div>
    //     </div>
    //     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
    //       <div className="space-y-4 xl:space-y-4">
    //       <CardsActivityGoal />
    //         {/* <CardsTeamMembers /> */}
    //         {/* <CardsCookieSettings /> */}
    //       </div>
    //       <div className="space-y-4 xl:space-y-4">
    //         <div className="xl:block">

    //         <CardsTeamMembers studentsData={students} checkOutData={checkOuts} checkInData={checkIns}/>
    //           {/* <CardsReportIssue /> */}
    //           {/* <DemoNotifications/> */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4">
    //     <div className="hidden gap-1 sm:grid-cols-[280px_1fr] md:grid">
    //       <CardsCalendar />
    //       <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-3">
    //         {/* <CardsActivityGoal /> */}
    //         <CardsMetric/>
    //       </div>
    
    //     </div>
    //     <div className="hidden ">
    //       <CardsDataTable />
    //     </div>
    //     <CardsShare students={students} checkOuts={checkOuts}/>
    //   </div>
    // </div>
  )
}