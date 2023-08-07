export const sortOptions = [
  { label: "Popularity", paramName: "sort", paramValue: "popularity" },
  { label: "Average rating", paramName: "sort", paramValue: "rating" },
  { label: "Newness", paramName: "sort", paramValue: "newness" },
  {
    label: "Price: Low to High",
    paramName: "sort",
    paramValue: "price-low-to-high",
  },
  {
    label: "Price: High to Low",
    paramName: "sort",
    paramValue: "price-high-to-low",
  },
];

export const categoryData = [
  {
    text: "Bags & Backpacks",
    url: "bags-backpacks",
  },
  {
    text: "Decoration",
    url: "decoration",
  },
  {
    text: "Essentials",
    url: "essentials",
  },
  {
    text: "Interior",
    url: "interior",
  },
];

export const colors = [
  { color: "#0000FF", name: "Blue" },
  { color: "#A52A2A", name: "Brown" },
  { color: "#808080", name: "Gray" },
  { color: "#008000", name: "Green" },
  { color: "#FFA500", name: "Orange" },
  { color: "#FFFFFF", name: "White" },
];

export const priceRanges = [
  { label: "$0 - $50", min_price: 0, max_price: 50 },
  { label: "$50 - $100", min_price: 50, max_price: 100 },
  { label: "$100 - $150", min_price: 100, max_price: 150 },
  { label: "$150 - $200", min_price: 150, max_price: 200 },
  { label: "$200+", min_price: 200, max_price: Infinity },
];
