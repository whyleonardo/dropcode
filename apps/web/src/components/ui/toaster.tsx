import { Toaster as ToasterComponent } from "sonner"

export const Toaster = () => {
  return (
    <ToasterComponent
      position="top-center"
      richColors
      toastOptions={{
        duration: 2400,
        classNames: {
          error: "!text-destructive-10 !bg-destructive-3 !border-none",
          success: "!text-green-10 !bg-green-3 !border-none",
          warning: "!text-amber-10 !bg-amber-3 !border-none",
          info: "!text-blue-10 !bg-blue-3 !border-none",
        },
      }}
    />
  )
}
