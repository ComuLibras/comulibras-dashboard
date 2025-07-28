import { type ColumnDef } from "@tanstack/react-table"

import { type Sentence } from "@/application/domain/dashboard/sentences/services/dto/sentences-dto"
import { Button } from "@/application/shared/components/ui/button"
import { Icon } from "@/application/shared/components/ui/icon"
import { Switch } from "@/application/shared/components/ui/switch"
import { SentencesTableActions } from "./sentences-table-actions"
import type { UseUpdateSentenceStatus } from "../../../hooks/use-update-sentence-status"
import { CategorySelect } from "../form/category-select"
import { SentenceVideoThumb } from "./sentence-video-thumb"

type GetSentencesColumnsProps = {
  updateSentenceStatus: UseUpdateSentenceStatus['updateSentenceStatus'];
}

export function getSentencesColumns({ updateSentenceStatus }: GetSentencesColumnsProps): ColumnDef<Sentence>[] {
  return [
  {
    accessorKey: "videoUrl",
    header: "Vídeo",
    cell: ({ row }) => <SentenceVideoThumb videoUrl={row.original.videoUrl} />,
  },
  {
    accessorKey: "content",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Frase
          <Icon name={column.getIsSorted() === "asc" ? "arrow-up" : "arrow-down"} />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="max-w-md px-3">
        <p className="truncate">{row.getValue("content")}</p>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
          <Icon name={column.getIsSorted() === "asc" ? "arrow-up" : "arrow-down"} />
        </Button>
      )
    },
    cell: ({ row }) => {
      const category = row.original.category;

      const component = category 
        ? <CategorySelect category={category} size="lg" /> 
        : <span className="text-muted-foreground">Sem categoria</span>;

      return (
        <div className="flex items-center gap-2 px-3">
          {component}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: () => {
      return (
        <div className="flex justify-center">
          Ativo
        </div>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue("isActive") as boolean;

      return (
        <div className="flex justify-center">
          <Switch 
            onCheckedChange={() => {
              updateSentenceStatus({
                dto: { isActive: !value },
                sentenceId: row.original.id,
              });
            }} 
            checked={value} 
          />
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const sentence = row.original

      return <SentencesTableActions sentence={sentence} />
    },
  },
]
} 