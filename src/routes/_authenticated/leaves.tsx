import { createFileRoute } from '@tanstack/react-router'
import Leaves from '@/pages/leaves'

export const Route = createFileRoute('/_authenticated/leaves')({
  component: Leaves,
})
