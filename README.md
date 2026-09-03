# ShopCart — Shopping Cart Application
# Live Link - https://shopping-cart-34y3.vercel.app/

A responsive shopping cart application built for the Intern Assignment using React, TypeScript, Vite, Tailwind CSS, Zustand, TanStack Query, Zod, and localStorage.

## Project Overview

The application allows users to:

- Browse products from a public API
- Search products by title
- Filter products by category and maximum price
- Add products to a cart
- Increase/decrease quantities with a minimum of 1 and maximum of 5
- Remove products and clear the cart
- Persist the cart through localStorage
- Review subtotal, 5% tax, 10% discount above $100, and final total
- Complete a three-step checkout flow
- Validate shipping information with Zod
- Place an order and clear the cart

## Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS
- pnpm
- Zustand
- TanStack Query
- Zod
- localStorage
- DummyJSON Products API

## API Used

`https://dummyjson.com/products?limit=100`

Product responses are validated with Zod before being used by the UI.

## Requirements Mapping

| Requirement | Implementation |
|---|---|
| Product listing | Responsive Tailwind CSS grid |
| 10+ products | Fetches up to 100 products |
| Search | `useProductFilters` custom hook |
| Category filter | `useProductFilters` custom hook |
| Price filter | Maximum-price filter |
| Clear filters | `clearFilters()` |
| Add/remove cart | Zustand actions |
| Quantity 1–5 | Zustand action guards + disabled buttons |
| Cart persistence | Zustand `persist` middleware |
| Cart count | Derived from cart quantities |
| Tax | 5% of subtotal |
| Discount | 10% when subtotal > $100 |
| Minimum checkout | $10 |
| Checkout | Cart Review → Shipping → Payment Summary |
| Shipping validation | Zod + React state |
| Payment gateway | Not required by assignment |
| Successful order | Success message + cart cleared |
| Loading/error/empty states | TanStack Query + UI states |
| Responsive UI | Tailwind CSS responsive utilities/grid |

## Project Structure

```text
shopping-cart/
├── src/
│   ├── api/
│   │   └── products.ts
│   ├── components/
│   │   ├── CartDrawer.tsx
│   │   ├── Checkout.tsx
│   │   ├── Filters.tsx
│   │   ├── Header.tsx
│   │   └── ProductCard.tsx
│   ├── hooks/
│   │   └── useProductFilters.ts
│   ├── store/
│   │   └── cartStore.ts
│   ├── types/
│   │   └── product.ts
│   ├── utils/
│   │   └── cart.ts
│   ├── validation/
│   │   └── shipping.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Setup Instructions

### 1. Install pnpm

If pnpm is not installed:

```bash
npm install -g pnpm
```

Verify:

```bash
pnpm --version
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start development server

```bash
pnpm dev
```

Open the local URL shown by Vite, normally:

```text
http://localhost:5173
```

### 4. Create production build

```bash
pnpm build
```

### 5. Preview production build

```bash
pnpm preview
```

## GitHub Deployment Workflow

### 1. Create the repository

Create a new GitHub repository, for example:

```text
shopping-cart
```

Do not add another README if you are pushing this project with the included README.

### 2. Initialize Git

From the project folder:

```bash
git init
git add .
git commit -m "feat: build shopping cart application"
```

### 3. Connect GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/shopping-cart.git
git push -u origin main
```

### 4. Recommended commit sequence

If you want cleaner Git history for evaluation:

```bash
git add .
git commit -m "chore: initialize vite react typescript project"

git add .
git commit -m "feat: add product fetching and validation"

git add .
git commit -m "feat: add search and product filters"

git add .
git commit -m "feat: implement zustand cart management"

git add .
git commit -m "feat: add checkout and shipping validation"

git add .
git commit -m "style: make shopping cart responsive"

