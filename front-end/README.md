# Clash Frontend - Next.js Application

The frontend client for Clash, a modern image comparison and voting platform. Built with Next.js 15, TypeScript, and Tailwind CSS, featuring real-time updates, responsive design, and seamless user experience.

## 🚀 Features

### User Interface & Experience

- **Modern Design** - Clean, responsive UI with Tailwind CSS
- **Dark/Light Mode** - Theme switching with next-themes
- **Real-time Updates** - Live vote counting and comment updates
- **Mobile-First** - Responsive design for all device sizes
- **Accessibility** - WCAG compliant with Radix UI components
- **Smooth Animations** - Tailwind CSS animations and transitions

### Core Functionality

- **User Authentication** - Secure login/register with NextAuth.js
- **Clash Creation** - Intuitive form for creating image battles
- **Image Upload** - Drag & drop image upload with preview
- **Real-time Voting** - Instant vote submission and live results
- **Anonymous Comments** - Comment system with real-time updates
- **Clash Management** - Edit, delete, and share clashes
- **Dashboard** - User dashboard with clash management

### Technical Features

- **Server-Side Rendering** - SEO-friendly with Next.js App Router
- **Type Safety** - Full TypeScript implementation
- **Performance** - Optimized images and code splitting
- **Progressive Web App** - PWA capabilities for mobile users
- **Real-time Communication** - Socket.io integration
- **Form Validation** - Client-side validation with error handling

## 🛠️ Tech Stack

### Core Framework

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js v4
- **Real-time:** Socket.io-client

### UI Components & Libraries

- **Component Library:** Radix UI primitives
- **Icons:** Lucide React
- **Animations:** Tailwind CSS + CSS animations
- **Date Picker:** react-day-picker
- **Toast Notifications:** Sonner
- **Counter Animations:** react-countup
- **Utility Classes:** clsx, tailwind-merge
- **Class Variants:** class-variance-authority

### State Management & API

- **HTTP Client:** Axios
- **State Management:** React hooks and context
- **Form Handling:** Native React forms
- **Date Handling:** date-fns
- **Theme Management:** next-themes

## 📁 Project Structure

```
front-end/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── login/         # Login page
│   │   │   └── register/      # Registration page
│   │   ├── api/               # API routes (NextAuth)
│   │   │   └── auth/          # Authentication API
│   │   ├── clash/             # Clash-related pages
│   │   │   ├── [id]/          # Individual clash page
│   │   │   └── items/         # Clash items management
│   │   ├── dashboard/         # User dashboard
│   │   ├── fonts/             # Custom fonts
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── not-found.tsx      # 404 page
│   │
│   ├── components/            # Reusable components
│   │   ├── auth/              # Authentication components
│   │   ├── base/              # Base components (navbar, footer)
│   │   ├── clash/             # Clash-specific components
│   │   ├── common/            # Common UI components
│   │   └── ui/                # Radix UI components
│   │
│   ├── lib/                   # Utility libraries
│   │   ├── apiEndPoint.ts     # API endpoint definitions
│   │   ├── env.ts             # Environment variables
│   │   ├── socket.ts          # Socket.io configuration
│   │   └── utils.ts           # Utility functions
│   │
│   ├── fetch/                 # API fetch functions
│   │   └── clashFetch.ts      # Clash-related API calls
│   │
│   ├── actions/               # Server actions
│   │   ├── authActions.ts     # Authentication actions
│   │   └── commonAction.ts    # Common server actions
│   │
│   ├── types.ts               # TypeScript type definitions
│   └── middleware.tsx         # Next.js middleware
│
├── public/                    # Static assets
│   ├── banner.svg             # Hero banner image
│   ├── error1.svg             # Error illustration
│   ├── file.svg               # File icons
│   └── ...                    # Other static assets
│
├── components.json            # Radix UI configuration
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── postcss.config.mjs         # PostCSS configuration
└── package.json
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- Backend server running on port 8000

### 1️⃣ Install Dependencies

```bash
cd front-end
npm install
```

### 2️⃣ Environment Configuration

Create a `.env.local` file in the frontend root directory:

```env
# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# API Configuration
NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"
NEXT_PUBLIC_SOCKET_URL="http://localhost:8000"

# App Configuration
NEXT_PUBLIC_APP_NAME="Clash"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# File Upload Configuration
NEXT_PUBLIC_MAX_FILE_SIZE=5242880  # 5MB
NEXT_PUBLIC_ALLOWED_FILE_TYPES="image/jpeg,image/png,image/gif,image/webp"

# Development Configuration
NODE_ENV="development"
```

### 3️⃣ Run Development Server

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

The application will be available at `http://localhost:3000`

## 🏗️ Component Architecture

### UI Components Structure

The frontend uses a modular component architecture with Radix UI primitives:

#### Base Components (`components/base/`)

- `NavBar` - Main navigation with authentication state
- `HeroSection` - Landing page hero section
- `Footer` - Site footer with links

#### Clash Components (`components/clash/`)

- `AddClash` - Modal form for creating new clashes
- `ClashCard` - Individual clash preview card
- `ClashCardMenu` - Dropdown menu for clash actions
- `EditClash` - Modal form for editing clashes
- `DeleteClash` - Confirmation dialog for deletion
- `AddClashItems` - Image upload for clash items
- `ViewClash` - Display clash results and comments
- `Clashing` - Interactive voting interface

#### Auth Components (`components/auth/`)

- `LoginForm` - User login form
- `RegisterForm` - User registration form
- `EmailVerification` - Email verification flow

#### UI Components (`components/ui/`)

- Radix UI primitives (Button, Dialog, Card, etc.)
- Custom styled components
- Form components with validation

