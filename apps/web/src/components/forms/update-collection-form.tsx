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

import { updateCollection } from "@/actions/update-collection"
import { updateCollectionSchema } from "@/actions/update-collection/schema"
import { useServerActionMutation } from "@/hooks/server-action-hooks"

import type { Collection } from "@dropcode/db/types"
import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"
import type { z } from "zod"

interface UpdateCollectionFormProps {
  onOpenChange: (isOpen: boolean) => void
  initialData: Pick<Collection, "title" | "id">
}

type updateCollectionFormData = z.infer<typeof updateCollectionSchema>

export const UpdateCollectionForm = ({
  onOpenChange,
  initialData,
}: UpdateCollectionFormProps) => {
  const { mutateAsync, isPending } = useServerActionMutation(updateCollection, {
    mutationKey: ["update-collection"],
    onSuccess: () => {
      toast.success("Collection updated")
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const form = useForm<updateCollectionFormData>({
    resolver: zodResolver(updateCollectionSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: updateCollectionFormData) => {
    await mutateAsync({ title: data.title, id: initialData.id })
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
          name="id"
          render={({ field }) => (
            <FormItem hidden aria-hidden="true">
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