git push
```

## Deploy to Vercel

1. Push the project to GitHub.
2. Sign in to Vercel.
3. Select **Add New → Project**.
4. Import the GitHub repository.
5. Vercel should detect Vite automatically.
6. Use:
   - Build command: `pnpm build`
   - Output directory: `dist`
   - Install command: `pnpm install`
7. Deploy.
8. Open the generated public URL and test the complete flow.

No environment variables are required for this project.

### Tailwind CSS

This version uses Tailwind CSS v4 with the official Vite plugin (`@tailwindcss/vite`). No separate Tailwind config file is required.

## Deploy to Netlify

1. Push the project to GitHub.
2. Sign in to Netlify.
3. Select **Add new site → Import an existing project**.
4. Select the GitHub repository.
5. Configure:
   - Build command: `pnpm build`
   - Publish directory: `dist`
6. Deploy the site.
7. Test the public URL.

## Deploy to Cloudflare Pages

1. Push the project to GitHub.
2. Open Cloudflare Pages.
3. Create a new project and connect the GitHub repository.
4. Configure:
   - Build command: `pnpm build`
   - Build output directory: `dist`
5. Deploy and test the generated public URL.

## Important Implementation Decisions

### Product fetching

TanStack Query calls `fetchProducts()`. The API response is parsed with Zod before the data is returned to the application.

### Why TanStack Query?

TanStack Query is responsible for server/API data concerns:

- Fetching
- Caching
- Loading state
- Error state
- Refetching

Product API data is not unnecessarily copied into Zustand.

### Why Zustand?

Zustand handles global cart state and cart actions:

- Add
- Remove
- Increase
- Decrease
- Clear

This keeps cart state independent from the product-fetching layer.

### Cart persistence

Zustand's `persist` middleware stores the cart under:

```text
shopping-cart-storage
```

in localStorage. Refreshing the browser therefore keeps the cart.

### Cart calculations

```text
Subtotal = Σ(price × quantity)

Tax = Subtotal × 5%

Discount = Subtotal × 10% if Subtotal > $100

Final Total = Subtotal + Tax − Discount
```

Checkout is disabled when the cart subtotal is below $10.

### Zod validation

Zod is used for:

1. Product API response validation
2. Shipping form validation

The shipping form is managed with React state rather than React Hook Form or Formik.

### Component separation

The application separates:

- API logic
- Global state
- Filtering logic
- Validation
- Cart calculations
- UI components

This keeps the implementation readable and easier to explain during evaluation.

## Testing Checklist

Before submitting:

- [ ] At least 10 products appear
- [ ] Product images load
- [ ] Product title/category/price/rating appear
- [ ] Add to Cart works
- [ ] Same product increments quantity
- [ ] Quantity never exceeds 5
- [ ] Quantity never goes below 1
- [ ] Remove works
- [ ] Clear cart works
- [ ] Cart count updates
- [ ] Cart survives browser refresh
- [ ] Search works
- [ ] Category filter works
- [ ] Price filter works
- [ ] Clear filters works
- [ ] Empty search state appears
- [ ] API loading state appears
- [ ] API error state can be retried
- [ ] Tax is 5%
- [ ] Discount applies only when subtotal > $100
- [ ] Checkout is disabled below $10
- [ ] Shipping validation shows errors near fields
- [ ] Invalid email is rejected
- [ ] Checkout steps cannot be skipped
- [ ] Payment Summary is read-only
- [ ] Place Order shows success
- [ ] Cart is cleared after placing order
- [ ] Mobile/tablet/desktop layouts work
- [ ] Production build succeeds with `pnpm build`

## Known Limitations

- No real payment gateway is integrated because the assignment explicitly says it is not required.
- Shipping data is kept only during the checkout session and is not persisted.
- Products depend on the availability of the public DummyJSON API.
- There is no backend, authentication, inventory management, or real order storage.

## Optional Improvements

Possible future improvements include:

- Product sorting
- Skeleton loading
- Dark mode
- Product details page
- Unit tests for cart calculations
- Real payment integration
- Backend order persistence
- Authentication
- Pagination

## Submission

After deployment, submit:

```text
GitHub Repository: https://github.com/YOUR_USERNAME/shopping-cart
Live Deployment: https://YOUR_PROJECT.vercel.app
README: Included in repository
```

Replace the placeholder URLs with your actual GitHub and deployment URLs.

# Known Limitations

The application depends on the availability of the Fake Store API.
Product data is provided by the external API and cannot be modified from the application.
No user authentication or account functionality is implemented.
No real payment gateway or checkout process is implemented.
Cart data is maintained on the client side and may be lost after clearing browser storage/session depending on the implementation.
Product search and advanced filtering are not included.
