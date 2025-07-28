import { type ColumnDef } from "@tanstack/react-table"

import { type Sentence } from "@/application/domain/dashboard/sentences/services/dto/sentences-dto"
import { Button } from "@/application/shared/components/ui/button"
import { Icon } from "@/application/shared/components/ui/icon"
import { Switch } from "@/application/shared/components/ui/switch"
import { SentencesTableActions } from "./sentences-table-actions"
import type { UseUpdateSentenceStatus } from "../../../hooks/use-update-sentence-status"

type GetSentencesColumnsProps = {
  updateSentenceStatus: UseUpdateSentenceStatus['updateSentenceStatus'];
}

export function getSentencesColumns({ updateSentenceStatus }: GetSentencesColumnsProps): ColumnDef<Sentence>[] {
  return [
  {
    accessorKey: "videoUrl",
    header: "Vídeo",
    cell: ({ row }) => {
      const videoUrl = row.getValue("videoUrl") as string;
      // Extract video ID from YouTube URL to create thumbnail
      const videoId = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
      const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : '';
      
      return (
        <div className="flex">
          {thumbnailUrl ? (
            <button 
              onClick={() => {
                // TODO: Open video modal in the future
                console.log('Open video modal for:', videoUrl);
              }}
              className="relative hover:opacity-80 transition-opacity"
            >
              <img 
                src={thumbnailUrl} 
                alt="Video thumbnail" 
                className="w-20 h-12 object-cover rounded"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon name="play-circle" className="size-8 text-white drop-shadow-lg" />
              </div>
            </button>
          ) : (
            <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center">
              <Icon name="video" className="size-6 text-gray-400" />
            </div>
          )}
        </div>
      )
    },
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
      
      if (!category) {
        return (
          <div className="flex items-center gap-2 px-3">
            <span className="text-gray-400">Sem categoria</span>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-2 px-3">
          <div 
            className="flex items-center justify-center size-8 rounded"
            style={{ backgroundColor: `${category.color}2a` }}
          >
            <Icon name={category.icon} className="size-4 text-white" color={category.color} />
          </div>
          <span className="capitalize">{category.name}</span>
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