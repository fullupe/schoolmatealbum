"use client";

import { useState } from 'react';
import { Classmate } from '@/types';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface PictureSectionProps {
  classmates: Classmate[];
}

export default function PictureSection({ classmates }: PictureSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter classmates based on search query
  const filteredClassmates = classmates.filter(classmate => 
    classmate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classmate.profession.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Class Album</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse through memories of our classmates, then and now. Click on any card to learn more about their journey.
        </p>
        
        {/* Search Bar */}
        <div className="mt-6 max-w-md mx-auto relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search by name or profession..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Classmate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClassmates.map((classmate) => (
          <Link key={classmate.id} href={`/classmates/${classmate.id}`}>
            <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg group">
              <div className="grid grid-cols-2 h-full">
                {/* Old Picture */}
                <div className="relative aspect-[3/4]">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${classmate.oldPicture})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 left-3 bg-amber-500/80 text-white py-1 px-3 rounded-full text-xs font-medium">
                    Then
                  </div>
                </div>
                
                {/* New Picture */}
                <div className="relative aspect-[3/4]">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${classmate.newPicture})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 right-3 bg-emerald-500/80 text-white py-1 px-3 rounded-full text-xs font-medium">
                    Now
                  </div>
                </div>
              </div>
              
              {/* Card Content */}
              <CardContent className="p-4">
                <h4 className="text-xl font-semibold">{classmate.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {classmate.profession} {classmate.company && `at ${classmate.company}`}
                </p>
                <div className="mt-2 text-sm text-muted-foreground">
                  Class of {classmate.graduationYear || '2010'}
                </div>
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm text-primary">Click to view full profile →</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {filteredClassmates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No classmates found matching your search.</p>
        </div>
      )}
    </div>
  );
}