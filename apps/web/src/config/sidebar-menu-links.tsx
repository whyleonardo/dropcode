import { Folder, House } from "lucide-react"

type SidebarMenuLink = {
  label: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  isDisabled: boolean
}

export const sidebarMenuLinks: SidebarMenuLink[] = [
  {
    label: "Home",
    href: "/",
    icon: House,
    isDisabled: false,
  },
  {
    label: "Collections",
    href: "/collections",
    icon: Folder,
    isDisabled: false,
  },
  // {
  //   label: "Snippets",
  //   href: "/snippets",
  //   icon: CodeXml,
  //   isDisabled: true,
  // },
  // {
  //   label: "Favorites",
  //   href: "/favorites",
  //   icon: Star,
  //   isDisabled: false,
  // },
]
