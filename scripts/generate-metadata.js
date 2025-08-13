#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the artwork data
const artworksData = [
  {
    id: 1,
    title: "Subtle Autumn",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "18\" × 25\" (46cm × 64cm)",
    description: "",
    available: false
  },
  {
    id: 2,
    title: "Best Place",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 3,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 4,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 5,
    title: "Rhapsody in Green",
    year: 2010,
    medium: "Oil on wood",
    dimensions: "30\" × 20\" (76cm × 51cm)",
    description: "",
    available: false
  },
  {
    id: 6,
    title: "Gentle Perfection",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "20\" × 30\" (51cm × 76cm)",
    description: "",
    available: false
  },
  {
    id: 7,
    title: "Once Upon a Time in Namibia",
    year: 2001,
    medium: "Oil on wood",
    dimensions: "25\" × 16\" (64cm × 41cm)",
    description: "",
    available: false
  },
  {
    id: 8,
    title: "Paradise Found",
    year: 2001,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 9,
    title: "Hexberg Hydrangeas",
    year: 2001,
    medium: "Oil on wood",
    dimensions: "20\" × 28\" (51cm × 71cm)",
    description: "",
    available: false
  },
  {
    id: 10,
    title: "Amish Games",
    year: 2003,
    medium: "Oil on wood",
    dimensions: "30\" × 20\" (76cm × 51cm)",
    description: "",
    available: false
  },
  {
    id: 11,
    title: "Wagenmakersvallei",
    year: 2005,
    medium: "Oil on wood",
    dimensions: "30\" × 20\" (76cm × 51cm)",
    description: "",
    available: false
  },
  {
    id: 12,
    title: "Friends Forever",
    year: 2005,
    medium: "Oil on wood",
    dimensions: "15\" × 12\" (38cm × 30cm)",
    description: "",
    available: false
  },
  {
    id: 13,
    title: "Cape Culture",
    year: 2005,
    medium: "Oil on wood",
    dimensions: "17\" × 12\" (43cm × 35cm)",
    description: "",
    available: false
  },
  {
    id: 14,
    title: "Home is Where the Flowers Are",
    year: 2001,
    medium: "Oil on canvas",
    dimensions: "20\" × 28\" (51cm × 71cm)",
    description: "",
    available: false
  },
  {
    id: 15,
    title: "Siblings Forever",
    year: 2008,
    medium: "Oil on wood",
    dimensions: "50\" × 35\" (127cm × 89cm)",
    description: "",
    available: false
  },
  {
    id: 16,
    title: "Brooding Weather — Lelienfontein",
    year: 2005,
    medium: "Oil on wood",
    dimensions: "30\" × 20\" (76cm × 51cm)",
    description: "",
    available: false
  },
  {
    id: 17,
    title: "Serendipity — Bontebok Ridge",
    year: 2009,
    medium: "Oil on wood",
    dimensions: "38\" × 50\" (97cm × 127cm)",
    description: "",
    available: false
  },
  {
    id: 18,
    title: "Breakfast",
    year: 2009,
    medium: "Oil on wood",
    dimensions: "15\" × 10\" (38cm × 25cm)",
    description: "",
    available: false
  },
  {
    id: 19,
    title: "Elegant Triplets",
    year: 2010,
    medium: "Oil on wood",
    dimensions: "30\" × 17\" (76cm × 43cm)",
    description: "",
    available: false
  },
  {
    id: 20,
    title: "Hi Ho!",
    year: 2009,
    medium: "Oil on wood",
    dimensions: "12\" × 12\" (30cm × 30cm)",
    description: "",
    available: false
  },
  {
    id: 21,
    title: "Bye Bye Jo!",
    year: 2009,
    medium: "Oil on wood",
    dimensions: "12\" × 12\" (30cm × 30cm)",
    description: "",
    available: false
  },
  {
    id: 22,
    title: "Nursery I",
    year: 2009,
    medium: "Oil on wood",
    dimensions: "18\" × 24\" (46cm × 61cm)",
    description: "",
    available: false
  },
  {
    id: 23,
    title: "Captain",
    year: 2012,
    medium: "Oil on wood",
    dimensions: "30\" × 14\" (76cm × 35cm)",
    description: "",
    available: false
  },
  {
    id: 24,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 25,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 26,
    title: "Bed Time I",
    year: 2010,
    medium: "Oil on canvas",
    dimensions: "30\" × 40\" (76cm × 102cm)",
    description: "",
    available: false
  },
  {
    id: 27,
    title: "Bed Time II",
    year: 2010,
    medium: "Oil on canvas",
    dimensions: "30\" × 40\" (76cm × 102cm)",
    description: "",
    available: false
  },
  {
    id: 28,
    title: "Stroll",
    year: 2012,
    medium: "Oil on wood",
    dimensions: "50\" × 35\" (127cm × 89cm)",
    description: "",
    available: false
  },
  {
    id: 29,
    title: "Nature's Remedy",
    year: 2012,
    medium: "Oil on wood",
    dimensions: "15\" × 10\" (38cm × 25cm)",
    description: "",
    available: false
  },
  {
    id: 30,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 31,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 32,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 33,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 34,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 35,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 36,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 37,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 38,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 39,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 40,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 41,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 42,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 43,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 44,
    title: "Title to be confirmed",
    year: 1995,
    medium: "Oil on wood",
    dimensions: "15\" × 15\" (38cm × 38cm)",
    description: "",
    available: false
  },
  {
    id: 45,
    title: "Ready, Steady, Sleep",
    year: 2012,
    medium: "Oil on canvas",
    dimensions: "14\" × 10\" (35.56cm × 25.4cm)",
    description: "",
    available: false
  },
  {
    id: 46,
    title: "Tea Time Reverie",
    year: 2020,
    medium: "Oil on canvas",
    dimensions: "29\" × 35\" (73.66cm × 88.9cm)",
    description: "",
    available: false
  },
  {
    id: 47,
    title: "Nursery II",
    year: 2020,
    medium: "Oil on canvas",
    dimensions: "18\" × 24\" (45.72cm × 60.96cm)",
    description: "",
    available: true
  },
  {
    id: 48,
    title: "Friendship Required",
    year: 2020,
    medium: "Oil on canvas",
    dimensions: "10\" × 10\" (25.4cm × 25.4cm)",
    description: "",
    available: true
  },
  {
    id: 49,
    title: "Friendship Acquired",
    year: 2020,
    medium: "Oil on canvas",
    dimensions: "10\" × 10\" (25.4cm × 25.4cm)",
    description: "",
    available: true
  },
  {
    id: 50,
    title: "Colonel",
    year: 2020,
    medium: "Oil on canvas",
    dimensions: "22\" × 28\" (55.88cm × 71.12cm)",
    description: "",
    available: false
  },
  {
    id: 51,
    title: "Buttercup",
    year: 2020,
    medium: "Oil on canvas",
    dimensions: "14\" × 14\" (35.56cm × 35.56cm)",
    description: "",
    available: false
  },
  {
    id: 52,
    title: "Dolly",
    year: 2020,
    medium: "Oil on canvas",
    dimensions: "14\" × 14\" (35.56cm × 35.56cm)",
    description: "",
    available: false
  },
  {
    id: 53,
    title: "Wilbur",
    year: 2020,
    medium: "Oil on canvas",
    dimensions: "14\" × 14\" (35.56cm × 35.56cm)",
    description: "",
    available: false
  },
  {
    id: 54,
    title: "Nando",
    year: 2020,
    medium: "Oil on canvas",
    dimensions: "14\" × 14\" (35.56cm × 35.56cm)",
    description: "",
    available: false
  },
  {
    id: 55,
    title: "Liekie se Stewels",
    year: 2008,
    medium: "Oil on board",
    dimensions: "24\" × 30\" (60.96cm × 76.2cm)",
    description: "",
    available: false
  },
  {
    id: 56,
    title: "The Giant From Jersey",
    year: 2020,
    medium: "Oil on canvas",
    dimensions: "28\" × 22\" (71.12cm × 55.88cm)",
    description: "",
    available: false
  },
  {
    id: 57,
    title: "Title to be confirmed",
    year: 2020,
    medium: "Oil on canvas",
    dimensions: "12\" × 12\" (30.48cm × 30.48cm)",
    description: "",
    available: false
  },
  {
    id: 58,
    title: "What Friends Are For",
    year: 2020,
    medium: "Oil on canvas",
    dimensions: "22\" × 28\" (55.88cm × 71.12cm)",
    description: "",
    available: false
  },
  {
    id: 59,
    title: "Clint",
    year: 2021,
    medium: "Oil on canvas",
    dimensions: "24\" × 30\" (60.96cm × 76.2cm)",
    description: "",
    available: false
  },
  {
    id: 60,
    title: "Frankie",
    year: 2022,
    medium: "Oil on canvas",
    dimensions: "24\" × 30\" (60.96cm × 76.2cm)",
    description: "",
    available: false
  },
  {
    id: 61,
    title: "Desert Trek",
    year: 2022,
    medium: "Oil on canvas",
    dimensions: "24\" × 30\" (60.96cm × 76.2cm)",
    description: "",
    available: false
  },
  {
    id: 62,
    title: "Checking In",
    year: 2022,
    medium: "Oil on canvas",
    dimensions: "24\" × 30\" (60.96cm × 76.2cm)",
    description: "",
    available: true
  },
  {
    id: 63,
    title: "Bedtime",
    year: 2022,
    medium: "Oil on canvas",
    dimensions: "24\" × 30\" (60.96cm × 76.2cm)",
    description: "",
    available: false
  },
  {
    id: 64,
    title: "Vintage Bouquet",
    year: 2019,
    medium: "Oil on canvas",
    dimensions: "24\" × 30\" (60.96cm × 76.2cm)",
    description: "",
    available: false
  },
  {
    id: 65,
    title: "Kraaltoe",
    year: 2019,
    medium: "Oil on canvas",
    dimensions: "24\" × 30\" (60.96cm × 76.2cm)",
    description: "",
    available: false
  },
  {
    id: 66,
    title: "Hoenderhok",
    year: 2021,
    medium: "Oil on canvas",
    dimensions: "24\" × 30\" (60.96cm × 76.2cm)",
    description: "",
    available: false
  },
  {
    id: 67,
    title: "Latona and the Rooster",
    year: 2023,
    medium: "Oil on canvas",
    dimensions: "30\" × 40\" (76.2cm × 101.6cm)",
    description: "",
    available: true
  }
];

