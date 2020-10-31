interface TaskCollection {
  id: number;
  owner: User;
  deletable: boolean;

  label: string;

  tasks: Task[];
}
