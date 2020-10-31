interface SubTask {
  id: number;

  checked: boolean;
  label: string;
  description: string;
  priority: number;

  expirationDate: Date;
  remindingDate: Date;
  checkDate: Date;
  creationDate: Date;
}
