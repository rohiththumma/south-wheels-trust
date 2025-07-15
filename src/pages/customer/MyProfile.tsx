import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  joinDate: string;
  membershipType: string;
  bio: string;
}

const MyProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    name: "John Customer",
    email: "john@example.com",
    phone: "+91 9876543210",
    location: "Hyderabad, India",
    address: "123 Main Street, Jubilee Hills, Hyderabad, Telangana - 500033",
    joinDate: "January 15, 2024",
    membershipType: "Premium Member",
    bio: "Car enthusiast looking for reliable pre-owned vehicles. Interested in sedans and hatchbacks."
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated."
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/customer-dashboard')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <User className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
                <p className="text-sm text-gray-500">Manage your account information</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {isEditing ? editedProfile.name : profile.name}
                </h2>
                <p className="text-sm text-red-600 mb-2">{profile.membershipType}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Member since {profile.joinDate}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center text-gray-600">
                    <Mail className="mr-2 h-4 w-4" />
                    {isEditing ? editedProfile.email : profile.email}
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <Phone className="mr-2 h-4 w-4" />
                    {isEditing ? editedProfile.phone : profile.phone}
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <MapPin className="mr-2 h-4 w-4" />
                    {isEditing ? editedProfile.location : profile.location}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Bookings</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Favorite Cars</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completed Purchases</span>
                    <span className="font-semibold">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Spent</span>
                    <span className="font-semibold text-green-600">₹4.5L</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editedProfile.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-3 rounded-md">{profile.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-3 rounded-md">{profile.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editedProfile.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-3 rounded-md">{profile.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">City</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={editedProfile.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm bg-gray-50 p-3 rounded-md">{profile.location}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  {isEditing ? (
                    <Textarea
                      id="address"
                      value={editedProfile.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm bg-gray-50 p-3 rounded-md">{profile.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">About Me</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={editedProfile.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      rows={4}
                      placeholder="Tell us about your car preferences, experience, etc."
                    />
                  ) : (
                    <p className="text-sm bg-gray-50 p-3 rounded-md">
                      {profile.bio || "No information provided"}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive updates about your bookings and new cars</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Privacy Settings</h4>
                      <p className="text-sm text-gray-500">Control who can see your profile information</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Change Password</h4>
                      <p className="text-sm text-gray-500">Update your account password</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;