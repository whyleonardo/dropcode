import { Dialog } from "@/components/ui/motion/dialog"

const AppLayout = (props: {
  children: React.ReactNode
  modal: React.ReactNode
}) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Dialog
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        {props.children} {props.modal}
      </Dialog>
    </div>
  )
}

export default AppLayout
