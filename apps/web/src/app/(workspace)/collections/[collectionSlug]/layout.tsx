const CollectionSlugLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <div className="relative flex h-full flex-col gap-4">{children}</div>
}

export default CollectionSlugLayout
