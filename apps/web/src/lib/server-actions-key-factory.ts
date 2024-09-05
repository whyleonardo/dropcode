type ServerActionsKeyFactory<TKey extends string[]> = {
  // biome-ignore lint/suspicious/noExplicitAny:
  [key: string]: (...args: any[]) => TKey
}

export const customCreateServerActionsKeyFactory = <
  const TKeys extends string[],
  const TFactory extends ServerActionsKeyFactory<TKeys>,
>(
  factory: TFactory
) => {
  return factory
}
