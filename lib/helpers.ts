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

const employees = [
    {
        id: "1",
        name: "John Doe",
    },
    {
        id: "2",
        name: "Jane Smith",
    },
    {
        id: "3",
        name: "Alice Johnson",
    },
    {
        id: "4",
        name: "Bob Brown",
    }
]

const teams = [
    {
        id: "1",
        name: "Development Team",
        members: ["John Doe", "Jane Smith", "Alice Johnson"],
    },
    {
        id: "2",
        name: "Design Team",
        members: ["Bob Brown"],
    },
    {
        id: "3",
        name: "Marketing Team",
        members: ["Alice Johnson", "Bob Brown"],
    },
]

const sectors = [
    {
        id: "1",
        name: "Engineering",
    },
    {
        id: "2",
        name: "Design",
    },
    {
        id: "3",
        name: "Marketing",
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


export { tasks, employees, sectors, teams, getStatusColor, getStatusLabel, getPriorityColor }