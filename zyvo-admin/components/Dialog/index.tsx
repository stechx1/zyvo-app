import React, { ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface CustomDialogProps {
  title?: string;
  description?: string;
  children: ReactNode;
  open: boolean;
  onClose: (val: boolean) => void;
}

export function CustomDialog({ children, open, onClose }: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => onClose(!open)}>
      <DialogContent className="p-0 py-2">{children}</DialogContent>
    </Dialog>
  );
}
