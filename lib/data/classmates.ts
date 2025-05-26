import { Classmate, BannerSlide } from '@/types';

const defaultImg ="https://res.cloudinary.com/fullupe/image/upload/v1745965070/SAGYIMASE_1999/a5brcz5sxkffgegvctme.jpg"
// Mock data for classmates
export const classmates: Classmate[] = [
  {
    id: "1",
    name: "Gyekye",
    oldPicture: defaultImg,
    newPicture: "https://res.cloudinary.com/fullupe/image/upload/v1745957889/SAGYIMASE_1999/ozikqlqvdimiqjsufdxw.jpg",
    profession: "Software Eng",
    company: "Editec Uk",
    location: "Accra, Ghana",
    bio: "After graduation, I pursued my passion for coding and now work as a senior software engineer. I love building products that impact millions of users.",
    graduationYear: 1999,
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson",
    },
    contact: {
      email: "wnkgyekye@gmail.com",
      phone: "+233 (24) 226-1979",
    }
  },
  {
    id: "2",
    name: "George Boadi",
    oldPicture: defaultImg,
    newPicture: "https://res.cloudinary.com/fullupe/image/upload/v1745957179/SAGYIMASE_1999/ausl9ibejx7lguqx2xqz.jpg",
    profession: "Professional Teacher",
    company: "Ghana Education Service",
    location: "Accra, Ghana",
    bio: "My ten years as a high school teacher have been driven by a passion for science,Mathematics and a commitment to empowering students to reach their full academic potential. I strive to create meaningful connections with the curriculum that resonate with their lives and prepare them for future success.",
    graduationYear: 1999,
    socialLinks: {
      linkedin: "https://linkedin.com/in/williamgyekye",
      instagram: "https://instagram.com/Nanakg",
    },
    contact: {
      email: "wnkgyekye@gmail.com",
      phone: "+1 (555) 123-4567",
    }
  },
  {
    id: "3",
    name: "Addo Bampo",
    oldPicture: defaultImg,
    newPicture: "https://res.cloudinary.com/fullupe/image/upload/v1745957179/SAGYIMASE_1999/kkxvvgpxxjtzlqfia1nx.jpg",
    profession: "Professional Plumber",
    company: "Self Employed",
    location: "Accra, Ghana",
    bio: "A skilled and experienced plumber with ten years in the industry, I specialize in diagnosing and resolving complex plumbing issues. My proficiency covers installations, repairs, and maintenance, always delivered with precision and attention to detail.",
    graduationYear: 1999,
    socialLinks: {
      linkedin: "https://linkedin.com/in/emilyrodriguez",
      facebook: "https://facebook.com/emilyrodriguez",
    },
    contact: {
      email: "emily.rodriguez@example.com",
      phone: "+1 (555) 987-6543",
    }
  },
  {
    id: "4",
    name: "Yeboah Joe",
    oldPicture: defaultImg,
    newPicture: "https://res.cloudinary.com/fullupe/image/upload/v1745961652/SAGYIMASE_1999/acrvp3dg5lrqwqkjyjw3.jpg",
    profession: "Fashion Designer",
    company: "Self Employed",
    location: "Accra, Ghana",
    bio: "With ten years dedicated to the art of fashion design, my philosophy centers on understanding and translating individual aspirations into unique and expressive clothing. I strive to create designs that resonate with my clients, blending their personal style with my creative expertise.",
    graduationYear: 1999,
    socialLinks: {
      linkedin: "https://linkedin.com/in/davidwilliams",
    },
    contact: {
      email: "Ojoe@example.com",
      phone: "+1 (555) 987-6543",
    }
  },
  {
    id: "5",
    name: "Fredrick Agyeman",
    oldPicture: defaultImg,
    newPicture: "https://res.cloudinary.com/fullupe/image/upload/v1745963561/SAGYIMASE_1999/uybwgqzcz7vnxcdej8i3.jpg",
    profession: "Electronics Eng.",
    company: "Self Employed ",
    location: "Accra, Ghana",
    bio: "A highly skilled electronics repairer with ten years in the industry, I specialize in the meticulous troubleshooting and repair of intricate electronic systems. My proficiency extends to component-level repairs, ensuring precision and lasting solutions.",
    graduationYear: 1999,
    socialLinks: {
      linkedin: "https://linkedin.com/in/sofiamartinez",
      instagram: "https://instagram.com/sofiamartinez",
      twitter: "https://twitter.com/sofiamartinez",
    },
    contact: {
      email: "Agyeman@example.com",
      phone: "+1 (555) 987-6543",
    }
  },
  {
    id: "6",
    name: "Grace",
    oldPicture: defaultImg,
    newPicture: "https://res.cloudinary.com/fullupe/image/upload/v1745964118/SAGYIMASE_1999/h0anchg7eajp7r9rwtjp.jpg",
    profession: "Chef",
    company: "The Golden Spoon",
    location: "Accra, Ghana",
    bio: "Food has always been my passion. After culinary school, I worked in several Michelin-starred restaurants before opening my own establishment.",
    graduationYear: 1999,
    socialLinks: {
      instagram: "https://instagram.com/chefkimmy",
      facebook: "https://facebook.com/jameskim",
    },
    contact: {
      email: "Grace@example.com",
      phone: "+1 (555) 987-6543",
    }
  }
];

// Banner slides data
export const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Class of 1999 SAGYIMASE",
    subtitle: "Reconnect with your classmates"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Remember the Good Times",
    subtitle: "Share your memories with the class"
  },
  {
    id: 3,
    image: defaultImg,
    title: "Where Are They Now?",
    subtitle: "Discover what your classmates are up to"
  }
];

// Helper function to get all classmates
export function getAllClassmates(): Classmate[] {
  return classmates;
}

// Helper function to get classmate by ID
export function getClassmateById(id: string): Classmate | undefined {
  return classmates.find(classmate => classmate.id === id);
}

// Helper function to search classmates
export function searchClassmates(query: string): Classmate[] {
  const lowerCaseQuery = query.toLowerCase();
  return classmates.filter(classmate => 
    classmate.name.toLowerCase().includes(lowerCaseQuery) || 
    classmate.profession.toLowerCase().includes(lowerCaseQuery) ||
    (classmate.location && classmate.location.toLowerCase().includes(lowerCaseQuery))
  );
}