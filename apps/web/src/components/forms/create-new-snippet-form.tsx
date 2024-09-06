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

import { createSnippet } from "@/data/create-snippet"
import { createSnippetSchema } from "@/data/create-snippet/schema"
import { useServerActionMutation } from "@/hooks/server-action-hooks"

import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"
import type { z } from "zod"

interface CreateNewSnippetFormProps {
  onOpenChange: (isOpen: boolean) => void
}

type createSnippetFormData = z.infer<typeof createSnippetSchema>

const MAX_LENGTH_DESCRIPTION = 72

export const CreateNewSnippetForm = ({
  onOpenChange,
}: CreateNewSnippetFormProps) => {
  const { mutateAsync, isPending } = useServerActionMutation(createSnippet, {
    onSuccess: () => {
      toast.success("Snippet created")
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const form = useForm<createSnippetFormData>({
    resolver: zodResolver(createSnippetSchema),
  })

  const onSubmit = async (data: createSnippetFormData) => {
    await mutateAsync({
      title: data.title,
      description: data.description,
      isPublic: data.isPublic ?? false,
    })

    form.reset()
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
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
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

        <div className="flex w-full items-center gap-2">
          <Button
            onClick={() => onOpenChange(false)}
            type="button"
            size="sm"
            variant="ghost"
            className="ml-auto flex-1 border"
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
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}
