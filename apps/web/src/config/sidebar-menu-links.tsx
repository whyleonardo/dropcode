import { CodeXml, Folder, House, Star } from "lucide-react"

type SidebarMenuLink = {
  label: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  isDisabled: boolean
}

export const sidebarMenuLinks: SidebarMenuLink[] = [
  {
    label: "Home",
    href: "/workspace",
    icon: House,
    isDisabled: false,
  },
  {
    label: "Snippets",
    href: "/workspace/snippets",
    icon: CodeXml,
    isDisabled: true,
  },
  {
    label: "Collections",
    href: "/workspace/collections",
    icon: Folder,
    isDisabled: false,
  },
  {
    label: "Favorites",
    href: "/workspace/favorites",
    icon: Star,
    isDisabled: false,
  },
]
