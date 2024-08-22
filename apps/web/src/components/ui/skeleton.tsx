import { cn } from "@soli/tailwind/utils"

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "dark:bg-gray-2 bg-gray-3 animate-pulse rounded-md",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
