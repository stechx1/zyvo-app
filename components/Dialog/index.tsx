import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export function CustomDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
        Share
        </button>
            
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
       
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
              Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
