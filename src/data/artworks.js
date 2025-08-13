// Artwork data structure
// Data is now loaded from individual metadata files in public/artworks/
// To add new artwork:
// 1. Create folder public/artworks/[ID]/
// 2. Add image.webp to the folder
// 3. Create metadata.yaml with artwork information
// 4. Run: npm run build:artwork-index

// This file now loads data from the generated index files
async function loadArtworkData() {
  try {
    const response = await fetch('/artworks/index.json');
    const artworks = await response.json();
    return artworks;
  } catch (error) {
    console.error('Failed to load artwork data:', error);
    return [];
  }
}

async function loadCollectionsData() {
  try {
    const response = await fetch('/artworks/collections.json');
    const collections = await response.json();
    return collections;
  } catch (error) {
    console.error('Failed to load collections data:', error);
    return { all: [], recent: [], featured: [], available: [] };
  }
}

// Static data loader for SSR/build time
function getStaticArtworkData() {
  // This data is automatically generated and should match the metadata files
  return [
    {
      id: 1,
      title: "Subtle Autumn",
      year: 1995,
      medium: "Oil on wood",
      dimensions: "18\" × 25\" (46cm × 64cm)",
      image: "/artworks/1/image.webp",
      thumbnail: "/artworks/1/image.webp",
      description: "",
      available: false
    },
    {
      id: 2,
      title: "Best Place",
      year: 1995,
      medium: "Oil on wood",
      dimensions: "15\" × 15\" (38cm × 38cm)",
      image: "/artworks/2/image.webp",
      thumbnail: "/artworks/2/image.webp",
      description: "",
      available: false
    },
    {
      id: 5,
      title: "Rhapsody in Green",
      year: 2010,
      medium: "Oil on wood",
      dimensions: "30\" × 20\" (76cm × 51cm)",
      image: "/artworks/5/image.webp",
      thumbnail: "/artworks/5/image.webp",
      description: "",
      available: false
    },
    {
      id: 47,
      title: "Nursery II",
      year: 2020,
      medium: "Oil on canvas",
      dimensions: "18\" × 24\" (45.72cm × 60.96cm)",
      image: "/artworks/47/image.webp",
      thumbnail: "/artworks/47/image.webp",
      description: "",
      available: true
    },
    {
      id: 67,
      title: "Latona and the Rooster",
      year: 2023,
      medium: "Oil on canvas",
      dimensions: "30\" × 40\" (76.2cm × 101.6cm)",
      image: "/artworks/67/image.webp",
      thumbnail: "/artworks/67/image.webp",
      description: "",
      available: true
    }
  ];
}

// Export functions for dynamic loading
export { loadArtworkData, loadCollectionsData };

// Static exports for immediate compatibility
export const galleryArtworks = getStaticArtworkData();

export const exhibitions = [
  {
    id: "2012",
    title: "Solo Exhibition 2012",
    venue: "Gallery",
    location: "",
    date: "2012",
    description: "A collection of works from 2012 showcasing Amanda's artistic development.",
    images: [
      {
        id: 1,
        title: "Exhibition View 1",
        image: "/exhibitions/1.webp",
        thumbnail: "/exhibitions/1.webp"
      },
      {
        id: 2,
        title: "Exhibition View 2",
        image: "/exhibitions/2.webp",
        thumbnail: "/exhibitions/2.webp"
      },
      {
        id: 3,
        title: "Exhibition View 3",
        image: "/exhibitions/3.webp",
        thumbnail: "/exhibitions/3.webp"
      },
      {
        id: 4,
        title: "Exhibition View 4",
        image: "/exhibitions/4.webp",
        thumbnail: "/exhibitions/4.webp"
      },
      {
        id: 5,
        title: "Exhibition View 5",
        image: "/exhibitions/5.webp",
        thumbnail: "/exhibitions/5.webp"
      }
    ]
  }
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