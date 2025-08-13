#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';

const artworks = [
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/CocaColaRooster.jpeg",
    id: "68",
    title: "Vintage Pride",
    description: "A distinguished white rooster stands proudly beside a classic red Coca-Cola wooden crate, capturing the charm of rural Americana with nostalgic warmth.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "16\" × 20\" (40.6cm × 50.8cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4686.jpeg",
    id: "69",
    title: "Young Holstein",
    description: "A tender portrait of a young black and white calf, capturing the innocence and gentle nature of farm life.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "12\" × 16\" (30.5cm × 40.6cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4687.jpeg",
    id: "70",
    title: "Barnyard Sentinel",
    description: "A proud dark rooster with rich bronze and green plumage, standing alert as the guardian of the farmyard.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "12\" × 16\" (30.5cm × 40.6cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4688.jpeg",
    id: "71",
    title: "Holstein Portrait",
    description: "A classic black and white dairy cow rendered in profile, showcasing the distinctive markings of this beloved breed.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "12\" × 16\" (30.5cm × 40.6cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4689.jpeg",
    id: "72",
    title: "Golden Bull",
    description: "A majestic bull with prominent horns set against a warm golden background, embodying strength and nobility.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "12\" × 16\" (30.5cm × 40.6cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4690.jpeg",
    id: "73",
    title: "Pasture Guardian",
    description: "A brown and white cow positioned behind wire fencing, observing the world with calm curiosity.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "12\" × 16\" (30.5cm × 40.6cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4691.jpeg",
    id: "74",
    title: "Curious Cow",
    description: "A brown and white cow with an attentive and inquisitive expression, leaning against the fence line.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "12\" × 16\" (30.5cm × 40.6cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4692.jpeg",
    id: "75",
    title: "Golden Rooster",
    description: "A magnificent rooster with golden and teal plumage, displaying the full grandeur of barnyard royalty.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "12\" × 16\" (30.5cm × 40.6cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4693.jpeg",
    id: "76",
    title: "Country Rooster",
    description: "A handsome rooster with striking blue-black tail feathers, embodying rustic charm and confidence.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "12\" × 16\" (30.5cm × 40.6cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4694.jpeg",
    id: "77",
    title: "Bantam Rooster",
    description: "A colorful small rooster with iridescent feathers that shimmer with natural beauty and vibrant hues.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "12\" × 16\" (30.5cm × 40.6cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4695.jpeg",
    id: "78",
    title: "Nesting Hens",
    description: "Two white hens resting peacefully on the wooden structure of their chicken coop, portraying domestic tranquility.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "16\" × 20\" (40.6cm × 50.8cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4696.jpeg",
    id: "79",
    title: "Rooster Standoff",
    description: "Two roosters facing each other in a tense moment of territorial confrontation, capturing natural behavior and drama.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "16\" × 20\" (40.6cm × 50.8cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4698.jpeg",
    id: "80",
    title: "Roost Mates",
    description: "A rooster and hen perched together on a wooden beam, showing the companionship of farm life.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "16\" × 20\" (40.6cm × 50.8cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4699.jpeg",
    id: "81",
    title: "Nesting Boxes",
    description: "A protective hen with her baby chicks nestled safely in wooden nesting compartments, depicting maternal care.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "16\" × 20\" (40.6cm × 50.8cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4700.jpeg",
    id: "82",
    title: "Boy and Rooster",
    description: "A charming scene of a young boy sitting on a wooden stool beside his white feathered companion, capturing childhood innocence.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "16\" × 20\" (40.6cm × 50.8cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4701.jpeg",
    id: "83",
    title: "Mother's Love",
    description: "An intimate and tender moment between a nursing mother and her infant, painted with warmth and sensitivity.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "16\" × 20\" (40.6cm × 50.8cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4702.jpeg",
    id: "84",
    title: "Girl with Canary",
    description: "A sweet portrait of a young blonde girl in a pink dress, gently holding a bright yellow canary with pure joy.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "12\" × 16\" (30.5cm × 40.6cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4703.jpeg",
    id: "85",
    title: "Boy with Maltese",
    description: "A young boy in overalls sitting contentedly with his small white Maltese dog companion, radiating companionship and trust.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "16\" × 20\" (40.6cm × 50.8cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4705.jpeg",
    id: "86",
    title: "The Farmgirl",
    description: "A young girl with a red headscarf holding a pristine white rooster, embodying the spirit of rural life and tradition.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "16\" × 20\" (40.6cm × 50.8cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4706.jpeg",
    id: "87",
    title: "Mediterranean Roosters",
    description: "A group of roosters gathered by a vibrant yellow adobe wall, evoking the warmth and charm of Mediterranean countryside.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "16\" × 20\" (40.6cm × 50.8cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4707.jpeg",
    id: "88",
    title: "Rooster and Hen",
    description: "A golden rooster standing alongside a smaller brown hen, showcasing the natural partnership of barnyard life.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "16\" × 20\" (40.6cm × 50.8cm)",
    available: "true"
  },
  {
    image: "/Users/c/Library/CloudStorage/SynologyDrive-Home/06_Technical_and_Code/MammaArt/Web/Art/IMG_4724.jpeg",
    id: "89",
    title: "Mother and Chicks",
    description: "A brooding hen with her precious baby chicks safely nestled in wooden nesting boxes, celebrating new life and maternal protection.",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "16\" × 20\" (40.6cm × 50.8cm)",
    available: "true"
  }
];

async function addArtwork(artwork) {
  return new Promise((resolve, reject) => {
    const args = [
      'scripts/add-artwork.js',
      '--image', artwork.image,
      '--title', artwork.title,
      '--description', artwork.description,
      '--medium', artwork.medium,
      '--available', artwork.available
    ];

    const child = spawn('node', args, { 
      stdio: ['pipe', 'pipe', 'pipe'],
      cwd: process.cwd()
    });

    let output = '';
    let errorOutput = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
      console.log(data.toString());
    });

    child.stderr.on('data', (data) => {
      errorOutput += data.toString();
      console.error(data.toString());
    });

    // Send the required inputs
    child.stdin.write(`${artwork.id}\n`);
    child.stdin.write(`${artwork.year}\n`);
    child.stdin.write(`${artwork.dimensions}\n`);
    child.stdin.end();

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ Successfully added: ${artwork.title}`);
        resolve();
      } else {
        console.error(`❌ Failed to add: ${artwork.title} (exit code: ${code})`);
        reject(new Error(`Process exited with code ${code}`));
      }
    });

    child.on('error', (error) => {
      console.error(`❌ Error adding ${artwork.title}:`, error);
      reject(error);
    });
  });
}

async function batchAddArtworks() {
  console.log(`🎨 Starting batch addition of ${artworks.length} artworks...\n`);
  
  for (let i = 0; i < artworks.length; i++) {
    const artwork = artworks[i];
    console.log(`\n[${i + 1}/${artworks.length}] Adding: ${artwork.title}`);
    
    try {
      await addArtwork(artwork);
      // Small delay between additions
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to add ${artwork.title}:`, error.message);
      // Continue with next artwork
    }
  }
  
  console.log('\n🎉 Batch addition complete!');
}

batchAddArtworks().catch(console.error);