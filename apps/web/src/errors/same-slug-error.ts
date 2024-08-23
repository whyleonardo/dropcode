type Error = "collection" | "snippet"

export class SameSlugError extends Error {
  constructor(entity: Error) {
    super(`You have already created a ${entity} with this slug`)
  }
}
