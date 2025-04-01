import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type Task = {
  title: string;
  description: string;
  status: "CREATED" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate: string;
  assignee: string | null;
  companyId: string;
  team?: string;
  sector?: string;
};

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => Promise<void>;
  companyId: string;
  teams?: {  name: string }[];
  sectors?: { name: string }[];
  users?: { name: string | null }[];
}

export const NewTaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  companyId,
  teams = [],
  sectors = [],
  users = [],
}: NewTaskModalProps) => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    status: "CREATED",
    priority: "MEDIUM",
    dueDate: "",
    assignee: null,
    companyId,
    team: "",
    sector: "",
  });

  // console.log("Teams:", teams);
  // console.log("Sectors:", sectors);
  // console.log("Users:", users);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(task);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="title"
            placeholder="Title"
            value={task.title}
            onChange={handleChange}
            required
          />
          <Input
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
            required
          />
          <Select
            name="status"
            value={task.status}
            onValueChange={(value) => setTask((prev) => ({ ...prev, status: value as Task["status"] }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CREATED">Created</SelectItem>
              <SelectItem value="ASSIGNED">Assigned</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select
            name="priority"
            value={task.priority}
            onValueChange={(value) => setTask((prev) => ({ ...prev, priority: value as Task["priority"] }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="URGENT">Urgent</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
          <Select
            name="assignee"
            value={task.assignee ?? ""}
            onValueChange={(value) => setTask((prev) => ({ ...prev, assignee: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Assignee" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user, y) => (
                <SelectItem key={y} value={user.name?? "Unassigned Name"}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {teams.length > 0 && (
            <Select
              name="team"
              value={task.team ?? ""}
              onValueChange={(value) => setTask((prev) => ({ ...prev, team: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team, j) => (
                  <SelectItem key={j} value={team.name}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {sectors.length > 0 && (
            <Select
              name="sector"
              value={task.sector ?? ""}
              onValueChange={(value) => setTask((prev) => ({ ...prev, sector: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector, x) => (
                  <SelectItem key={x} value={sector.name}>
                    {sector.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};