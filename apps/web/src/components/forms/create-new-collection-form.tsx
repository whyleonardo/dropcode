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

import { QueryKeyFactory } from "@/lib/keys"

import { createCollection } from "@/actions/create-collection"
import { createCollectionSchema } from "@/actions/create-collection/schema"
import { useServerActionMutation } from "@/hooks/server-action-hooks"

import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"

import { toast } from "sonner"
import type { z } from "zod"

interface CreateNewCollectionFormProps {
  onOpenChange: (isOpen: boolean) => void
}

type createCollectionFormData = z.infer<typeof createCollectionSchema>

export const CreateNewCollectionForm = ({
  onOpenChange,
}: CreateNewCollectionFormProps) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useServerActionMutation(createCollection, {
    mutationKey: ["create-collection"],
    onSuccess: () => {
      toast.success("Collection created")

      queryClient.invalidateQueries({
        queryKey: QueryKeyFactory.fetchCollections(),
      })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const form = useForm<createCollectionFormData>({
    resolver: zodResolver(createCollectionSchema),
  })

  const onSubmit = async (data: createCollectionFormData) => {
    await mutateAsync({ title: data.title })
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
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}