### Component Usage Examples

#### Creating a Clash Card

```tsx
import ClashCard from "@/components/clash/clashCard";

<ClashCard clash={clashData} token={userToken} />;
```

#### Real-time Voting Component

```tsx
import Clashing from "@/components/clash/clashing";

<Clashing clash={clashData} />;
```

## 🔌 Real-time Features

### Socket.io Integration

The frontend connects to the backend via Socket.io for real-time updates:

```typescript
// lib/socket.ts
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);

export default socket;
```

### Real-time Events

#### Voting Updates

```typescript
// Listen for vote updates
socket.on(`clashing-${clashId}`, (data) => {
  updateVoteCount(data.clashItemId);
});

// Submit vote
socket.emit(`clashing-${clashId}`, {
  clashId: clashId,
  clashItemId: itemId,
});
```

#### Comment Updates

```typescript
// Listen for new comments
socket.on(`clashing_comment-${clashId}`, (comment) => {
  addNewComment(comment);
});

// Submit comment
socket.emit(`clashing_comment-${clashId}`, {
  id: clashId,
  comment: commentText,
  created_at: new Date().toISOString(),
});
```

## 🎨 Styling & Design System

### Tailwind CSS Configuration

```typescript
// tailwind.config.ts
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Custom color palette
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

### Design Tokens

#### Colors

- **Primary:** Blue gradient for main actions
- **Secondary:** Purple gradient for highlights
- **Success:** Green for confirmations
- **Error:** Red for warnings and errors
- **Muted:** Gray for secondary content

#### Typography

- **Headings:** Font weights from 600-900
- **Body:** Regular font weight with proper line height
- **Code:** Monospace font for technical content

#### Spacing

- **Base unit:** 4px (0.25rem)
- **Component padding:** 16px (1rem)
- **Section margins:** 24px-48px (1.5rem-3rem)

### Responsive Design

```css
/* Mobile-first approach */
.container {
  @apply w-full max-w-7xl mx-auto px-4;
}

/* Breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

## 🔐 Authentication Flow

### NextAuth.js Configuration

```typescript
// app/api/auth/[...nextauth]/options.ts
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Custom authentication logic
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // JWT callback
    },
    session: ({ session, token }) => {
      // Session callback
    },
  },
};
```

### Protected Routes

```typescript
// middleware.tsx
export function middleware(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/clash/items/:path*"],
};
```

## 📡 API Integration

### API Client Setup

```typescript
// lib/apiEndPoint.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const endpoints = {
  // Authentication
  login: `${API_BASE_URL}/api/auth/login`,
  register: `${API_BASE_URL}/api/auth/register`,

  // Clashes
  createClash: `${API_BASE_URL}/api/clash`,
  clashItems: `${API_BASE_URL}/api/clash/items`,
} as const;
```

### API Functions

```typescript
// fetch/clashFetch.ts
export async function fetchClashes(token: string) {
  const response = await fetch(endpoints.createClash, {
    headers: {
      Authorization: token,
    },
    next: {
      revalidate: 3600, // 1 hour
      tags: ["dashboard"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch clashes");
  }

  return response.json();
}
```

## � Performance Optimizations

### Next.js Optimizations

#### Image Optimization

```tsx
import Image from "next/image";

<Image
  src={imageUrl}
  alt="Clash image"
  width={500}
  height={300}
  className="object-cover"
  priority={isAboveFold}
/>;
```

#### Dynamic Imports

```tsx
import dynamic from "next/dynamic";

const EditClash = dynamic(() => import("./editClash"), {
  loading: () => <p>Loading...</p>,
});
```

#### Route Caching

```typescript
// Cache strategy for data fetching
export const revalidate = 3600; // 1 hour
export const dynamic = "force-dynamic"; // For real-time data
```

### Performance Metrics

- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms

## 🌐 Deployment

### Environment Variables for Production

```env
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="production-secret-key"
NEXT_PUBLIC_API_BASE_URL="https://api.your-domain.com"
NODE_ENV="production"
```

### Build Configuration

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "your-api-domain.com"],
    formats: ["image/webp", "image/avif"],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
```

### Deployment Platforms

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

#### Static Export

```bash
# For static hosting
npm run build
npm run export
```

## 🧪 Testing

### Testing Setup

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Component Testing Example

```typescript
// __tests__/components/ClashCard.test.tsx
import { render, screen } from "@testing-library/react";
import ClashCard from "@/components/clash/clashCard";

test("renders clash card with correct data", () => {
  const mockClash = {
    id: 1,
    title: "Test Clash",
    description: "Test Description",
    // ... other properties
  };

  render(<ClashCard clash={mockClash} token="test-token" />);

  expect(screen.getByText("Test Clash")).toBeInTheDocument();
  expect(screen.getByText("Test Description")).toBeInTheDocument();
});
```

## 🤝 Contributing

### Development Workflow

1. **Setup Development Environment**

   ```bash
   git clone https://github.com/Gourav830/Clash.git
   cd Clash/front-end
   npm install
   npm run dev
   ```

2. **Create Feature Branch**

   ```bash
   git checkout -b feature/new-feature
   ```

3. **Development Guidelines**

   - Follow TypeScript best practices
   - Use proper component naming conventions
   - Write meaningful commit messages
   - Add tests for new features
   - Update documentation

4. **Submit Pull Request**

   - Ensure all tests pass
   - Follow the PR template
   - Request code review

### Coding Standards

- **Components:** PascalCase (e.g., `ClashCard`)
- **Files:** camelCase (e.g., `clashCard.tsx`)
- **Variables:** camelCase (e.g., `clashData`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

**Built with ❤️ by [Gourav Singla](https://github.com/Gourav830)**
