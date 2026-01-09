import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const profileData = {
    personalInfo: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@company.com",
        phone: "+1 (555) 123-4567",
        dateOfBirth: "1990-05-15",
        gender: "Male",
        maritalStatus: "Married",
        nationality: "American",
    },
    address: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
    },
    employment: {
        employeeId: "EMP-2024-001",
        designation: "Senior Software Engineer",
        department: "Engineering",
        joiningDate: "2020-01-15",
        employmentType: "Full-time",
        workLocation: "New York Office",
        reportingManager: "Jane Smith",
    },
    emergency: {
        contactName: "Jane Doe",
        relationship: "Spouse",
        phone: "+1 (555) 987-6543",
        alternatePhone: "+1 (555) 456-7890",
    },
    bankDetails: {
        bankName: "Chase Bank",
        accountNumber: "****7890",
        routingNumber: "****5678",
        accountType: "Savings",
    },
}

export default function Profile() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="flex items-center justify-between px-4 lg:px-6">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
                            <p className="text-muted-foreground">Manage your personal information and settings</p>
                        </div>
                    </div>

                    <div className="px-4 lg:px-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-6">
                                    <Avatar className="size-20">
                                        <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                                        <AvatarFallback className="text-2xl">JD</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold">{profileData.personalInfo.firstName} {profileData.personalInfo.lastName}</h2>
                                        <p className="text-muted-foreground">{profileData.employment.designation}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{profileData.personalInfo.email}</p>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="px-4 lg:px-6 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Your contact details</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Phone Number</Label>
                                        <Input value={profileData.personalInfo.phone} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input value={profileData.personalInfo.email} readOnly />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Employment Details</CardTitle>
                                <CardDescription>Your work information</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Employee ID</Label>
                                        <Input value={profileData.employment.employeeId} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Department</Label>
                                        <Input value={profileData.employment.department} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Designation</Label>
                                        <Input value={profileData.employment.designation} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Joining Date</Label>
                                        <Input type="date" value={profileData.employment.joiningDate} readOnly />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
