import type { AxiosResponse } from "axios";
import { useTable } from "@/application/shared/hooks/use-table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/application/shared/components/ui/alert-dialog";
import { buttonVariants } from "@/application/shared/components/ui/button";
import { LoadingButton } from "../ui/loading-button";

interface Props {
  title: string;
  subtitle: string;
  onConfirm(): Promise<AxiosResponse<void>>;
  isLoading: boolean;
}

export const TableDeleteDialog: React.FC<Props> = ({ title, subtitle, onConfirm, isLoading }) => {
  const { isDeleteDialogOpen, setIsDeleteDialogOpen } = useTable();

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {subtitle}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className={buttonVariants({ variant: 'destructive', size: 'sm' })} onClick={onConfirm} asChild>
            <LoadingButton isLoading={isLoading} variant="destructive">
              Remover
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
