import { useTable } from "@/application/shared/hooks/use-table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/application/shared/components/ui/dialog";

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const TableFormEditDialog: React.FC<Props> = ({ title, subtitle, children }) => {
  const { isEditDialogOpen, setIsEditDialogOpen } = useTable();

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[470px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {subtitle}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
