"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const motion =
  "duration-(--switch-duration) ease-(--switch-ease) motion-reduce:transition-none"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "[--switch-duration:200ms] [--switch-ease:cubic-bezier(0.4,0,0.2,1)] [--switch-gap:1px]",
        "data-[size=default]:[--switch-h:1.15rem] data-[size=default]:[--switch-w:2rem] data-[size=default]:[--switch-thumb:1rem]",
        "data-[size=sm]:[--switch-h:0.875rem] data-[size=sm]:[--switch-w:1.5rem] data-[size=sm]:[--switch-thumb:0.75rem]",
        "[--switch-inset-y:calc((var(--switch-h)-var(--switch-thumb))/2)]",
        "[--switch-inset-x:calc(var(--switch-w)-var(--switch-thumb)-var(--switch-gap))]",
        "[--switch-travel:calc(var(--switch-w)-var(--switch-thumb)-2*var(--switch-gap))]",
        "group/switch peer relative inline-flex h-(--switch-h) w-(--switch-w) shrink-0 items-center rounded-full bg-input shadow-xs outline-none transition-[color,box-shadow] dark:bg-input/80",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        data-slot="switch-fill"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full bg-primary transition-[clip-path]",
          motion,
          "group-data-[state=unchecked]/switch:[clip-path:inset(var(--switch-inset-y)_var(--switch-inset-x)_var(--switch-inset-y)_var(--switch-gap)_round_9999px)]",
          "group-data-[state=unchecked]/switch:rtl:[clip-path:inset(var(--switch-inset-y)_var(--switch-gap)_var(--switch-inset-y)_var(--switch-inset-x)_round_9999px)]",
          "group-data-[state=checked]/switch:[clip-path:inset(0_round_9999px)]"
        )}
      />
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none relative ms-(--switch-gap) block size-(--switch-thumb) overflow-hidden rounded-full bg-background ring-0 transition-transform dark:bg-foreground",
          motion,
          "data-[state=checked]:translate-x-(--switch-travel) rtl:data-[state=checked]:-translate-x-(--switch-travel)"
        )}
      >
        <span
          aria-hidden="true"
          data-slot="switch-thumb-fill"
          className={cn(
            "absolute inset-0 rounded-[inherit] bg-background transition-[clip-path] dark:bg-primary-foreground",
            motion,
            "group-data-[state=unchecked]/switch:[clip-path:inset(0_100%_0_0)]",
            "group-data-[state=unchecked]/switch:rtl:[clip-path:inset(0_0_0_100%)]",
            "group-data-[state=checked]/switch:[clip-path:inset(0)]"
          )}
        />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch }
