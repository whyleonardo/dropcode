import { type Dispatch, type SetStateAction, forwardRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input, type InputProps } from "@/components/ui/input"

import { PlusIcon, XIcon } from "lucide-react"

import { Tag } from "../tag"

type InputTagsProps = InputProps & {
  value: string[]
  onChange: Dispatch<SetStateAction<string[]>>
}

const MAX_INPUT_VALUE_LENGTH = 14

export const MultiInput = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = useState("")

    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint])
        onChange(Array.from(newDataPoints))
        setPendingDataPoint("")
      }
    }

    return (
      <>
        <div className="flex">
          <Input
            value={pendingDataPoint}
            onChange={(e) => setPendingDataPoint(e.target.value)}
            maxLength={MAX_INPUT_VALUE_LENGTH}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addPendingDataPoint()
              } else if (e.key === "," || e.key === " ") {
                e.preventDefault()
                addPendingDataPoint()
              }
            }}
            className="rounded-r-none"
            {...props}
            ref={ref}
          />
          <Button
            type="button"
            variant="neutral"
            size="sm"
            className="rounded-l-none border border-l-0"
            onClick={addPendingDataPoint}
          >
            <PlusIcon className="size-4" />
          </Button>
        </div>

        <div className="flex min-h-[2.5rem] flex-wrap items-center gap-2 overflow-y-auto rounded-md">
          {value.map((item, idx) => (
            <button
              key={`${idx}-${item}`}
              type="button"
              className="ml-2 w-fit"
              onClick={() => {
                onChange(value.filter((i) => i !== item))
              }}
            >
              <Tag className="flex cursor-pointer items-center gap-1 transition-opacity hover:opacity-75">
                {item}
                <XIcon className="w-3" />
              </Tag>
            </button>
          ))}
        </div>
      </>
    )
  }
)
