const FavoritesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col gap-8">
      <header className="flex h-14 items-center justify-between px-4">
        Back
      </header>

      <div className="h-full">{children}</div>
    </div>
  )
}

export default FavoritesLayout
