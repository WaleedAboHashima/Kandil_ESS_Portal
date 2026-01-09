import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconUser, IconMail, IconPhone, IconMapPin, IconBuilding, IconCalendar, IconEdit, IconCamera } from "@tabler/icons-react"

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
                                    <div className="relative">
                                        <Avatar className="size-24">
                                            <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                                            <AvatarFallback className="text-2xl">JD</AvatarFallback>
                                        </Avatar>
                                        <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 size-8 rounded-full">
                                            <IconCamera className="size-4" />
                                        </Button>
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold">{profileData.personalInfo.firstName} {profileData.personalInfo.lastName}</h2>
                                        <p className="text-muted-foreground">{profileData.employment.designation}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{profileData.personalInfo.email}</p>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="px-4 lg:px-6">
                        <Tabs defaultValue="personal" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                                <TabsTrigger value="employment">Employment</TabsTrigger>
                                <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
                                <TabsTrigger value="bank">Bank Details</TabsTrigger>
                            </TabsList>

                            <TabsContent value="personal" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle>Personal Information</CardTitle>
                                                <CardDescription>Your personal details and contact information</CardDescription>
                                            </div>
                                            <Button variant="outline" className="gap-2">
                                                <IconEdit className="size-4" />
                                                Edit
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 gap-4 @3xl/main:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input id="firstName" value={profileData.personalInfo.firstName} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input id="lastName" value={profileData.personalInfo.lastName} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" type="email" value={profileData.personalInfo.email} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input id="phone" value={profileData.personalInfo.phone} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="dob">Date of Birth</Label>
                                                <Input id="dob" type="date" value={profileData.personalInfo.dateOfBirth} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="gender">Gender</Label>
                                                <Input id="gender" value={profileData.personalInfo.gender} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="maritalStatus">Marital Status</Label>
                                                <Input id="maritalStatus" value={profileData.personalInfo.maritalStatus} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="nationality">Nationality</Label>
                                                <Input id="nationality" value={profileData.personalInfo.nationality} readOnly />
                                            </div>
                                        </div>

                                        <Separator />

                                        <div>
                                            <h3 className="font-semibold mb-4">Address</h3>
                                            <div className="grid grid-cols-1 gap-4 @3xl/main:grid-cols-2">
                                                <div className="space-y-2 @3xl/main:col-span-2">
                                                    <Label htmlFor="street">Street Address</Label>
                                                    <Input id="street" value={profileData.address.street} readOnly />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="city">City</Label>
                                                    <Input id="city" value={profileData.address.city} readOnly />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="state">State</Label>
                                                    <Input id="state" value={profileData.address.state} readOnly />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="zipCode">ZIP Code</Label>
                                                    <Input id="zipCode" value={profileData.address.zipCode} readOnly />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="country">Country</Label>
                                                    <Input id="country" value={profileData.address.country} readOnly />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="employment" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Employment Details</CardTitle>
                                        <CardDescription>Your work-related information</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 gap-4 @3xl/main:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="employeeId">Employee ID</Label>
                                                <Input id="employeeId" value={profileData.employment.employeeId} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="designation">Designation</Label>
                                                <Input id="designation" value={profileData.employment.designation} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="department">Department</Label>
                                                <Input id="department" value={profileData.employment.department} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="joiningDate">Joining Date</Label>
                                                <Input id="joiningDate" type="date" value={profileData.employment.joiningDate} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="employmentType">Employment Type</Label>
                                                <Input id="employmentType" value={profileData.employment.employmentType} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="workLocation">Work Location</Label>
                                                <Input id="workLocation" value={profileData.employment.workLocation} readOnly />
                                            </div>
                                            <div className="space-y-2 @3xl/main:col-span-2">
                                                <Label htmlFor="reportingManager">Reporting Manager</Label>
                                                <Input id="reportingManager" value={profileData.employment.reportingManager} readOnly />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="emergency" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle>Emergency Contact</CardTitle>
                                                <CardDescription>Contact person in case of emergency</CardDescription>
                                            </div>
                                            <Button variant="outline" className="gap-2">
                                                <IconEdit className="size-4" />
                                                Edit
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 gap-4 @3xl/main:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="emergencyName">Contact Name</Label>
                                                <Input id="emergencyName" value={profileData.emergency.contactName} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="relationship">Relationship</Label>
                                                <Input id="relationship" value={profileData.emergency.relationship} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="emergencyPhone">Phone Number</Label>
                                                <Input id="emergencyPhone" value={profileData.emergency.phone} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="alternatePhone">Alternate Phone</Label>
                                                <Input id="alternatePhone" value={profileData.emergency.alternatePhone} readOnly />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="bank" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle>Bank Account Details</CardTitle>
                                                <CardDescription>Your salary payment information</CardDescription>
                                            </div>
                                            <Button variant="outline" className="gap-2">
                                                <IconEdit className="size-4" />
                                                Edit
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 gap-4 @3xl/main:grid-cols-2">
                                            <div className="space-y-2 @3xl/main:col-span-2">
                                                <Label htmlFor="bankName">Bank Name</Label>
                                                <Input id="bankName" value={profileData.bankDetails.bankName} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="accountNumber">Account Number</Label>
                                                <Input id="accountNumber" type="password" value={profileData.bankDetails.accountNumber} readOnly />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="routingNumber">Routing Number</Label>
                                                <Input id="routingNumber" type="password" value={profileData.bankDetails.routingNumber} readOnly />
                                            </div>
                                            <div className="space-y-2 @3xl/main:col-span-2">
                                                <Label htmlFor="accountType">Account Type</Label>
                                                <Input id="accountType" value={profileData.bankDetails.accountType} readOnly />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}
