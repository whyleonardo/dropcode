import { redirect } from "next/navigation"

const FilePage = ({ params }: { params: { snippetSlug: string } }) => {
  redirect(`/snippets/${params.snippetSlug}`)

  return null
}

export default FilePage
