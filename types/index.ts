export interface Classmate {
  id: string;
  name: string;
  oldPicture: string;
  newPicture: string;
  profession: string;
  company?: string;
  location?: string;
  bio: string;
  graduationYear?: number;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
  };
}

export interface BannerSlide {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
}