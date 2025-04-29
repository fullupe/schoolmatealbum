"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Book, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Track scroll position to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Book className={cn(
              "h-6 w-6 transition-colors",
              isScrolled ? "text-foreground" : "text-white"
            )} />
            <span className={cn(
              "font-semibold text-lg transition-colors",
              isScrolled ? "text-foreground" : "text-white"
            )}>
              SAGYIMASE - 1999
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className={cn(
                "transition-colors hover:text-primary",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              Home
            </Link>
            <Link
              href="#"
              className={cn(
                "transition-colors hover:text-primary",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              Reunions
            </Link>
            <Link
              href="#"
              className={cn(
                "transition-colors hover:text-primary",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              Share Your Story
            </Link>
            <Link
              href="#"
              className={cn(
                "transition-colors hover:text-primary",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              Contact
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden",
              isScrolled ? "text-foreground" : "text-white"
            )}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          
          <nav className="flex flex-col items-center space-y-8 p-8">
            <Link
              href="/"
              className="text-foreground text-xl font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-foreground text-xl font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reunions
            </Link>
            <Link
              href="#"
              className="text-foreground text-xl font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Share Your Story
            </Link>
            <Link
              href="#"
              className="text-foreground text-xl font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}