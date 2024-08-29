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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultiInput } from "@/components/ui/multi-input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

import { createSnippet } from "@/actions/create-snippet"
import { createSnippetSchema } from "@/actions/create-snippet/schema"
import { useServerActionMutation } from "@/hooks/server-action-hooks"

import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"
import type { z } from "zod"

type createSnippetFormData = z.infer<typeof createSnippetSchema>

const MAX_LENGTH_DESCRIPTION = 72

export const CreateSnippetFormModal = () => {
  const router = useRouter()
  const pathname = usePathname()
  const closeDialogButtonRef = useRef<HTMLButtonElement>(null)

  const collectionSlug = pathname.split("/").at(2) as string

  const { mutateAsync, isPending } = useServerActionMutation(createSnippet, {
    onSuccess: ({ snippetSlug }) => {
      toast.success("Snippet created")
      closeDialogButtonRef.current?.click()
      router.push(`/snippet/${snippetSlug}`)
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const form = useForm<createSnippetFormData>({
    resolver: zodResolver(createSnippetSchema),
    defaultValues: {
      collectionSlug,
      tags: [],
    },
  })

  const onSubmit = async (data: createSnippetFormData) => {
    await mutateAsync({
      title: data.title,
      collectionSlug: data.collectionSlug,
      description: data.description,
      isPublic: data.isPublic ?? false,
      tags: data.tags,
    })

    form.reset()
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new snippet</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Give your snippet a title"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    maxLength={MAX_LENGTH_DESCRIPTION}
                    placeholder="Give your snippet a description"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem
                className="flex hidden flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
                hidden
              >
                <div className="space-y-0.5">
                  <FormLabel>Snippet Visibility</FormLabel>
                  <FormDescription>
                    When this is disabled, only you will be able to see this
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="collectionSlug"
            render={({ field }) => (
              <FormItem hidden>
                <FormLabel>Collection Slug</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="pointer-events-none"
                    disabled
                    placeholder="Give your collection a title"
                    readOnly
                    aria-readonly
                    {...field}
                    value={collectionSlug ?? ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="space-y-0.5" hidden>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <MultiInput hidden aria-hidden="true" {...field} />
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