function generateYamlMetadata(artwork) {
  return `---
# Artwork Metadata
# This file contains metadata for artwork #${artwork.id}
# Edit this file to update artwork information without modifying code

id: ${artwork.id}
title: "${artwork.title}"
year: ${artwork.year}
medium: "${artwork.medium}"
dimensions: "${artwork.dimensions}"
description: "${artwork.description}"
available: ${artwork.available}

# Optional fields (uncomment and add as needed):
# price: "$X,XXX"
# series: "Series Name"
# tags: ["tag1", "tag2", "tag3"]
# exhibitions:
#   - "Exhibition Name, Year"
# notes: "Internal notes about the artwork"
`;
}

// Generate metadata files for each artwork
artworksData.forEach(artwork => {
  const artworkDir = path.join(__dirname, '../public/artworks', artwork.id.toString());
  const metadataPath = path.join(artworkDir, 'metadata.yaml');
  
  // Ensure directory exists
  if (!fs.existsSync(artworkDir)) {
    fs.mkdirSync(artworkDir, { recursive: true });
  }
  
  // Write metadata file
  const yamlContent = generateYamlMetadata(artwork);
  fs.writeFileSync(metadataPath, yamlContent, 'utf8');
  
  console.log(`✓ Generated metadata for artwork #${artwork.id}: ${artwork.title}`);
});

console.log('\n🎨 Successfully generated metadata.yaml files for all 67 artworks!');
console.log('\nEach artwork now has its own folder structure:');
console.log('public/artworks/[ID]/');
console.log('├── image.webp');
console.log('└── metadata.yaml');