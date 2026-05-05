import home1 from "../assets/images/page-windows/home/home-1.jpg";
import home2 from "../assets/images/page-windows/home/home-2.jpg";
import home3 from "../assets/images/page-windows/home/home-3.jpg";
import home4 from "../assets/images/page-windows/home/home-4.jpg";
import home5 from "../assets/images/page-windows/home/home-5.jpg";
import home6 from "../assets/images/page-windows/home/home-6.jpg";
import home7 from "../assets/images/page-windows/home/home-7.jpg";

import about1 from "../assets/images/page-windows/about/about-1.jpg";
import about2 from "../assets/images/page-windows/about/about-2.jpg";
import about3 from "../assets/images/page-windows/about/about-3.jpg";
import about4 from "../assets/images/page-windows/about/about-4.jpg";
import about5 from "../assets/images/page-windows/about/about-5.jpg";
import about6 from "../assets/images/page-windows/about/about-6.jpg";

import admissions1 from "../assets/images/page-windows/admissions/admissions-1.jpg";
import admissions2 from "../assets/images/page-windows/admissions/admissions-2.jpg";
import admissions3 from "../assets/images/page-windows/admissions/admissions-3.jpg";
import admissions4 from "../assets/images/page-windows/admissions/admissions-4.jpg";
import admissions5 from "../assets/images/page-windows/admissions/admissions-5.jpg";
import admissions6 from "../assets/images/page-windows/admissions/admissions-6.jpg";

import academics1 from "../assets/images/page-windows/academics/academics-1.jpg";
import academics2 from "../assets/images/page-windows/academics/academics-2.jpg";
import academics3 from "../assets/images/page-windows/academics/academics-3.jpg";
import academics4 from "../assets/images/page-windows/academics/academics-4.jpg";
import academics5 from "../assets/images/page-windows/academics/academics-5.jpg";
import academics6 from "../assets/images/page-windows/academics/academics-6.jpg";

import facilities1 from "../assets/images/page-windows/facilities/facilities-1.jpg";
import facilities2 from "../assets/images/page-windows/facilities/facilities-2.jpg";
import facilities3 from "../assets/images/page-windows/facilities/facilities-3.jpg";
import facilities4 from "../assets/images/page-windows/facilities/facilities-4.jpg";
import facilities5 from "../assets/images/page-windows/facilities/facilities-5.jpg";
import facilities6 from "../assets/images/page-windows/facilities/facilities-6.jpg";

import faculty1 from "../assets/images/page-windows/faculty/faculty-1.jpg";
import faculty2 from "../assets/images/page-windows/faculty/faculty-2.jpg";
import faculty3 from "../assets/images/page-windows/faculty/faculty-3.jpg";
import faculty4 from "../assets/images/page-windows/faculty/faculty-4.jpg";
import faculty5 from "../assets/images/page-windows/faculty/faculty-5.jpg";
import faculty6 from "../assets/images/page-windows/faculty/faculty-6.jpg";

import gallery1 from "../assets/images/page-windows/gallery/gallery-1.jpg";
import gallery2 from "../assets/images/page-windows/gallery/gallery-2.jpg";
import gallery3 from "../assets/images/page-windows/gallery/gallery-3.jpg";
import gallery4 from "../assets/images/page-windows/gallery/gallery-4.jpg";
import gallery5 from "../assets/images/page-windows/gallery/gallery-5.jpg";
import gallery6 from "../assets/images/page-windows/gallery/gallery-6.jpg";

import contact1 from "../assets/images/page-windows/contact/contact-1.jpg";
import contact2 from "../assets/images/page-windows/contact/contact-2.jpg";
import contact3 from "../assets/images/page-windows/contact/contact-3.jpg";
import contact4 from "../assets/images/page-windows/contact/contact-4.jpg";
import contact5 from "../assets/images/page-windows/contact/contact-5.jpg";
import contact6 from "../assets/images/page-windows/contact/contact-6.jpg";

import events1 from "../assets/images/page-windows/events/events-1.jpg";
import events2 from "../assets/images/page-windows/events/events-2.jpg";
import events3 from "../assets/images/page-windows/events/events-3.jpg";
import events4 from "../assets/images/page-windows/events/events-4.jpg";
import events5 from "../assets/images/page-windows/events/events-5.jpg";
import events6 from "../assets/images/page-windows/events/events-6.jpg";

import downloads1 from "../assets/images/page-windows/downloads/downloads-1.jpg";
import downloads2 from "../assets/images/page-windows/downloads/downloads-2.jpg";
import downloads3 from "../assets/images/page-windows/downloads/downloads-3.jpg";
import downloads4 from "../assets/images/page-windows/downloads/downloads-4.jpg";
import downloads5 from "../assets/images/page-windows/downloads/downloads-5.jpg";
import downloads6 from "../assets/images/page-windows/downloads/downloads-6.jpg";

/*
  Editable image-placement system

  For any page/section you only need objects like:
  {
    image: importedImage,
    alt: "Description",
    shape: "portrait" | "landscape" | "circle" | "rounded" | "polaroid",
    frame: "soft" | "polaroid",
    layer: "front" | "back",
    z: "z-0" | "z-10" | "z-20" | "z-30",
    position: "absolute position classes",
    delay: "120ms"
  }
*/

