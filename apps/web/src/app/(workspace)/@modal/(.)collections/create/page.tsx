"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Dialog,
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

import { createCollection } from "@/actions/create-collection"
import { createCollectionSchema } from "@/actions/create-collection/schema"
import { useServerActionMutation } from "@/hooks/server-action-hooks"

import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"
import type { z } from "zod"

type createCollectionFormData = z.infer<typeof createCollectionSchema>

const InterceptedCreateCollectionPage = () => {
  const router = useRouter()

  const { mutateAsync, isPending } = useServerActionMutation(createCollection, {
    mutationKey: ["create-collection"],
    onSuccess: () => {
      toast.success("Collection created")
      router.back()
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
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new collection</DialogTitle>
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
                onClick={() => router.back()}
                size="sm"
                variant="ghost"
                className="ml-auto min-w-24 border"
              >
                Cancel
              </Button>

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
    </Dialog>
  )
}

export default InterceptedCreateCollectionPage
