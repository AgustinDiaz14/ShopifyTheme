# 🛍️ Shopify Custom Theme – Setup & Technical Overview

This is a custom-built Shopify Theme focused on performance, flexibility, and clean UX. Below you'll find setup instructions, design decisions, and the assumptions made during development. It is based on a given design and intended to be as much faithful as possible to it. Some non implemented features were implemented as well, such as the quick view modal, product carousel.

---

## ✅ Requirements

- A Shopify Partner account or Development store
- Admin access to Shopify Theme Editor
- (Optional) Shopify CLI for advanced dev tooling

---

## 🚀 Installation & Setup

### 1. Upload the theme

1. Download the project folder as `.zip` or clone the repo.
2. Go to your Shopify Admin → **Online Store** → **Themes**
3. Click on **Add Theme** → **Upload zip file**
4. Upload and publish it (or keep it unpublished for testing)

### 2. Customize via Theme Editor

Once uploaded:

- Go to **Online Store → Themes → Customize**
- Each section (`hero`, `quick view`, `carousel`, etc.) can be added and configured visually
- No code knowledge required for basic updates

---

## 🔧 Development Assumptions

- **Merchant is non-technical**  
  All key content (images, text, links, layout toggles) is editable from the Shopify UI.

- **Product variants are based on size only**  
  The quick view and product selectors assume a single-variant dimension (e.g. `size`), simplifying UX.

- **Store will use native Shopify checkout**  
  No external checkout flows or headless setup.

- **No third-party apps assumed**  
  All features (sliders, cart drawer, etc.) were implemented from scratch to avoid external dependencies.

---

## 🎨 Design Decisions

### 1. **Vanilla JavaScript (No jQuery)**
- Faster loading times
- Total control over behavior
- No unused dependencies

### 2. **CSS Flexbox/Grid Layout**
- Used for responsive design
- Ensured compatibility across all modern browsers
- No reliance on external CSS frameworks

### 2. **AJAX Drawer Architecture**
- The **Quick View Modal** and **Cart Drawer** both slide in from the same side (right)
- Prevented UI conflicts with proper z-indexing and state management

### 3. **Liquid-first Section Design**
- All key layout elements are split into sections and blocks
- Custom schema added for flexibility in admin
- Used conditional rendering (`{% if %}`) to minimize output overhead

### 4. **Mobile-First Approach**
- Components were designed and tested first on mobile, then expanded with media queries

---

## 🧰 Framework & Libraries
- **Liquid**: Shopify's templating language for dynamic content
- **Vanilla JavaScript**: As requested, no externally library was used
- **CSS Flexbox/Grid**: As requested, no external CSS framework was used
- **SVG Icons**: For scalable graphics