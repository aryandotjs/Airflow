import { useMemo } from "react";

interface TimestampProps {
  isoString: string|null;
}

export function DateConverter({ isoString }: TimestampProps) {
  if (!isoString) {
     return "running"
  }
  const relativeTime = useMemo(() => {
    const start = Date.parse(isoString);
    const now = Date.now();
    const diffInSeconds = Math.floor((now - start) / 1000);
    if (diffInSeconds < 60) return "just now";
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }, [isoString]);

  return (
    <span className="">
      {relativeTime}
    </span>
  );
}