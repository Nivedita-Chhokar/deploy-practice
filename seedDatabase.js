const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const Product = require('./models/product');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding...'))
  .catch(err => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });

// Sample admin user
const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin'
};

// Sample customer user
const customerUser = {
  name: 'Test Customer',
  email: 'customer@example.com',
  password: 'customer123',
  role: 'customer'
};

// Sample products
const products = [
  {
    title: 'Classic Running Shoes',
    price: 3499,
    description: 'Comfortable running shoes with cushioned insoles and breathable material.',
    image: 'https://via.placeholder.com/500x500?text=RunningShoes',
    stock: 50,
    category: 'shoes',
    inStock: true,
    ratings: {
      average: 4.5,
      count: 125
    }
  },
  {
    title: 'Sport Sneakers',
    price: 2999,
    description: 'Stylish sport sneakers perfect for casual wear and light exercise.',
    image: 'https://via.placeholder.com/500x500?text=SportSneakers',
    stock: 35,
    category: 'shoes',
    inStock: true,
    ratings: {
      average: 4.2,
      count: 78
    }
  },
  {
    title: 'Formal Oxford Shoes',
    price: 4599,
    description: 'Classic formal Oxford shoes made with genuine leather.',
    image: 'https://via.placeholder.com/500x500?text=OxfordShoes',
    stock: 25,
    category: 'shoes',
    inStock: true,
    ratings: {
      average: 4.7,
      count: 42
    }
  },
  {
    title: 'Cotton T-Shirt',
    price: 999,
    description: 'Soft, breathable cotton t-shirt available in multiple colors.',
    image: 'https://via.placeholder.com/500x500?text=CottonTShirt',
    stock: 100,
    category: 'shirts',
    inStock: true,
    ratings: {
      average: 4.1,
      count: 215
    }
  },
  {
    title: 'Formal Button-Down Shirt',
    price: 1899,
    description: 'Crisp, professional button-down shirt perfect for business occasions.',
    image: 'https://via.placeholder.com/500x500?text=FormalShirt',
    stock: 60,
    category: 'shirts',
    inStock: true,
    ratings: {
      average: 4.4,
      count: 89
    }
  },
  {
    title: 'Casual Polo Shirt',
    price: 1499,
    description: 'Classic polo shirt combining comfort and style for casual occasions.',
    image: 'https://via.placeholder.com/500x500?text=PoloShirt',
    stock: 75,
    category: 'shirts',
    inStock: true,
    ratings: {
      average: 4.3,
      count: 112
    }
  }
];

// Seed Users
const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});
    console.log('Deleted existing users');

    // Hash passwords
    const adminHash = await bcrypt.hash(adminUser.password, 10);
    const customerHash = await bcrypt.hash(customerUser.password, 10);

    // Create users
    const admin = await User.create({
      ...adminUser,
      password: adminHash
    });
    
    const customer = await User.create({
      ...customerUser,
      password: customerHash
    });

    console.log('Users seeded successfully:');
    console.log('- Admin:', admin._id.toString());
    console.log('- Customer:', customer._id.toString());
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
};

// Seed Products
const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Deleted existing products');
    
    // Create products
    const createdProducts = await Product.insertMany(products);
    console.log(`Products seeded successfully: ${createdProducts.length} products created`);
    
    // Log each product for verification
    createdProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title} (${product.category}) - ID: ${product._id.toString()}`);
    });
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};

// Run seeding
const seedAll = async () => {
  try {
    await seedUsers();
    await seedProducts();
    console.log('Database seeded successfully!');
    
    // Display test credentials
    console.log('\nTest Credentials:');
    console.log('- Admin: admin@example.com / admin123');
    console.log('- Customer: customer@example.com / customer123');
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    // Disconnect from MongoDB
    await mongoose.disconnect();
    process.exit(1);
  }
};

// Execute the seeding process
seedAll();