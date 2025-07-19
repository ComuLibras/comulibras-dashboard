import { useMemo, useState } from "react";
import { TableProviderContext } from "../hooks/use-table";

interface TableProviderProps {
  children: React.ReactNode;
}

export function TableProvider({ children }: TableProviderProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const [isCustomModalOpen, setIsCustomModalOpen] = useState<Record<string, boolean>>({});

  function handleCustomModalOpen(modal: string, value: boolean) {
    setIsCustomModalOpen((prevState) => ({
      ...prevState,
      [modal]: value
    }));
  }

  const value = useMemo(() => ({
    selectedId,
    setSelectedId,
    isDeleteDialogOpen,
    isAddDialogOpen,
    isEditDialogOpen,
    setIsDeleteDialogOpen,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    isCustomModalOpen,
    handleCustomModalOpen
  }), [isDeleteDialogOpen, isEditDialogOpen, isAddDialogOpen, selectedId, isCustomModalOpen]);

  return (
    <TableProviderContext.Provider value={value}>
      {children}
    </TableProviderContext.Provider>
  )
}
