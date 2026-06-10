# Shopping App

A full-featured e-commerce web application built with Node.js, Express, MongoDB, and EJS templating. Features user authentication, product management, shopping cart, and Stripe payment integration.

## Features

- 🛍️ **Product Management**: Browse, search, and view product details
- 👤 **User Authentication**: Register, login, and user sessions with Passport.js
- 🛒 **Shopping Cart**: Add/remove products, view cart total
- 💳 **Payment Integration**: Stripe checkout for secure payments  
- ⭐ **Product Reviews**: Rate and review products
- 📱 **Responsive Design**: Mobile-friendly interface
- 🔐 **Session Management**: Secure user sessions with express-session

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: EJS templating, HTML, CSS, JavaScript
- **Authentication**: Passport.js with local strategy
- **Payments**: Stripe API
- **Session**: Express-session with connect-flash

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Docker & Docker Compose (for containerized setup)
- Stripe account (for payment functionality)

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGO_URL=mongodb://localhost:27017/E-Com

# Server
PORT=3000
NODE_ENV=development

# Session Security
SESSION_SECRET=your-super-secret-session-key-here

# Stripe Payment (replace with your keys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

## Installation & Setup

### Option 1: Run Locally (Traditional Way)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Shopping-App-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Install MongoDB locally, or
   - Use MongoDB Atlas (cloud database)
   - Update `MONGO_URL` in your `.env` file

4. **Create environment file**
   ```bash
   # Copy and update the .env file with your values
   cp .env.example .env
   ```

5. **Start the application**
   ```bash
   npm start
   ```

6. **Access the application**
   - Open your browser and go to: `http://localhost:3000`

### Option 2: Run with Docker (Recommended)

Docker setup includes both the application and MongoDB database.

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Shopping-App-main
   ```

2. **Build and start with Docker Compose**
   ```bash
   # Build and start all services (app + database)
   docker-compose up --build
   
   # Or run in detached mode (background)
   docker-compose up -d --build
   ```

3. **Access the application**
   - Application: `http://localhost:3000`
   - MongoDB: `localhost:27017` (if you need direct access)

4. **Stop the application**
   ```bash
   docker-compose down
   ```

### Option 3: Use Pre-built Docker Image

You can also use the pre-built image from Docker Hub:

```bash
# Pull the image
docker pull shreyashdock1601/shopping-app:latest

# Run with a separate MongoDB container
docker run -d --name mongo mongo:7.0
docker run -p 3000:3000 --link mongo:mongodb \
  -e MONGO_URL=mongodb://mongodb:27017/E-Com \
  shreyashdock1601/shopping-app:latest
```

## Docker Commands Reference

```bash
# Build and start
docker-compose up --build

# Start in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services  
docker-compose down

# Restart specific service
docker-compose restart shopping-app

# View running containers
docker ps

# Clean up (remove containers, networks, images)
docker-compose down --rmi all
```

## Project Structure

```
Shopping-App/
├── models/              # Database models (User, Product, Review)
├── routes/              # Express routes
│   ├── auth.js         # Authentication routes
│   ├── cart.js         # Shopping cart & payment
│   ├── productRoutes.js # Product CRUD operations
│   ├── review.js       # Product reviews
│   └── api/            # API routes
├── views/              # EJS templates
│   ├── auth/           # Login/signup pages
│   ├── cart/           # Shopping cart views  
│   ├── products/       # Product pages
│   └── partials/       # Reusable components
├── public/             # Static assets (CSS, JS, images)
├── app.js              # Main application file
├── middleware.js       # Custom middleware
├── schema.js           # Joi validation schemas
├── seed.js             # Database seeding
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose setup
└── package.json        # Dependencies and scripts
```

## API Endpoints

- `GET /` - Home page with products
- `GET /products` - All products
- `GET /products/:id` - Product details
- `POST /products` - Create product (authenticated)
- `GET /user/cart` - View shopping cart
- `POST /user/:productId/add` - Add to cart
- `POST /checkout` - Stripe checkout
- `GET /login` - Login page
- `POST /register` - User registration

## Development

### Running in Development Mode

```bash
# Install nodemon for auto-restart
npm install -g nodemon

# Start with nodemon (auto-restart on file changes)
npm start

# Or directly with nodemon
nodemon app.js
```

### Database Seeding

```bash
# Run the seed script to populate sample data
node seed.js
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check `MONGO_URL` in your `.env` file
   - For Docker: ensure MongoDB container is started

2. **Port Already in Use**
   - Change the `PORT` in `.env` file
   - Or kill the process using the port: `netstat -ano | findstr :3000`

3. **Docker Build Issues**
   - Clear Docker cache: `docker system prune`
   - Rebuild without cache: `docker-compose build --no-cache`

4. **Stripe Payment Issues**
   - Verify `STRIPE_SECRET_KEY` in environment
   - Check Stripe dashboard for test keys
   - Ensure using test mode for development

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit changes: `git commit -am 'Add feature'`
5. Push to branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Shopping! 🛍️**