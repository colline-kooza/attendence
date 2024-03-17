  "use client"
  import { useState, useEffect } from 'react';
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
  import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
  import { ChevronDownIcon } from "lucide-react";
  import getData from '@/utils/getData';
  
  type Student = {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
  };
  
  type AttendanceRecord = {
    id: string;
    studentId: string;
    checkIn: string;
    checkOut: string;
    status: string;
  };
  
  export default function Admin() {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
    const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const studentsResponse = await getData("students");
          setStudents(studentsResponse);
          const attendanceResponse = await getData("check-in");
          setAttendance(attendanceResponse);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const fetchAttendanceRecords = async (studentId: string) => {
      setLoading(true);
      try {
        const response = await getData(`students/${studentId}`);
        console.log('Attendance records response:', response);
        setAttendanceRecords(response);
        if (Array.isArray(response)) {
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching attendance records:', error);
        setAttendanceRecords([]); // Reset to an empty array on error
      } finally {
        setLoading(false);
      }
    };
  
    const calculateTotalHours = (data: AttendanceRecord[]) => {
      let totalHours = 0;
      for (const item of data) {
        const checkinTime = new Date(item?.checkIn || 0);
        const checkoutTime = new Date(item?.checkOut || 0);
        const hours = (checkoutTime?.getTime() - checkinTime.getTime()) / (1000 * 60 * 60);
        totalHours += hours;
      }
      return totalHours;
    };
  
    const findAttendanceForStudent = (studentId: string) => {
      return attendance.filter(record => record.studentId === studentId);
    };
    const findEarliestCheckIn = (studentId: string): string | null => {
      const studentAttendance = findAttendanceForStudent(studentId);
      if (studentAttendance.length === 0) {
        return 'No check-ins';
      }
      const earliestCheckIn = studentAttendance.reduce((earliest, current) => {
        const currentCheckIn = new Date(current.checkIn);
        return earliest === null || currentCheckIn < earliest ? currentCheckIn : earliest;
      }, null as Date | null);
    
      return earliestCheckIn ? earliestCheckIn.toLocaleString() : 'No check-ins';
    };
    
    return (
      <>
        <Card className='lg:p-8 lg:w-[90%] mt-8 lg:ml-8'>
          <CardHeader>
            <CardTitle>Students</CardTitle>
            <CardDescription>List of all students</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {students?.map(student => (
              <div key={student.id} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={student.image} alt={student.name} />
                    <AvatarFallback>{student.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto"
                      onClick={() => {
                        setSelectedStudent(student);
                        fetchAttendanceRecords(student.id);
                      }}
                    >
                      Details <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="end">
                    {selectedStudent === student && (
                      <div>
                        {loading ? (
                          <p>Loading...</p>
                        ) : attendanceRecords?.length === 0 ? (
                          <p>No records available</p>
                        ) : (
                          <div>
                            <ul>
                              {attendanceRecords?.map((record, index) => (
                                <li key={index}>
                                  Check-in: {new Date(record?.checkIn || '').toLocaleString()}, Check-out: {new Date(record?.checkOut || '').toLocaleString()}
                                </li>
                              ))}
                            </ul>
                            {/* Display total time spent */}
                            <p>Total time spent: {calculateTotalHours(attendanceRecords)} hours</p>
                          </div>
                        )}
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </CardContent>
        </Card>
  
        {/* Table for attendance records */}
        <Card className='lg:p-8 lg:w-[90%] mt-8 lg:ml-8'>
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>List of attendance records for all students</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="table-container">
              <table className="min-w-full">
                <thead className='mb-4'>
                  <tr>
                    <th>Student Name</th>
                    <th>Check-in Date</th>
                    <th>Check-in Time</th>
                    <th>Check-out Date</th>
                    <th>Check-out Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{findAttendanceForStudent(student.id).map(record => new Date(record.checkIn).toLocaleDateString()).join(', ')}</td>
                      <td>{findAttendanceForStudent(student.id).map(record => new Date(record.checkIn).toLocaleTimeString()).join(', ')}</td>
                      <td>{findAttendanceForStudent(student.id).map(record => record.checkOut ? new Date(record.checkOut).toLocaleDateString() : 'Not checked out').join(', ')}</td>
                      <td>{findAttendanceForStudent(student.id).map(record => record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : '-').join(', ')}</td>
                      <td>{findAttendanceForStudent(student.id).map(record => record.status || 'Pending').join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
  
        {/* Card for earliest check-ins */}
        <Card className='lg:p-8 lg:w-[90%] mt-8 lg:ml-8'>
          <CardHeader>
            <CardTitle>Earliest Check-ins</CardTitle>
            <CardDescription>Earliest check-in time for each student</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {students.map(student => (
              <div key={student.id}>
                <p>Name: {student.name}</p>
                <p>Email: {student.email}</p>
                <p>Earliest Check-in: {findEarliestCheckIn(student.id)}</p>

              </div>
            ))}
          </CardContent>
        </Card>
      </>
    );
  }
  