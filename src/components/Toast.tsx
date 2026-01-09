import { toast } from "sonner";
import type React from "react";

export const ToastInfo = (msg: string, { duration }: { duration?: number } = {}) =>
    toast.info(msg, {
        style: {
            "--normal-bg":
                "color-mix(in oklab, light-dark(var(--color-sky-600), var(--color-sky-400)) 10%, var(--background))",
            "--normal-text": "light-dark(var(--color-sky-600), var(--color-sky-400))",
            "--normal-border":
                "light-dark(var(--color-sky-600), var(--color-sky-400))",
        } as React.CSSProperties,
        duration: duration ?? 3000,
    });

export const ToastSuccess = (
    msg: string,
    { duration }: { duration?: number } = {}
) =>
    toast.success(msg, {
        style: {
            "--normal-bg":
                "color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))",
            "--normal-text":
                "light-dark(var(--color-green-600), var(--color-green-400))",
            "--normal-border":
                "light-dark(var(--color-green-600), var(--color-green-400))",
        } as React.CSSProperties,
        duration: duration ?? 3000,
    });

export const ToastError = (msg: string, { duration }: { duration?: number } = {}) =>
    toast.error(msg, {
        style: {
            "--normal-bg":
                "color-mix(in oklab, var(--destructive) 10%, var(--background))",
            "--normal-text": "var(--destructive)",
            "--normal-border": "var(--destructive)",
        } as React.CSSProperties,
        duration: duration ?? 3000,
    });

export const ToastWarning = (
    msg: string,
    { duration }: { duration?: number } = {}
) =>
    toast.warning(msg, {
        style: {
            "--normal-bg":
                "color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))",
            "--normal-text":
                "light-dark(var(--color-amber-600), var(--color-amber-400))",
            "--normal-border":
                "light-dark(var(--color-amber-600), var(--color-amber-400))",
        } as React.CSSProperties,
        duration: duration ?? 3000,
    });