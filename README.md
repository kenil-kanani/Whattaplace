## 🏗️ Architecture

### 📁 Project Structure

```
whattapace-web/
├── public/                     # Static assets
│   └── *.svg                  # Category icons and images
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── [category]/        # Dynamic category pages
│   │   │   └── page.tsx       # Category page component
│   │   ├── api/               # API routes
│   │   │   ├── spaces/        # Spaces filtering API
│   │   │   └── location-hierarchy/ # Location data API
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Home page (redirects to all-spaces)
│   ├── components/            # Reusable UI components
│   │   ├── CategoryFilter.tsx # Category navigation
│   │   ├── CategoryPageClient.tsx # Client-side category page wrapper
│   │   ├── LocationFilter.tsx # Hierarchical location filtering
│   │   ├── PricingFilter.tsx  # Price range filtering
│   │   ├── SearchPageHeroSection.tsx # Page headers
│   │   ├── SpacesCard.tsx     # Individual space cards
│   │   └── SpacesGrid.tsx     # Spaces listing grid
│   ├── config/                # Configuration files
│   │   └── categories.ts      # Centralized category configuration
│   ├── contexts/              # React Context providers
│   │   └── AppContext.tsx     # Global state management
│   ├── hooks/                 # Custom React hooks
│   │   ├── useLocationFilter.ts # Location filtering logic
│   │   └── usePricingFilter.ts  # Pricing filtering logic
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts           # Shared interfaces and types
│   └── assets/                # Local assets
└── Configuration files        # Next.js, TypeScript, Tailwind, etc.
```

### 🔧 Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: React 19.1.0
- **Icons**: React Icons, Heroicons
- **Fonts**: Inter, DM Sans, Poppins, Work Sans
- **State Management**: React Context + Custom Hooks

## 🚀 Getting Started

### 📋 Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kenil-kanani/Whattaplace
   cd Whattaplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🏗️ Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 📱 Usage

### 🔍 Browsing Spaces
1. **Select Category**: Choose from 9 different space categories
2. **Apply Filters**: Use location and pricing filters to narrow results
3. **View Results**: Browse spaces in a responsive grid layout
4. **Share URLs**: Filtered results are shareable via URL parameters

### 🌍 Location Filtering
- **Hierarchical Selection**: Select countries, states, or specific cities
- **Search**: Use the search bar to quickly find locations
- **Mobile**: Tap to expand/collapse sections on mobile devices

### 💰 Price Filtering
- **Quick Ranges**: Select from predefined price ranges
- **Custom Range**: Use sliders for precise price selection
- **Combine Filters**: Mix location and pricing filters for targeted results