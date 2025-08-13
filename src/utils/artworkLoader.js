// Artwork Data Loader
// This utility loads artwork data from the file-based metadata system

// For client-side loading, we'll use a static approach initially
// In a production setup, this would fetch from an API endpoint

export async function loadArtworkData() {
  // Generate artwork data based on the known structure
  const artworks = [];
  
  for (let id = 1; id <= 67; id++) {
    const artwork = {
      id,
      title: `Artwork ${id}`, // Default fallback
      year: 2023,
      medium: "Oil on canvas",
      dimensions: "",
      image: `/artworks/${id}/image.webp`,
      thumbnail: `/artworks/${id}/image.webp`,
      description: "",
      available: false
    };
    
    artworks.push(artwork);
  }
  
  return artworks;
}

// Helper function to get artwork by ID
export function getArtworkById(artworks, id) {
  return artworks.find(art => art.id === parseInt(id));
}

// Helper function to get available artworks
export function getAvailableArtworks(artworks) {
  return artworks.filter(art => art.available);
}

// Helper function to get artworks by year range
export function getArtworksByYearRange(artworks, startYear, endYear) {
  return artworks.filter(art => art.year >= startYear && art.year <= endYear);
}