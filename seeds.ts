import { Types } from "mongoose";
import Category, { CategoryDocument } from "./src/models/category";
import Listing from "./src/models/listing";
import { connect } from "./src/lib/db";

const seed = async () => {
  await connect();
  await Category.deleteMany({});
  await Listing.deleteMany({});

  const tvCategory: CategoryDocument = await Category.create({
    name: "Televisions",
    slug: "televisions",
    attributeSchema: [
      { name: "brand", label: "Brand", type: "checkbox" },
      { name: "screen_type", label: "Screen Type", type: "checkbox" },
      { name: "screen_size", label: "Screen Size", type: "checkbox" },
      { name: "resolution", label: "Resolution", type: "checkbox" },
    ],
  });

  const shoeCategory: CategoryDocument = await Category.create({
    name: "Running Shoes",
    slug: "running-shoes",
    attributeSchema: [
      { name: "brand", label: "Brand", type: "checkbox" },
      { name: "size", label: "Size", type: "checkbox" },
      { name: "gender", label: "Gender", type: "checkbox" },
      { name: "color", label: "Color", type: "checkbox" },
    ],
  });

  const locations = [ "Ahmedabad", "Bangalore", "Mumbai", "Delhi", "Kolkata", "Chennai", "Pune", "Hyderabad" ];
  const listings = [];

  const getRandomInt: (max: number, min?: number) => number = (max, min = 0) => {
    return Math.floor(Math.random() * max) + min;
  };

  const tvBrands = ["Samsung", "LG", "Sony", "Panasonic"];
  const tvTypes = [ "LCD", "LED", "QLED", "OLED" ];
  const tvScreens = [ 32, 40, 43, 50, 55, 60, 65, 70, 75, 80 ];
  const resolutions = ["HD Ready", "Full HD", "4K UHD"];
  const tvImages = [
    "http://localhost:3000/televisions/image1.avif",
    "http://localhost:3000/televisions/image2.jpg",
    "http://localhost:3000/televisions/image3.webp",
    "http://localhost:3000/televisions/image4.jpg",
    "http://localhost:3000/televisions/image5.avif",
    "http://localhost:3000/televisions/image6.jpg",
    "http://localhost:3000/televisions/image7.webp",
    "http://localhost:3000/televisions/image8.webp",
    "http://localhost:3000/televisions/image9.jpg",
    "http://localhost:3000/televisions/image10.jpg",
  ];
  for (let i = 0; i < 1000; i++) {
    const attributes = {
      brand: tvBrands[getRandomInt(tvBrands.length)],
      screen_type: tvTypes[getRandomInt(tvTypes.length)],
      screen_size: tvScreens[getRandomInt(tvScreens.length)],
      resolution: resolutions[getRandomInt(resolutions.length)],
    };
    listings.push({
      title: `${attributes.brand} ${attributes.screen_size} Inch ${attributes.resolution} ${attributes.screen_type} Smart TV`,
      description: "A great smart television for your living room.",
      price: getRandomInt(800000, 50000),
      location: locations[i % locations.length],
      thumbnail: tvImages[Math.floor(Math.random() * tvImages.length)],
      categoryId: tvCategory._id as Types.ObjectId,
      attributes: Object.keys(attributes).map((key: string) => {
        return { key, value: attributes[key] as any };
      }),
    });
  }

  const shoeBrands = ["Nike", "Adidas", "Puma", "Reebok"];
  const shoeSizes = [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
  const genders = ["Men", "Women"];
  const colors = ["Black", "White", "Red", "Blue", "Gray", "Green", "Orange", "Yellow"];
  const shoeImages = [
    "http://localhost:3000/running-shoes/image1.jpg",
    "http://localhost:3000/running-shoes/image2.webp",
    "http://localhost:3000/running-shoes/image3.jpg",
    "http://localhost:3000/running-shoes/image4.webp",
    "http://localhost:3000/running-shoes/image5.jpg",
    "http://localhost:3000/running-shoes/image6.webp",
    "http://localhost:3000/running-shoes/image7.webp",
    "http://localhost:3000/running-shoes/image8.jpg",
    "http://localhost:3000/running-shoes/image9.webp",
    "http://localhost:3000/televisions/image10.jpg",
  ];
  for (let i = 0; i < 1000; i++) {
    const attributes = {
      brand: shoeBrands[getRandomInt(shoeBrands.length)],
      size: shoeSizes[getRandomInt(shoeSizes.length)],
      gender: genders[getRandomInt(genders.length)],
      color: colors[getRandomInt(colors.length)],
    };
    listings.push({
      title: `${attributes.brand} Running Shoes Size ${attributes.size}`,
      description: "Comfortable and stylish running shoes.",
      price: getRandomInt(10000, 1000),
      location: locations[i % locations.length],
      thumbnail: shoeImages[Math.floor(Math.random() * shoeImages.length)],
      categoryId: shoeCategory._id as Types.ObjectId,
      attributes: Object.keys(attributes).map((key: string) => {
        return { key, value: attributes[key] as any };
      }),
    });
  }

  await Listing.insertMany(listings);
  console.log("Seeded 2000 listings.");
  process.exit();
};

seed();
