# CapCop - Gaming Cafe Management System

A modern, futuristic gaming cafe management system built with Next.js 14, featuring a client lock screen interface and comprehensive admin dashboard. Designed with a strict black and white theme, glassmorphism effects, and smooth animations.

## Features

### Lock Screen (Client PC Interface)

- **Large Countdown Timer** - Shows remaining session time in HH:MM:SS format with warning states
- **Session Progress** - Visual progress bar showing session completion percentage
- **Account Information** - User profile with balance, loyalty points, and member level
- **PC Specifications** - Hardware specs display (GPU, RAM, CPU)
- **Quick Actions Bar**:
  - Extend session (1hr, 3hr, night package options)
  - Call admin with urgency levels
  - Lock session without losing time
  - View price list
- **Game Launcher Grid** - Semi-transparent grid of installed games
- **Network Status** - Real-time ping display
- **Promotional Carousel** - Rotating offers every 30 seconds
- **QR Code Payment** - Mobile payment top-up support
- **Critical Alerts** - Red warning notifications when <15 minutes remaining

### Admin Dashboard

#### Main Monitor View
- **Visual PC Grid** - 20 PC cards matching physical arrangement
- **Real-time Status** - Each PC shows:
  - Current user or "Available" status
  - Time remaining with circular progress
  - Debt amount
  - FPS/CPU/RAM/Temperature meters
  - Quick action buttons
- **Color-coded Borders**:
  - Green: Available
  - White: Occupied
  - Red pulsing: <5 minutes remaining
- **Bulk Actions** - Reboot all, broadcast messages, emergency lock

#### Financial Overview
- **Animated Revenue Counter** - Today's earnings with counting animation
- **Real-time Charts** - Hourly revenue timeline with area chart
- **Payment Breakdown** - Cash, Card, and QR code distribution
- **Popular Games** - Most played games with progress bars
- **Growth Metrics** - Daily/weekly comparisons

#### User Management
- **Member Database** - Searchable user table
- **Account Details** - Balance, loyalty points, total spent
- **Member Levels** - Bronze, Silver, Gold, Platinum tiers
- **Session History** - User activity timeline

#### Pricing & Packages
- **Hourly Rates** - Dynamic pricing (150₽, 130₽, 100₽)
- **Special Packages**:
  - Night Package: 8 hours for 900₽
  - Day Package: 12 hours for 1200₽
  - Weekend Special: 15 hours for 1500₽

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom utilities
- **UI Libraries**:
  - shadcn/ui - Core components
  - NextUI - Advanced interactions
  - Radix UI - Accessible primitives
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Notifications**: Sonner
- **Date/Time**: date-fns

## Design System

### Color Palette
- Background: `#000000` (Black)
- Foreground: `#FFFFFF` (White)
- Alerts: `#ef4444` (Red) - ONLY for critical warnings
- Shades: Various opacity levels of white (20%, 10%, 5%)

### Typography
- Font: Inter (Google Fonts)
- Sizes: Tailwind defaults with custom scales

### Effects
- **Glassmorphism**: `backdrop-blur-md` with semi-transparent backgrounds
- **Neon Glow**: White shadows on important elements
- **Brutalist Borders**: Sharp, 2px white borders
- **Animations**: Spring physics, slide effects, fade transitions

## Project Structure

```
CapCop/
├── app/
│   ├── lock-screen/
│   │   └── page.tsx          # Client lock screen
│   ├── admin/
│   │   └── dashboard/
│   │       └── page.tsx      # Admin dashboard
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   ├── providers.tsx         # Context providers
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── progress.tsx
│   │   ├── tabs.tsx
│   │   └── avatar.tsx
│   ├── lock-screen/          # Lock screen components
│   │   ├── Timer.tsx
│   │   ├── QuickActions.tsx
│   │   ├── GameGrid.tsx
│   │   ├── AccountInfo.tsx
│   │   ├── PCSpecs.tsx
│   │   └── PromoCarousel.tsx
│   └── admin/                # Admin components
│       ├── PCCard.tsx
│       ├── RevenueChart.tsx
│       ├── AnimatedCounter.tsx
│       └── StatsOverview.tsx
├── lib/
│   ├── api/
│   │   ├── websocket.ts      # WebSocket manager
│   │   └── sessions.ts       # Session API
│   ├── utils/
│   │   ├── time-helpers.ts   # Time utilities
│   │   └── price-calculator.ts
│   └── utils.ts              # Common utilities
├── stores/
│   ├── session-store.ts      # Lock screen state
│   └── admin-store.ts        # Admin dashboard state
└── public/
    └── games/                # Game icons

```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CapCop
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser:
- Home: http://localhost:3000
- Lock Screen: http://localhost:3000/lock-screen
- Admin Dashboard: http://localhost:3000/admin/dashboard

### Build for Production

```bash
npm run build
npm start
```

## Key Components

### Timer Component
Located in `components/lock-screen/Timer.tsx`
- Real-time countdown with second precision
- Warning states (none, warning, critical)
- Progress bar visualization
- Animated numbers with scale effect

### PCCard Component
Located in `components/admin/PCCard.tsx`
- Status indicators with color coding
- Performance metrics display
- Quick action menu
- Debt warnings

### Zustand Stores

**Session Store** (`stores/session-store.ts`)
- PC and user information
- Session timing
- Balance management
- Game library

**Admin Store** (`stores/admin-store.ts`)
- All PC statuses
- User database
- Revenue tracking
- Bulk operations

## Responsive Design

- **Desktop (1920x1080)**: Full dashboard with all features
- **Tablet (768px+)**: Simplified grid, stacked components
- **Mobile (<768px)**: Essential controls, vertical layout

## Accessibility

- Keyboard navigation support
- ARIA labels on interactive elements
- Focus indicators (2px white outline)
- Screen reader friendly
- High contrast mode ready

## WebSocket Integration

The app includes a WebSocket manager for real-time updates:

```typescript
import { WebSocketManager } from '@/lib/api/websocket';

const ws = new WebSocketManager('ws://your-server-url');
ws.connect((data) => {
  // Handle real-time updates
});
```

## Customization

### Adding New Games

Edit `stores/session-store.ts`:
```typescript
installedGames: [
  { id: "newgame", name: "New Game", icon: "/games/newgame.png", installed: true },
  // ...
]
```

### Modifying Prices

Edit `lib/utils/price-calculator.ts`:
```typescript
export const PRICE_PACKAGES: PricePackage[] = [
  { id: "1hr", name: "1 Hour", hours: 1, price: 150, ... },
  // Add or modify packages
]
```

### Changing Colors

Edit `tailwind.config.ts` to modify the color scheme (keep black/white theme).

## Performance

- Code splitting with Next.js App Router
- Image optimization with next/image
- Lazy loading for heavy components
- Memoization for expensive calculations
- Virtualization for long lists (if needed)

## Security Considerations

- No sensitive data in client-side stores
- API calls should be authenticated
- WebSocket connections should use WSS in production
- Input validation on all forms
- Rate limiting on API endpoints (backend)

## Future Enhancements

- [ ] Backend API integration
- [ ] Real WebSocket server
- [ ] User authentication
- [ ] Payment gateway integration
- [ ] Game library management
- [ ] Tournament scheduling
- [ ] Inventory tracking
- [ ] Staff management
- [ ] Analytics dashboard
- [ ] Mobile app

## License

MIT

## Support

For issues and feature requests, please open an issue on GitHub.

---

Built with ❤️ for gaming cafes worldwide
