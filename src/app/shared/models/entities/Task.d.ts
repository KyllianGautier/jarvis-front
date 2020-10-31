interface Task {
  id: number;

  owner: User;

  checked: boolean;
  label: string;
  description: string;
  priority: number;
  pinned: boolean;

  expirationDate: Date;
  remindingDate: Date;
  checkDate: Date;
  creationDate: Date;

  subTasks: SubTask[];
  tags: TaskTag[];
  sharedWithUsers: User[];

}
