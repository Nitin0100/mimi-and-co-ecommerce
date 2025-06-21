# MIMI & CO - Kids Fashion E-commerce

A beautiful, responsive, and animated e-commerce website for MIMI & CO, a kids' fashion brand targeting parents of children aged 0-5 years. Built with modern web technologies and featuring a delightful user experience.

## 🌟 Features

### Frontend
- **Next.js 14** with App Router for optimal performance
- **Tailwind CSS** for beautiful, responsive design
- **Framer Motion** for smooth animations and micro-interactions
- **React Hook Form** for form validation and management
- **TypeScript** for type safety and better development experience

### E-commerce Features
- 🛍️ **Product Catalog** with filtering by age, gender, price, and category
- 🛒 **Shopping Cart** with persistent storage and real-time updates
- 👤 **User Authentication** with JWT tokens and secure cookies
- 💳 **Checkout Process** with billing form and payment options
- 📱 **Responsive Design** optimized for all devices
- ✨ **Beautiful Animations** and micro-interactions throughout

### Design & UX
- 🎨 **Pastel Color Palette** with soft, playful themes
- 🎭 **Animated Characters** and illustrations
- 🎪 **Micro-interactions** for enhanced user engagement
- ♿ **Accessibility** features for inclusive design
- 📊 **Toast Notifications** for user feedback

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mimi-co-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your environment variables:
   ```env
   JWT_SECRET=your-super-secret-jwt-key
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
mimi-co-ecommerce/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── AuthModal.tsx      # Login/Signup modal
│   ├── FilterBar.tsx      # Product filters
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Hero section
│   ├── Navbar.tsx         # Navigation bar
│   └── ProductGrid.tsx    # Product display grid
├── contexts/              # React contexts
│   ├── AuthContext.tsx    # Authentication state
│   └── CartContext.tsx    # Shopping cart state
├── types/                 # TypeScript type definitions
│   └── product.ts         # Product interface
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: `#ff9ecd` (Soft Pink)
- **Secondary**: `#a8e6cf` (Mint Green)
- **Accent**: `#ffd3b6` (Peach)
- **Pastel Colors**: Beige, Mint, Peach, Yellow, Lavender, Pink

### Typography
- **Primary Font**: Inter (Sans-serif)
- **Display Font**: Comic Sans MS (Playful)

### Components
- **Buttons**: Rounded with hover animations
- **Cards**: Soft shadows with hover effects
- **Forms**: Clean, accessible inputs with validation
- **Modals**: Backdrop blur with smooth animations

## 🔧 Customization

### Adding Products
Edit the mock data in `app/page.tsx`:

```typescript
const mockProducts: Product[] = [
  {
    id: 'unique-id',
    name: 'Product Name',
    price: 29.99,
    image: 'product-image-url',
    ageGroup: '0-1Y' | '1-3Y' | '3-5Y',
    gender: 'boy' | 'girl' | 'unisex',
    description: 'Product description',
    category: 'category-name',
    inStock: true,
  },
  // ... more products
]
```

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for custom styles
- Edit component styles in individual component files

### Animations
- Customize Framer Motion animations in components
- Add new animations in `app/globals.css`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Features

- **JWT Authentication** with HTTP-only cookies
- **Password Hashing** with bcrypt
- **Input Validation** on all forms
- **CSRF Protection** with same-site cookies
- **Secure Headers** and best practices

## 📱 Responsive Design

The website is fully responsive and optimized for:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🎯 Performance Optimizations

- **Image Optimization** with Next.js Image component
- **Code Splitting** with dynamic imports
- **Lazy Loading** for better initial load times
- **Optimized Animations** with Framer Motion
- **Efficient State Management** with React Context

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons
- **React Hook Form** for form management

## 📞 Support

For support, email hello@mimiandco.com or create an issue in this repository.

---

Made with ❤️ for little ones everywhere! 👶✨ 