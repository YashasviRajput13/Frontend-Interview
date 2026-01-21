# CA Monk Blog - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn installed
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   - Opens at `http://localhost:5175` (or next available port)
   - Hot module replacement enabled for instant updates

3. **Build for Production**
   ```bash
   npm run build
   ```
   - Optimized build in `dist/` directory

4. **Preview Production Build**
   ```bash
   npm run preview
   ```
   - Serve production build locally

## 📱 Features Overview

### Reading Articles
1. Browse **Latest Articles** in the sidebar
2. **Search** articles by title, category, or content
3. Click an article to **read full content**
4. See **read time estimate** and **formatted date**
5. **Share** articles (native or clipboard)

### Creating Articles
1. Click **"+ Create New Blog"** button
2. Fill in form fields:
   - **Title** (5-200 characters) - Required
   - **Categories** (comma-separated) - Required
   - **Cover Image URL** (valid URL) - Required
   - **Description** (10-500 characters) - Required
   - **Content** (50+ characters) - Required
3. **Preview image** loads in real-time
4. See **validation errors** below fields
5. Click **Create** to publish
6. Success toast notification appears

### Accessibility Features
- **Keyboard Navigation**: Tab through all elements
  - Press Enter or Space to select items
  - Proper focus indicators
- **Screen Reader Support**: Full ARIA labels and semantic HTML
- **Color Independence**: Not relying on color alone for meaning
- **Motion Preferences**: Respects user's motion settings

## 🎨 UI Components

### Toast Notifications
- Success (green): After creating blog
- Error (red): Form validation or creation failure
- Warning (amber): Image preview issues
- Info (blue): General information

### Loading States
- **Skeleton loaders** with shimmer animation
- Shows while fetching data
- Improves perceived performance

### Error States
- **Error Boundary**: Catches app crashes
- **Form Validation**: Real-time error messages
- **API Errors**: User-friendly error messages

## ⚙️ Customization

### Colors
Edit in `src/index.css`:
```css
:root {
  --primary: #7c3aed;    /* Purple */
  --success: #86efac;    /* Green */
  --error: #fca5a5;      /* Red */
  --warning: #fcd34d;    /* Amber */
}
```

### Content
Edit in `src/constants/index.ts`:
- Navigation links
- Sidebar labels
- Form placeholders
- Footer sections

### Utilities
Found in `src/utils/index.ts`:
- Date formatting
- Text truncation
- URL validation
- Read time calculation
- Category parsing

## 🔧 Configuration

### Query Client
In `src/App.tsx`:
```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
```

### API Endpoints
In `src/api/blogs.ts`:
- GET `/api/blogs` - Fetch all articles
- POST `/api/blogs` - Create article
- GET `/api/blogs/{id}` - Fetch single article

## 📊 Responsive Design

### Tablet (768px)
- Sidebar and content stack vertically
- Header nav wraps
- Better spacing for tablets

### Mobile (480px)
- Single column layout
- Hidden header navigation
- Touch-friendly buttons (44px min height)
- Full-width content

### Small Mobile (<480px)
- Reduced padding
- Larger touch targets
- Simplified layout

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5175
# Windows:
netstat -ano | findstr :5175
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5175
kill -9 <PID>
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Build Fails
```bash
# Check TypeScript errors
npm run build

# Check ESLint issues
npm run lint

# Clear cache
rm -rf dist node_modules
npm install
npm run build
```

## 📚 Code Structure

### Components
- `App.tsx` - Main application container
- `BlogForm.tsx` - Article creation form
- `BlogDetail.tsx` - Article display
- `Sidebar.tsx` - Article list with search
- `ErrorBoundary.tsx` - Error handling
- `Toast.tsx` - Notifications
- `Skeletons.tsx` - Loading states

### Hooks
- `useBlogs()` - Fetch and create articles

### Utils
- `calculateReadTime()` - Estimate reading duration
- `formatDate()` - Format dates consistently
- `getRelativeTime()` - Relative timestamps ("2 days ago")
- `truncateText()` - Limit text with ellipsis
- `isValidUrl()` - Validate URLs
- `parseCategories()` - Parse comma-separated list

### Types
- `Blog` - Blog article interface

## 🎯 Best Practices

### Form Validation
- Validate on blur and submit
- Show clear error messages
- Character limits with counters
- URL validation for images

### Error Handling
- Error boundaries for crashes
- Toast notifications for user feedback
- Graceful degradation
- Proper error messages

### Accessibility
- Semantic HTML elements
- ARIA labels for custom components
- Keyboard navigation support
- Sufficient color contrast
- Focus indicators visible

### Performance
- Skeleton loaders for perceived speed
- Efficient CSS selectors
- No unnecessary re-renders
- Lazy loading images

## 📖 Documentation

- **ENHANCEMENTS.md** - Feature overview
- **IMPLEMENTATION_SUMMARY.md** - Technical details
- **QUICK_START.md** - This file

## 🆘 Support

### Common Issues

**Form validation not working?**
- Check console for errors
- Verify field values meet requirements
- Clear browser cache

**Images not loading?**
- Verify URL is valid
- Check CORS settings
- Use HTTPS URLs if possible

**Search not filtering?**
- Check search query
- Try different keywords
- Clear search to reset

**Accessibility issues?**
- Test with keyboard (Tab, Enter, Space)
- Test with screen reader (NVDA, JAWS)
- Check focus indicators

## 📞 Feedback & Contributions

For bugs, features, or improvements:
1. Document the issue clearly
2. Include steps to reproduce
3. Attach screenshots if applicable
4. Submit for review

---

**Happy blogging! 📝✨**

For more details, see:
- [Features & Enhancements](./ENHANCEMENTS.md)
- [Implementation Details](./IMPLEMENTATION_SUMMARY.md)
