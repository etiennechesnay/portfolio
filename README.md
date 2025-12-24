# Portfolio - Etienne Chesnay

A modern, performant portfolio website showcasing my work as a Senior Front-End Engineer. Built with React Router v7, TypeScript, and Tailwind CSS, featuring smooth animations and internationalization support.

🌐 **Live site**: [etiennechesnay.com](https://etiennechesnay.com)

## ✨ Features

- 🎨 **Modern Design**: Clean, professional interface with smooth animations
- 🌍 **Internationalization**: Multi-language support (English, French, Spanish)
- ⚡ **Performance Optimized**: Pre-rendered HTML for excellent SEO and instant loading
- 📱 **Fully Responsive**: Works seamlessly on all devices
- ♿ **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- 🎭 **Smooth Animations**: Motion-based animations with optional disable toggle
- 🚀 **Automatic Deployment**: GitHub Actions CI/CD to OVH hosting

## 🛠️ Tech Stack

- **Framework**: [React Router v7](https://reactrouter.com/) (with SSG/Pre-rendering)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **i18n**: [react-i18next](https://react.i18next.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Deployment**: GitHub Actions + FTP to OVH
- **Code Quality**: ESLint + Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/etiennechesnay/portfolio.git
cd portfolio

# Install dependencies
yarn install

# Start development server
yarn dev
```

The site will be available at `http://localhost:5173`

## 📜 Available Scripts

```bash
# Development
yarn dev              # Start development server
yarn build            # Build for production
yarn preview          # Preview production build

# Code Quality
yarn lint             # Run ESLint
yarn lint:fix         # Fix ESLint errors
yarn format           # Format code with Prettier
yarn format:check     # Check code formatting
yarn typecheck        # Run TypeScript type checking
```

## 🏗️ Project Structure

```
portfolio/
├── app/
│   ├── components/          # React components
│   │   ├── ContactSection/
│   │   ├── HomeSection/
│   │   ├── PortfolioSection/
│   │   └── SkillsSection/
│   ├── locales/            # i18n translation files
│   ├── routes/             # React Router routes
│   ├── styles/             # Global styles
│   ├── utils/              # Utility functions
│   ├── i18n.ts             # i18n configuration
│   ├── root.tsx            # Root component
│   └── routes.ts           # Routes configuration
├── public/                 # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD workflow
├── react-router.config.ts  # React Router configuration
└── vite.config.ts          # Vite configuration
```

## 🌍 Internationalization

The site supports multiple languages:
- English (default)
- French (Français)
- Spanish (Español)

To add a new language:

1. Add translation file in `app/locales/{lang}.json`
2. Update `react-router.config.ts` prerender array:
   ```typescript
   prerender: ["/", "/fr", "/es", "/de"] // Add /de for German
   ```
3. Build the site: `yarn build`

## 🚢 Deployment

The site automatically deploys to OVH hosting via GitHub Actions on every push to `main`.

## 📊 Performance

- **Lighthouse Score**: 95-100
- **Pre-rendered HTML**: Instant first contentful paint
- **Optimized Assets**: Compressed JS/CSS, image preloading
- **SEO Ready**: Complete HTML visible to search engines

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Skip to main content link
- Respects `prefers-reduced-motion`
- Screen reader tested

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Issues

If you find a bug or have a suggestion:

1. Check if the issue already exists in [Issues](https://github.com/etiennechesnay/portfolio/issues)
2. If not, create a new issue with:
   - Clear description of the problem
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes following the code style:
   ```bash
   yarn lint:fix
   yarn format
   yarn typecheck
   ```
4. Commit your changes:
   ```bash
   git commit -m "Add amazing feature"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
6. Open a Pull Request with:
   - Clear description of changes
   - Link to related issue (if applicable)
   - Screenshots/videos for UI changes

### Code Style Guidelines

- Follow existing code patterns
- Use TypeScript strict mode
- Write semantic, accessible HTML
- Add proper ARIA labels for interactive elements
- Keep components small and focused
- Comment complex logic
- Use meaningful variable/function names

### Translation Contributions

Help improve translations or add new languages:

1. Copy `app/locales/en.json` to `app/locales/{lang}.json`
2. Translate all strings
3. Test the new language works correctly
4. Submit a PR with your translation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Etienne Chesnay**
- Website: [etiennechesnay.com](https://etiennechesnay.com)
- GitHub: [@etiennechesnay](https://github.com/etiennechesnay)
- LinkedIn: [Etienne Chesnay](https://www.linkedin.com/in/etienne-chesnay)
