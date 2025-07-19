import { createContext, useContext } from "react";


export interface TableProviderState {
  selectedId: string | null;
  setSelectedId(id: string): void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen(b: boolean): void;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen(b: boolean): void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen(b: boolean): void;
  isCustomModalOpen: Record<string, boolean>;
  handleCustomModalOpen(modal: string, value: boolean): void;
}

const initialState: TableProviderState = {
  selectedId: null,
  setSelectedId: () => null,
  isDeleteDialogOpen: false,
  setIsDeleteDialogOpen: () => null,
  isAddDialogOpen: false,
  setIsAddDialogOpen: () => null,
  isEditDialogOpen: false,
  setIsEditDialogOpen: () => null,
  isCustomModalOpen: {},
  handleCustomModalOpen: () => null,
}


export const TableProviderContext = createContext<TableProviderState>(initialState);

export const useTable = () => {
  const context = useContext(TableProviderContext)

  if (context === undefined)
    throw new Error("useTable must be used within a TableProvider")

  return context;
}
