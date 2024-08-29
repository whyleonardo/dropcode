import { Skeleton } from "@/components/ui/skeleton"

const FileSlugLoadingPage = () => {
  return (
    <div className="group relative size-full">
      <div className="w-full flex-1 space-y-2 overflow-x-scroll px-4 pb-12 pt-4">
        {/* Code Area */}
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-80" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-72" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-52" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-56" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileSlugLoadingPage
