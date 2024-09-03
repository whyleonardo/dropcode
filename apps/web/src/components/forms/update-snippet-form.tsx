"use client"

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

import { updateSnippet } from "@/actions/update-snippet"
import { updateSnippetSchema } from "@/actions/update-snippet/schema"
import { useServerActionMutation } from "@/hooks/server-action-hooks"

import type { Snippet } from "@dropcode/db/types"
import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"
import type { z } from "zod"

interface UpdateSnippetFormProps {
  onOpenChange: (isOpen: boolean) => void
  initialData: Pick<Snippet, "title" | "id" | "description" | "isPublic">
  collectionSlug: string
}

type updateSnippetFormData = z.infer<typeof updateSnippetSchema>

const MAX_LENGTH_DESCRIPTION = 72

export const UpdateSnippetForm = ({
  onOpenChange,
  initialData,
  collectionSlug,
}: UpdateSnippetFormProps) => {
  const { mutateAsync, isPending } = useServerActionMutation(updateSnippet, {
    mutationKey: ["update-snippet"],
    onSuccess: () => {
      toast.success("Snippet updated")
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const form = useForm<updateSnippetFormData>({
    resolver: zodResolver(updateSnippetSchema),
    defaultValues: {
      ...initialData,
      collectionSlug,
      description: initialData.description as string,
    },
  })

  console.log(form.formState.errors)

  const onSubmit = async (data: updateSnippetFormData) => {
    await mutateAsync({
      id: initialData.id,
      title: data.title,
      collectionSlug,
      description: data.description,
      isPublic: data.isPublic,
    })
    form.reset()
    onOpenChange(false)
  }

  return (
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
                  autoComplete="off"
                  spellCheck="false"
                  type="text"
                  placeholder="Give your collection a title"
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
              aria-hidden="true"
            >
              <div className="space-y-0.5">
                <FormLabel>Snippet Visibility</FormLabel>
                <FormDescription className="max-w-52">
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
          name="id"
          render={({ field }) => (
            <FormItem hidden aria-hidden="true">
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="ml-auto flex-1 border"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            isPending={isPending}
            disabled={isPending}
            type="submit"
            size="sm"
            variant="neutral"
            className="flex-1 border border-transparent"
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  )
}
