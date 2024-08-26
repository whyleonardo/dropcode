"use client"

import { useEffect, useState } from "react"

import { cn } from "@soli/tailwind/utils"

interface TypingAnimationProps {
  text: string
  duration?: number
  className?: string
  as?: React.ElementType
  withCaret?: boolean
}

export const TypingAnimation = ({
  text,
  duration = 200,
  className,
  withCaret,
  as: Component = "h1",
}: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState<string>("")
  const [i, setI] = useState<number>(0)

  // biome-ignore lint/correctness/useExhaustiveDependencies: text.length in deps is not useful
  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1))
        setI(i + 1)
      } else {
        clearInterval(typingEffect)
      }
    }, duration)

    return () => {
      clearInterval(typingEffect)
    }
  }, [duration, i])

  return (
    <Component
      className={cn(
        "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className
      )}
    >
      {displayedText ? displayedText : text}
      {withCaret && (
        <span className="animate-caret-blink font-light opacity-85">|</span>
      )}
    </Component>
  )
}
