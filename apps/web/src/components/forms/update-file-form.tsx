"use client"

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
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

import { QueryKeyFactory } from "@/lib/keys"

import { updateFile } from "@/actions/update-file"
import { updateFileSchema } from "@/actions/update-file/schema"
import { useServerActionMutation } from "@/hooks/server-action-hooks"

import type { File } from "@dropcode/db/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"

import { Paintbrush } from "lucide-react"
import { toast } from "sonner"
import type { z } from "zod"

interface UpdateFileFormProps {
  onOpenChange: (isOpen: boolean) => void
  initialData: Pick<File, "name" | "language" | "id" | "content" | "snippetId">
  snippetSlug: string
}

type updateFileFormData = z.infer<typeof updateFileSchema>

const languages = Object.values(langs)

export const UpdateFileForm = ({
  onOpenChange,
  initialData,
  snippetSlug,
}: UpdateFileFormProps) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useServerActionMutation(updateFile, {
    mutationKey: ["update-file"],
    onSuccess: () => {
      toast.success("File updated")

      queryClient.invalidateQueries({
        queryKey: QueryKeyFactory.fetchLinesCreatedInPeriod(),
      })

      queryClient.invalidateQueries({
        queryKey: QueryKeyFactory.fetchMostUsedLanguages(),
      })

      queryClient.invalidateQueries({
        queryKey: QueryKeyFactory.fetchFilesBySnippetSlug({ snippetSlug }),
      })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
  const form = useForm<updateFileFormData>({
    resolver: zodResolver(updateFileSchema),
    defaultValues: initialData,
    mode: "onBlur",
  })

  const onSubmit = async (data: updateFileFormData) => {
    await mutateAsync({
      name: data.name,
      id: data.id,
      language: data.language,
      content: data.content,
      snippetId: data.snippetId,
    })
    form.reset()
    onOpenChange(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="snippetId"
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
                  value={initialData.snippetId}
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
                  autoComplete="off"
                  spellCheck="false"
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

              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full items-center justify-between">
                <FormLabel>Content</FormLabel>

                <Button
                  className="md:hidden"
                  variant="neutral"
                  size="sm"
                  onClick={() => field.onChange("")}
                >
                  <Paintbrush className="mr-2 size-3.5" />
                  Clean
                </Button>
              </div>

              <FormControl>
                <Textarea
                  autoComplete="off"
                  spellCheck="false"
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
            disabled={isPending || !form.formState.isValid}
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
