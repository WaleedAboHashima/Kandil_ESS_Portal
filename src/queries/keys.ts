export const queryKeys = {
    auth: {
        user: ['auth', 'user'] as const
    },
    attendance: {
        all: ['attendance', 'all'] as const
    },
    leaves: {
        types: ['leaves', 'types'] as const,
        userLeaves: ['leaves', 'user'] as const
    },
    recruitment: {
        requests: ['recruitment', 'requests'] as const,
        departments: ['recruitment', 'departments'] as const,
        jobs: ['recruitment', 'jobs'] as const
    },
    departmentTransfer: {
        requests: ['departmentTransfer', 'requests'] as const,
        employees: ['departmentTransfer', 'employees'] as const
    },
};