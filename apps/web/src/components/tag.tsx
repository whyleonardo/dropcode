export const Tag = ({ children }: { children: string }) => {
  return (
    <div className="border-gray-4 text-gray-11 hover:bg-gray-1 w-fit cursor-default rounded-lg border bg-transparent px-2 py-0.5 text-xs transition-colors">
      {children}
    </div>
  )
}
