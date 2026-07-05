"use client";

import { createContext, useState } from "react";
import Alert from "./Alert";

export interface AlertOptions {
  title: string;
  sub: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
}

export const AlertContext = createContext<AlertContextType | null>(null);

export default function AlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [alert, setAlert] = useState<AlertOptions | null>(null);

  const showAlert = (options: AlertOptions) => {
    setAlert(options);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {alert && (
        <Alert
          show={true}
          title={alert.title}
          sub={alert.sub}
          type={alert.type}
          duration={alert.duration}
          onClose={() => setAlert(null)}
        />
      )}
    </AlertContext.Provider>
  );
}