import { triggerNotification } from "@/utils/swal";
import { GlobalContextType, INotification } from "@/types";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
} from "react";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<INotification | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        notification,
        setNotification,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
