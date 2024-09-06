export class SameSlugError extends Error {
  constructor() {
    super("You already have a snippet with same title")
  }
}
