import type { AxiosResponse } from "axios";
import { useState } from "react";
import { useTable } from "@/application/shared/hooks/use-table";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/application/shared/components/ui/alert-dialog";
import { LoadingButton } from "../ui/loading-button";

interface Props {
  title: string;
  subtitle: string;
  onConfirm(): Promise<AxiosResponse<void>>;
  isLoading: boolean;
}

export const TableDeleteDialog: React.FC<Props> = ({ title, subtitle, onConfirm, isLoading }) => {
  const { isDeleteDialogOpen, setIsDeleteDialogOpen } = useTable();
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  const handleConfirm = async () => {
    if (isLocalLoading) return;
    
    setIsLocalLoading(true);
    try {
      await onConfirm();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Erro ao deletar:', error);
    } finally {
      setIsLocalLoading(false);
    }
  };

  const handleCancel = () => {
    if (!isLocalLoading && !isLoading) {
      setIsDeleteDialogOpen(false);
    }
  };

  const isAnyLoading = isLocalLoading || isLoading;

  return (
    <AlertDialog 
      open={isDeleteDialogOpen} 
      onOpenChange={isAnyLoading ? undefined : handleCancel}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {subtitle}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isAnyLoading}>Cancelar</AlertDialogCancel>
          <LoadingButton 
            isLoading={isAnyLoading} 
            variant="destructive"
            onClick={handleConfirm}
            disabled={isAnyLoading}
          >
            Remover
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
