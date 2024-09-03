"use client"

import { usePathname } from "next/navigation"
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

import { createFile } from "@/actions/create-file"
import { createFileSchema } from "@/actions/create-file/schema"
import {
  QueryKeyFactory,
  useServerActionMutation,
} from "@/hooks/server-action-hooks"

import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"

import { toast } from "sonner"
import type { z } from "zod"

interface CreateNewFileFormProps {
  onOpenChange: (isOpen: boolean) => void
}

type createFileFormData = z.infer<typeof createFileSchema>

const languages = Object.values(langs)

export const CreateNewFileForm = ({ onOpenChange }: CreateNewFileFormProps) => {
  const queryClient = useQueryClient()
  const pathname = usePathname()

  const snippetSlug = pathname.split("/").at(3) as string

  const { mutateAsync, isPending } = useServerActionMutation(createFile, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QueryKeyFactory.fetchLinesCreatedInPeriod(),
      })

      queryClient.invalidateQueries({
        queryKey: QueryKeyFactory.fetchMostUsedLanguages(),
      })

      queryClient.invalidateQueries({
        queryKey: QueryKeyFactory.fetchFilesBySnippetSlug({ snippetSlug }),
      })

      toast.success("File created")
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
    onOpenChange(false)
    await mutateAsync({
      name: data.name,
      content: data.content,
      language: data.language,
      snippetSlug: data.snippetSlug,
    })

    form.reset()
  }

  return (
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
