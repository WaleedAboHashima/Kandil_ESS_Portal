import { createFileRoute } from '@tanstack/react-router'
import Payslips from '@/pages/payslips'

export const Route = createFileRoute('/_authenticated/payslips')({
  component: Payslips,
})
