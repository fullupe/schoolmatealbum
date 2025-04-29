import { Classmate } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

interface ProfileHeaderProps {
  classmate: Classmate;
}

export default function ProfileHeader({ classmate }: ProfileHeaderProps) {
  return (
    <div className="relative">
      {/* Background Image */}
      <div 
        className="h-64 sm:h-80 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${classmate.newPicture})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 h-64 sm:h-80 bg-gradient-to-b from-black/50 to-black/70" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        {/* Back Button */}
        <div className="absolute top-4 left-4 md:left-8 z-10">
          <Link href="/">
            <Button size="sm" variant="outline" className="bg-black/30 text-white border-white/20 hover:bg-black/50 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Album
            </Button>
          </Link>
        </div>
        
        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-20 mb-8 relative z-10">
          {/* Profile Image */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-background overflow-hidden shadow-lg">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${classmate.newPicture})` }}
            />
          </div>
          
          {/* Profile Text */}
          <div className="text-center sm:text-left flex-1 pb-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{classmate.name}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground mt-1">{classmate.profession}</p>
            
            {/* Company & Location */}
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              {classmate.company && (
                <span className="text-sm sm:text-base">{classmate.company}</span>
              )}
              
              {classmate.company && classmate.location && (
                <span className="hidden sm:inline text-muted-foreground">•</span>
              )}
              
              {classmate.location && (
                <span className="text-sm sm:text-base text-muted-foreground">{classmate.location}</span>
              )}
            </div>
          </div>
          
          {/* Social Links */}
          {classmate.socialLinks && (
            <div className="flex gap-2 sm:pb-3">
              {classmate.socialLinks.linkedin && (
                <Link href={classmate.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
              )}
              
              {classmate.socialLinks.twitter && (
                <Link href={classmate.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
              )}
              
              {classmate.socialLinks.instagram && (
                <Link href={classmate.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline">
                    <Instagram className="h-4 w-4" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </Link>
              )}
              
              {classmate.socialLinks.facebook && (
                <Link href={classmate.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline">
                    <Facebook className="h-4 w-4" />
                    <span className="sr-only">Facebook</span>
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}