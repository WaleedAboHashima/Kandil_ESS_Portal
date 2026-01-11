// Leave type translations (English to Arabic)
export const leaveTypeTranslations: Record<string, string> = {
    "Paid Time Off": "إجازة مدفوعة",
    "Sick Time Off": "إجازة مرضية",
    "Unpaid": "إجازة بدون راتب",
    "Compensatory Days": "أيام تعويضية",
    "Annual Leave": "إجازة سنوية",
    "Maternity Leave": "إجازة أمومة",
    "Paternity Leave": "إجازة أبوة",
    "Emergency Leave": "إجازة طارئة",
    "Study Leave": "إجازة دراسية",
    "Hajj Leave": "إجازة حج",
    "Marriage Leave": "إجازة زواج",
    "Bereavement Leave": "إجازة وفاة",
};

export function translateLeaveType(englishName: string): string {
    return leaveTypeTranslations[englishName] || englishName;
}
