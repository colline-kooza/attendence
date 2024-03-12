"use client"
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";

const teamMembers = [
  {
    id: 1,
    name: "Muk John Baptist",
    email: "m@example.com",
    avatarSrc: "/avatars/01.png",
    avatarFallback: "JB",
    role: "Owner",
    roleOptions: ["Mentor", "Developer",  "Owner"],
    roleDescription: [
      "Manager Desishub",
    ]
  },
  {
    id: 2,
    name: "Manage Irod",
    email: "p@example.com",
    avatarSrc: "/avatars/02.png",
    avatarFallback: "MI",
    role: "Member",
    roleOptions: ["Manger", "Student Head", "Developer", ],
    roleDescription: [
      "Head of students ",
    ]
  },
  {
    id: 3,
    name: "Kooza Collinz",
    email: "k@example.com",
    avatarSrc: "/avatars/03.png",
    avatarFallback: "KC",
    role: "Member",
    roleOptions: ["Mentor", "Developer", "Welfare", "Developer", ],
    roleDescription: [
      "Role description for Welfare",
    ]
  },
  {
    id: 4,
    name: "Ian Custor",
    email: "i@example.com",
    avatarSrc: "/avatars/04.png",
    avatarFallback: "IC",
    role: "Member",
    roleOptions: ["Digital Marketer" , "Developer"],
    roleDescription: [
      "Role description for Digital Marketer",
    ]
  },
  {
    id: 5,
    name: "Kisakya Moses",
    email: "kisakya@example.com",
    avatarSrc: "/avatars/05.png",
    avatarFallback: "KM",
    role: "Member",
    roleOptions: ["Digital Marketer" , "Developer", ],
    roleDescription: [
      "Role description for Digital Marketer",
    ]
  }
];


export function CardsTeamMembers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Desishub Team Members 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {teamMembers.map(member => (
          <div key={member.id} className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={member.avatarSrc} alt="Image" />
                <AvatarFallback>{member.avatarFallback}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                  {member.role}{" "}
                  <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="end">
                <Command>
                  <CommandInput placeholder="Select new role..." />
                  <CommandList>
                    <CommandEmpty>No roles found.</CommandEmpty>
                    <CommandGroup>
                      {member.roleOptions.map((role, index) => (
                        <CommandItem key={index} className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                          <p>{role}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.roleDescription[index]}
                          </p>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
