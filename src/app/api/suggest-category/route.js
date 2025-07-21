// ✅ Server-only code
import { NextResponse } from 'next/server';
import Fuse from 'fuse.js';
import natural from 'natural';
import nlp from 'compromise';
import fs from 'fs';
import path from 'path';

// 1️⃣ Load taxonomy
const taxonomyPath = path.join(process.cwd(), 'public/data/taxonomy.json');
const taxonomy = JSON.parse(fs.readFileSync(taxonomyPath, 'utf-8'));

// 2️⃣ Flatten and enrich taxonomy
function flattenCategories(tree, prefix = '') {
  return tree.flatMap((node) => {
    const fullPath = prefix ? `${prefix} > ${node.name}` : node.name;

    // Extract words and stem
    const tokens = node.name
      .toLowerCase()
      .split(/\s|&|,|>|-/)
      .filter(Boolean)
      .map((word) => natural.PorterStemmer.stem(word));

    if (!node.children || node.children.length === 0) {
      return [{ path: fullPath, keywords: tokens.join(' ') }];
    }

    return [
      { path: fullPath, keywords: tokens.join(' ') },
      ...flattenCategories(node.children, fullPath),
    ];
  });
}

const categoryPaths = flattenCategories(taxonomy);

// 3️⃣ Preprocess title: stemmed + full string
const preprocessTitle = (title) => {
  const doc = nlp(title.toLowerCase());
  const words = doc.terms().out('array'); // not just nouns
  const stemmed = words.map((w) => natural.PorterStemmer.stem(w));
  return stemmed.join(' ');
};

// 4️⃣ Fuse.js config with smarter search
const fuse = new Fuse(categoryPaths, {
  includeScore: true,
  threshold: 0.45,
  minMatchCharLength: 2,
  keys: ['keywords', 'path'],
  ignoreLocation: true,
});

// 5️⃣ Main API route
export async function POST(req) {
  const { title } = await req.json();
  if (!title) {
    return NextResponse.json({ suggestions: [] });
  }

  const query = preprocessTitle(title); // e.g. "red crzy tshirt" → "red crzi tshirt"
  const results = fuse.search(query);

  const suggestions = results
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((res) => res.item.path);

  return NextResponse.json({ suggestions });
}
