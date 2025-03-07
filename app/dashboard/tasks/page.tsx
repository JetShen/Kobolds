"use client"

import { useState } from "react"
import { 
  ArrowUpDown, 
  CheckCircle, 
  Clock, 
  Filter, 
  Plus, 
  Search 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Header } from "@/components/dashboard/header"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for tasks
const tasks = [
  {
    id: "1",
    title: "Website Redesign",
    description: "Update the company website with new branding",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: "2025-06-15",
    assignee: "John Doe",
  },
  {
    id: "2",
    title: "API Integration",
    description: "Integrate payment gateway API",
    status: "CREATED",
    priority: "MEDIUM",
    dueDate: "2025-06-20",
    assignee: null,
  },
  {
    id: "3",
    title: "Database Optimization",
    description: "Optimize database queries for better performance",
    status: "ASSIGNED",
    priority: "HIGH",
    dueDate: "2025-06-10",
    assignee: "Jane Smith",
  },
  {
    id: "4",
    title: "User Documentation",
    description: "Create user documentation for the new features",
    status: "COMPLETED",
    priority: "LOW",
    dueDate: "2025-06-05",
    assignee: "John Doe",
  },
  {
    id: "5",
    title: "Bug Fixes",
    description: "Fix reported bugs in the application",
    status: "IN_PROGRESS",
    priority: "URGENT",
    dueDate: "2025-06-08",
    assignee: "John Doe",
  },
  {
    id: "6",
    title: "Security Audit",
    description: "Perform security audit of the application",
    status: "ASSIGNED",
    priority: "HIGH",
    dueDate: "2025-06-25",
    assignee: "Jane Smith",
  },
  {
    id: "7",
    title: "Mobile App Testing",
    description: "Test the mobile app on different devices",
    status: "CREATED",
    priority: "MEDIUM",
    dueDate: "2025-06-30",
    assignee: null,
  },
  {
    id: "8",
    title: "Performance Optimization",
    description: "Optimize application performance",
    status: "COMPLETED",
    priority: "MEDIUM",
    dueDate: "2025-06-02",
    assignee: "John Doe",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "CREATED":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    case "ASSIGNED":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
    case "IN_PROGRESS":
      return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
    case "COMPLETED":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "CREATED":
      return "Created"
    case "ASSIGNED":
      return "Assigned"
    case "IN_PROGRESS":
      return "In Progress"
    case "COMPLETED":
      return "Completed"
    default:
      return status
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "LOW":
      return "bg-blue-500/10 text-blue-500"
    case "MEDIUM":
      return "bg-yellow-500/10 text-yellow-500"
    case "HIGH":
      return "bg-orange-500/10 text-orange-500"
    case "URGENT":
      return "bg-red-500/10 text-red-500"
    default:
      return "bg-gray-500/10 text-gray-500"
  }
}

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [priorityFilter, setPriorityFilter] = useState("ALL")
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "ALL" || task.status === statusFilter
    const matchesPriority = priorityFilter === "ALL" || task.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })
  
  const createdTasks = filteredTasks.filter(task => task.status === "CREATED")
  const assignedTasks = filteredTasks.filter(task => task.status === "ASSIGNED")
  const inProgressTasks = filteredTasks.filter(task => task.status === "IN_PROGRESS")
  const completedTasks = filteredTasks.filter(task => task.status === "COMPLETED")
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Tasks" />
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="CREATED">Created</SelectItem>
                <SelectItem value="ASSIGNED">Assigned</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Priorities</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="ml-auto">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="kanban" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="kanban" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    Created
                    <Badge variant="outline" className="ml-2">{createdTasks.length}</Badge>
                  </h3>
                </div>
                
                {createdTasks.map(task => (
                  <Card key={task.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        <span>{task.assignee || "Unassigned"}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    Assigned
                    <Badge variant="outline" className="ml-2">{assignedTasks.length}</Badge>
                  </h3>
                </div>
                
                {assignedTasks.map(task => (
                  <Card key={task.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        <span>{task.assignee || "Unassigned"}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium flex items-center">
                    <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                    In Progress
                    <Badge variant="outline" className="ml-2">{inProgressTasks.length}</Badge>
                  </h3>
                </div>
                
                {inProgressTasks.map(task => (
                  <Card key={task.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        <span>{task.assignee || "Unassigned"}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    Completed
                    <Badge variant="outline" className="ml-2">{completedTasks.length}</Badge>
                  </h3>
                </div>
                
                {completedTasks.map(task => (
                  <Card key={task.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        <span>{task.assignee || "Unassigned"}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="w-full">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                <div className="col-span-5 flex items-center">
                  <Button variant="ghost" className="p-0 h-auto font-medium">
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Priority</div>
                <div className="col-span-2">Due Date</div>
                <div className="col-span-1">Assignee</div>
              </div>
              
              {filteredTasks.map(task => (
                <div key={task.id} className="grid grid-cols-12 gap-2 p-4 border-b hover:bg-muted/50 cursor-pointer">
                  <div className="col-span-5">
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">{task.description}</div>
                  </div>
                  <div className="col-span-2">
                    <Badge className={getStatusColor(task.status)}>
                      {getStatusLabel(task.status)}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="col-span-2 text-sm">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  <div className="col-span-1 text-sm">
                    {task.assignee || "—"}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}