import { useId } from "react"

import { cn } from "@dropcode/tailwind/utils"

interface DotPatternProps {
  width?: string | number | undefined
  height?: string | number | undefined
  x?: string | number | undefined
  y?: string | number | undefined
  cx?: string | number | undefined
  cy?: string | number | undefined
  cr?: string | number | undefined
  className?: string
  [key: string]: string | number | undefined
}
export const DotPattern = ({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}: DotPatternProps) => {
  const id = useId()

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "fill-gray-12 pointer-events-none absolute inset-0 h-full w-full opacity-25 dark:opacity-10",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  )
}
