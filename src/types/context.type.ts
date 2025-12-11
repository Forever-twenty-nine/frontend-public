import { NotificationType } from "@/utils/swal";

export interface INotification {
  message: string;
  type: NotificationType;
  duration?: number;
}

export interface GlobalContextType {
  notification: INotification | null;
  setNotification: React.Dispatch<React.SetStateAction<INotification | null>>;
}
