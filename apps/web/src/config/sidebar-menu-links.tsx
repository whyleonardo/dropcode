import { CodeXml, Folder, House, Star } from "lucide-react"

type SidebarMenuLink = {
  label: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export const sidebarMenuLinks: SidebarMenuLink[] = [
  {
    label: "Home",
    href: "/workspace",
    icon: House,
  },
  {
    label: "Snippets",
    href: "/workspace/snippets",
    icon: CodeXml,
  },
  {
    label: "Collections",
    href: "/workspace/collections",
    icon: Folder,
  },
  {
    label: "Favorites",
    href: "/workspace/favorites",
    icon: Star,
  },
]
