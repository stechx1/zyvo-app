import React, { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CustomDialogProps {
  button: ReactNode;
  title?: string;
  description?: string;
  body: ReactNode;
}

export function CustomDialog({
  button,
  title,
  description,
  body,
}: CustomDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="flex items-center space-x-2">{body}</div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