export const homeImageConfig = {
  hero: [
    {
      image: admissions4,
      alt: "Admissions image 4",
      shape: "landscape",
      layer: "front",
      
      position: "right-[2%] top-[115%] w-70 rotate-[-0deg] lg:w-70 xl:w-80 scale-110",
      delay: "220ms",
    },
    
    {
      image: home4,
      alt: "Challenge image 1",
      shape: "polaroid",
      layer: "front",
      position:
        "left-[0%] bottom-[-60%] w-40 rotate-[0deg] lg:w-40 xl:w-80 ",
      delay: "90ms",
    },
    
  ],
  challenge: [
    {
      image: home3,
      alt: "Home hero image 3",
      shape: "polaroid",
      frame: "polaroid",
      layer: "front",
      position:
        "left-[8%] bottom-[-31%] w-32 rotate-[0deg] lg:w-32 xl:w-48 scale-110",
      delay: "190ms",
    },
    
    {
      image: home5,
      alt: "Challenge image 2",
      shape: "polaroid",
      frame: "polaroid",
      layer: "front",
      z: "z-50",
      position:
        "left-[80%] bottom-[-31%] w-32 rotate-[0deg] lg:w-32 xl:w-48 scale-110",
      delay: "150ms",
    },
  ],
  whyChooseUs: [
    {
      image: home2,
      alt: "Why choose us image 3",
      shape: "portrait",
      layer: "front",
      position:
        "left-[75%] bottom-[-50%] w-32 rotate-[0deg] lg:w-32 xl:w-48 scale-110",
      delay: "180ms",
    },
    {
      image: about3,
      alt: "About image 3",
      shape: "polaroid",
      frame: "polaroid",
      layer: "front",
      position:
        "left-[10%] bottom-[-50%] w-32 rotate-[0deg] lg:w-32 xl:w-48 scale-110",
      delay: "180ms",
    },
  ],
  stats: [
    
  ],
  testimonials: [
    
    
    
  ],
  facilities: [
    
    
    
  ],
};

export const aboutImageConfig = {
  items: [
    {
      image: about1,
      alt: "About image 1",
      shape: "portrait",
      layer: "front",
      position: "left-[07%] top-10 w-32 rotate-[-0deg] lg:w-32 xl:w-48 scale-110",
      delay: "80ms",
    },
    {
      image: about2,
      alt: "About image 2",
      shape: "circle",
      layer: "front",
      position: "right-[5%] top-12 w-32 rotate-[0deg] lg:w-32 xl:w-48",
      delay: "130ms",
    },
    
    
    
    
  ],
};

export const admissionsImageConfig = {
  items: [
    
  ],
};

export const academicsImageConfig = {
  items: [
    {
      image: admissions2,
      alt: "Admissions image 2",
      shape: "circle",
      layer: "front",
      position: "left-[2%] top-10 w-32 rotate-[-0deg] lg:w-32 xl:w-48 scale-110",
      delay: "130ms",
    },
    
    
    
    
    
  ],
};

export const facilitiesImageConfig = {
  items: [
    {
      image: facilities1,
      alt: "Facilities image 1",
      shape: "portrait",
      layer: "front",
      position: "left-[-1.5rem] top-10 w-24 rotate-[-10deg] lg:w-28 xl:w-32",
      delay: "80ms",
    },
    {
      image: facilities2,
      alt: "Facilities image 2",
      shape: "circle",
      layer: "back",
      position: "right-[-1rem] top-12 w-20 rotate-[9deg] lg:w-24 xl:w-28",
      delay: "130ms",
    },
    {
      image: facilities3,
      alt: "Facilities image 3",
      shape: "polaroid",
      frame: "polaroid",
      layer: "front",
      position: "left-[4%] top-[28rem] w-24 rotate-[8deg] lg:w-28 xl:w-32",
      delay: "180ms",
    },
    {
      image: facilities4,
      alt: "Facilities image 4",
      shape: "landscape",
      layer: "back",
      position: "right-[2%] top-[34rem] w-32 rotate-[-8deg] lg:w-40 xl:w-44",
      delay: "220ms",
    },
    {
      image: facilities5,
      alt: "Facilities image 5",
      shape: "rounded",
      layer: "front",
      position: "left-[3%] bottom-[22rem] w-20 rotate-[-7deg] lg:w-24 xl:w-28",
      delay: "260ms",
    },
    {
      image: facilities6,
      alt: "Facilities image 6",
      shape: "circle",
      layer: "front",
      position: "right-[4%] bottom-[18rem] w-20 rotate-[8deg] lg:w-24 xl:w-28",
      delay: "300ms",
    },
  ],
};

export const facultyImageConfig = {
  items: [
    
  ],
};

export const galleryImageConfig = {
  items: [
    
  ],
};

export const contactImageConfig = {
  items: [
   
  ],
};

export const eventsImageConfig = {
  items: [
    
  ],
};

export const downloadsImageConfig = {
  items: [
    
  ],
};

export const pageImageMosaics = {
  home: { items: homeImageConfig.hero },
  about: aboutImageConfig,
  admissions: admissionsImageConfig,
  academics: academicsImageConfig,
  facilities: facilitiesImageConfig,
  faculty: facultyImageConfig,
  gallery: galleryImageConfig,
  contact: contactImageConfig,
  events: eventsImageConfig,
  downloads: downloadsImageConfig,
};
