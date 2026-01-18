import { createFileRoute } from '@tanstack/react-router'
import DepartmentTransfer from '@/pages/department-transfer'

export const Route = createFileRoute('/_authenticated/department-transfer')({
  component: DepartmentTransfer,
})
