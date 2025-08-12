import { Icon } from "@/application/shared/components/ui/icon";
import { useMemo } from "react";

type Props = {
  videoUrl: string;
}

export function SentenceVideoThumb({ videoUrl }: Props) {
  const thumbnail = useMemo(() => {
    const videoId = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/)([^&\n?#]+)/)?.[1];
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : '';

    return thumbnailUrl;
  }, [videoUrl]);
  
  return (
    <div className="flex">
      {thumbnail ? (
        <button 
          onClick={() => {
            // TODO: Open video modal in the future
            console.log('Open video modal for:', videoUrl);
          }}
          className="relative hover:opacity-80 transition-opacity"
        >
          <img 
            src={thumbnail} 
            alt="Video thumbnail" 
            className="w-32 h-18 object-cover rounded"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="play-circle" className="size-6 text-muted drop-shadow-lg" />
          </div>
        </button>
      ) : (
        <div className="w-32 h-18 bg-muted-foreground rounded flex items-center justify-center">
          <Icon name="video" className="size-4 text-muted" />
        </div>
      )}
    </div>
  )
}