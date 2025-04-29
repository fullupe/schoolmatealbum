import { Classmate } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, GraduationCap as Graduation, Award, MapPin, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProfileContentProps {
  classmate: Classmate;
}

export default function ProfileContent({ classmate }: ProfileContentProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Bio */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Biography</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed">{classmate.bio}</p>
              </CardContent>
            </Card>
          </section>
          
          {/* Then & Now */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Then & Now</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Then */}
              <Card className="overflow-hidden">
                <div className="aspect-[4/5] relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${classmate.oldPicture})` }}
                  />
                  <div className="absolute top-3 right-3 bg-amber-500/80 text-white py-1 px-3 rounded-full text-xs font-medium">
                    Then
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">School Days</h3>
                  <p className="text-sm text-muted-foreground">
                    Class of {classmate.graduationYear || "2010"}
                  </p>
                </CardContent>
              </Card>
              
              {/* Now */}
              <Card className="overflow-hidden">
                <div className="aspect-[4/5] relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${classmate.newPicture})` }}
                  />
                  <div className="absolute top-3 right-3 bg-emerald-500/80 text-white py-1 px-3 rounded-full text-xs font-medium">
                    Now
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">Current Days</h3>
                  <p className="text-sm text-muted-foreground">
                    {classmate.profession} at {classmate.company}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
        
        {/* Sidebar */}
        <div>
          {/* Contact Info */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                {classmate.contact?.email && (
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <a href={`mailto:${classmate.contact.email}`} className="text-sm text-primary hover:underline">
                        {classmate.contact.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {classmate.contact?.phone && (
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <a href={`tel:${classmate.contact.phone}`} className="text-sm text-primary hover:underline">
                        {classmate.contact.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {!classmate.contact?.email && !classmate.contact?.phone && (
                  <p className="text-sm text-muted-foreground">No contact information available.</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Details</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Award className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Profession</p>
                    <p className="text-sm">{classmate.profession}</p>
                  </div>
                </div>
                
                {classmate.company && (
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Company</p>
                      <p className="text-sm">{classmate.company}</p>
                    </div>
                  </div>
                )}
                
                {classmate.location && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm">{classmate.location}</p>
                    </div>
                  </div>
                )}
                
                {classmate.graduationYear && (
                  <div className="flex items-start">
                    <Graduation className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Graduated</p>
                      <p className="text-sm">{classmate.graduationYear}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="text-sm text-muted-foreground text-center">
                <p>Member since 2023</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}