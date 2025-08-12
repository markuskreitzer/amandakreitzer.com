// Artwork data structure
// To add new artwork:
// 1. Add image to public/artworks/ folder
// 2. Add metadata object to the appropriate array below

export const galleryArtworks = [
  {
    id: 1,
    title: "Untitled 1",
    year: 2024,
    medium: "Oil on canvas",
    dimensions: "24 x 36 inches",
    image: "/artworks/gallery/1.webp",
    thumbnail: "/artworks/gallery/thumbs/1.webp",
    description: "",
    available: true
  },
  {
    id: 2,
    title: "Untitled 2",
    year: 2024,
    medium: "Oil on canvas",
    dimensions: "30 x 40 inches",
    image: "/artworks/gallery/2.webp",
    thumbnail: "/artworks/gallery/thumbs/2.webp",
    description: "",
    available: true
  },
  // Add more gallery pieces here
];

export const exhibitions = [
  {
    id: "2012",
    title: "Solo Exhibition 2012",
    venue: "Gallery Name",
    location: "City, State",
    date: "Month Year",
    description: "Exhibition description here",
    images: [
      {
        id: 1,
        title: "Exhibition View 1",
        image: "/artworks/exhibitions/2012/1.webp",
        thumbnail: "/artworks/exhibitions/2012/thumbs/1.webp"
      },
      // Add more exhibition images here
    ]
  },
  // Add more exhibitions here
];

export const collections = {
  recent: galleryArtworks.slice(0, 6),
  featured: galleryArtworks.filter(art => art.available).slice(0, 4),
  all: galleryArtworks
};

// Helper function to get artwork by ID
export const getArtworkById = (id) => {
  return galleryArtworks.find(art => art.id === id);
};

// Helper function to get exhibition by ID
export const getExhibitionById = (id) => {
  return exhibitions.find(ex => ex.id === id);
};