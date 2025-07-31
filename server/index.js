// Vercel serverless function entry point
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    'https://clash-singla.vercel.app',
    'http://localhost:3000',
    process.env.CLIENT_APP_URL || 'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Clash Backend API is running on Vercel!',
    status: 'success',
    timestamp: new Date().toISOString(),
    environment: 'production'
  });
});

// Basic API routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/auth/check', (req, res) => {
  res.json({ 
    message: 'Auth endpoint working', 
    status: 'success' 
  });
});

app.post('/api/auth/login', (req, res) => {
  res.json({ 
    message: 'Login endpoint working', 
    status: 'success',
    body: req.body 
  });
});

// Import and use your existing routes (if they work in serverless)
try {
  // Only import routes that are serverless-compatible
  // Commented out to avoid crashes from Socket.io and background jobs
  // const routes = await import('./dist/routes/index.js');
  // if (routes.default) {
  //   app.use('/', routes.default);
  // }
} catch (error) {
  console.warn('Routes not loaded in serverless environment:', error.message);
}

// 404 handler
app.all('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    availableRoutes: [
      '/',
      '/api/health', 
      '/api/auth/check', 
      '/api/auth/login'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Export for Vercel
export default app;

// For local testing
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
