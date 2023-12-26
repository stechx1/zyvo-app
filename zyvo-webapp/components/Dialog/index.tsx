import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface CustomDialogProps {
  title?: string;
  description?: string;
  children: ReactNode;
  open: boolean;
}

export function CustomDialog({ children, open }: CustomDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="p-0 py-2">
        {children}
      </DialogContent>
    </Dialog>
  );
}
