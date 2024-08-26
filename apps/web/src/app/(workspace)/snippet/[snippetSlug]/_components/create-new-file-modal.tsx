"use client"

import { usePathname, useRouter } from "next/navigation"
import { useRef } from "react"
import { useForm } from "react-hook-form"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { langs } from "@/config/langs"

import { createFile } from "@/actions/create-file"
import { createFileSchema } from "@/actions/create-file/schema"
import { useServerActionMutation } from "@/hooks/server-action-hooks"

import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"
import type { z } from "zod"

type createFileFormData = z.infer<typeof createFileSchema>

const languages = Object.values(langs)

export const CreateNewFileModal = () => {
  const router = useRouter()
  const pathname = usePathname()
  const snippetSlug = pathname.split("/").at(-1)
  const closeDialogButtonRef = useRef<HTMLButtonElement>(null)

  const { mutateAsync, isPending } = useServerActionMutation(createFile, {
    onSuccess: ({ fileId }) => {
      toast.success("File created")
      closeDialogButtonRef.current?.click()
      router.push(`${pathname}?tabFileId=${fileId}`)
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const form = useForm<createFileFormData>({
    resolver: zodResolver(createFileSchema),
    defaultValues: {
      snippetSlug,
      language: "TYPESCRIPT",
    },
  })

  const onSubmit = async (data: createFileFormData) => {
    await mutateAsync({
      name: data.name,
      content: data.content,
      language: data.language,
      snippetSlug: data.snippetSlug,
    })

    form.reset()
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new file</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center justify-center gap-2">
            <FormField
              name="snippetSlug"
              control={form.control}
              render={({ field }) => (
                <FormItem hidden>
                  <FormLabel>Snippet Slug</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      aria-readonly
                      disabled
                      type="text"
                      placeholder="Give your snippet a title"
                      {...field}
                      value={snippetSlug ?? ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>File name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Give your file a name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="language"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Language</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.enum} value={language.enum}>
                          {language.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {form.formState.errors.name &&
                    !form.formState.errors.language && (
                      <div className="invisible text-[0.8rem]">
                        Placeholder Message
                      </div>
                    )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Insert the content here"
                    className="h-96 resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full items-center gap-2">
            <DialogClose
              type="button"
              ref={closeDialogButtonRef}
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
                className: "ml-auto min-w-24 border",
              })}
            >
              Cancel
            </DialogClose>
            <Button
              isPending={isPending}
              disabled={isPending}
              type="submit"
              size="sm"
              variant="neutral"
              className="min-w-24 border border-transparent"
            >
              Create
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
