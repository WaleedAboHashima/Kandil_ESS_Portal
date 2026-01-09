import { createFileRoute } from '@tanstack/react-router'
import Attendance from '@/pages/attendance'

export const Route = createFileRoute('/_authenticated/attendance')({
  component: Attendance,
})
