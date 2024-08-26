import { cn } from "@soli/tailwind/utils"

export const Tag = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "border-gray-4 text-gray-11 hover:bg-gray-1 w-fit cursor-default truncate rounded-lg border bg-transparent px-2 py-0.5 text-xs transition-colors",
        className
      )}
    >
      {children}
    </div>
  )
}
