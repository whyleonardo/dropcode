"use client"

import { forwardRef, useCallback, useState } from "react"

import { type AnimationProps, motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { tv } from "tailwind-variants"

interface InputFocusBlurProps extends React.ComponentProps<"input"> {
  feedbackError?: string
}

const AXIS_X_PLACEHOLDER = 24
const STANDARD_DURATION = 0.3

const inputFocusBlurStyles = tv({
  slots: {
    baseStyle:
      "border-gray-4 focus-within:border-gray-6 data-[filled=true]:border-gray-7 relative flex h-10 w-full items-center rounded-lg border bg-transparent px-3 transition-all duration-200",
    inputStyle:
      "relative z-[9999] h-full flex-1 bg-transparent py-2 text-sm text-neutral-300 outline-none placeholder:sr-only disabled:cursor-not-allowed",
    placeholderStyle: "absolute left-3 text-sm text-neutral-500",
    feedbackErrorStyle:
      "text-destructive-8 mt-1 flex items-center gap-1 text-xs",
  },
  variants: {
    error: {
      true: {
        baseStyle: "border-destructive-8",
      },
    },
    disabled: {
      true: {
        baseStyle: "bg-gray-4 cursor-not-allowed",
      },
    },
  },
})

const { baseStyle, inputStyle, placeholderStyle, feedbackErrorStyle } =
  inputFocusBlurStyles()

export const Input = forwardRef<HTMLInputElement, InputFocusBlurProps>(
  ({ placeholder, feedbackError = "", disabled, value, ...props }, ref) => {
    const [isFocus, setIsFocus] = useState(false)
    const [internalValue, setInternalValue] = useState("")

    const handle = useCallback((type: "focus" | "blur") => {
      setIsFocus(type === "focus")
    }, [])

    function observeFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
      setInternalValue(event.target.value)
    }

    const isFilled = internalValue.length > 0 || !!value
    const isFocusOrFilled = isFocus || isFilled

    const isError = feedbackError.length > 0 && !disabled

    const placeholderAnimation: AnimationProps["animate"] = isFocusOrFilled
      ? {
          x: AXIS_X_PLACEHOLDER,
          filter: "blur(4px)",
          opacity: 0,
        }
      : {
          x: 0,
        }

    return (
      <div className="w-full">
        <div
          className={baseStyle({ error: isError, disabled })}
          data-filled={isFilled}
        >
          <input
            ref={ref}
            type="text"
            className={inputStyle()}
            placeholder={placeholder}
            onFocus={() => handle("focus")}
            onBlur={() => handle("blur")}
            onChange={observeFieldChange}
            disabled={disabled}
            value={value}
            {...props}
          />

          <motion.span
            className={placeholderStyle()}
            initial={{
              x: 0,
            }}
            animate={placeholderAnimation}
            transition={{
              easings: ["easeOut"],
              duration: STANDARD_DURATION,
            }}
          >
            {placeholder}
          </motion.span>
        </div>

        {isError && (
          <motion.span
            className={feedbackErrorStyle()}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: STANDARD_DURATION,
            }}
          >
            <AlertCircle size={12} />
            {feedbackError}
          </motion.span>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"
