# Design Blueprint: Cropin Website

## Overview

This document defines the visual structure, layout hierarchy, components, typography, colors, and interaction patterns of the Cropin website. The objective is to provide sufficient design specifications for recreating the interface with high visual accuracy.

---

# Design Goals

- Modern enterprise SaaS website
- Clean and professional appearance
- Agriculture-focused branding
- Responsive design
- Clear visual hierarchy
- Strong call-to-action sections

---

# Layout Structure

```
Top Announcement Bar
│
├── Header
│     ├── Logo
│     ├── Navigation Menu
│     ├── Search Button
│     └── Schedule Demo Button
│
├── Hero Carousel
│     ├── Background Image
│     ├── Main Heading
│     ├── Supporting Text
│     ├── CTA Button
│     └── Carousel Controls
│
├── Product / Solution Sections
│
├── Industry Sections
│
├── Resource Section
│
├── Customer / Partner Section
│
├── Footer
│
└── Cookie Consent Banner
```

---

# Grid System

- Desktop width: 1440px
- Maximum content width: 1200px
- 12-column responsive grid
- Horizontal padding: 80px
- Section spacing: 80–120px
- Card spacing: 24px
- Component spacing based on an 8px grid

---

# Header

Height: 80px

Background:
- White (#FFFFFF)

Behaviour:
- Sticky while scrolling
- Slight shadow after scrolling

Left Section
- Cropin logo

Center Section
Navigation Links:

- Products
- Industry
- Solutions
- Crop Knowledge Grid
- Resources
- Company

Right Section

- Circular Search Button
- "Schedule a Demo" Button

---

# Hero Section

Width:
- Full Screen

Height:
- Approximately 700px

Background:
- High-resolution aerial farmland image
- Dark transparent overlay

Content Alignment:
- Centered vertically
- Centered horizontally

Heading

- Bold
- 48px
- White

Supporting Text

- 18px
- White
- Maximum width: 700px

Primary Button

- Rounded Pill Shape
- Blue Background
- White Text
- Hover Elevation

Carousel Controls

- Circular buttons
- Left and Right arrows

---

# Color Palette

Primary Green
- #00A859

Secondary Blue
- #00A2E8

Dark Green
- #002B1D

Background
- #FFFFFF

Primary Text
- #1E293B

Secondary Text
- #64748B

Border
- #E5E7EB

---

# Typography

Font Family

- Inter
- Poppins
- Open Sans

Heading Sizes

H1
- 48px
- Bold

H2
- 36px
- Bold

H3
- 24px
- Semi Bold

Body Text

- 16px
- Regular
- Line Height 1.6

Navigation

- 15px
- Medium Weight

Buttons

- 16px
- Semi Bold

---

# UI Components

Navigation Bar

- Logo
- Navigation Links
- Search Icon
- CTA Button

Buttons

- Filled Primary Button
- Secondary Outline Button

Cards

- Rounded corners (16px)
- White background
- Soft shadow
- Hover elevation

Images

- Rounded corners
- Responsive scaling

Icons

- Minimal outline icons
- Brand-colored accents

Forms

- Rounded input fields
- Focus border animation

Footer

- Dark background
- Four-column layout
- Social media icons
- Copyright

Cookie Banner

- Fixed bottom position
- Accept button
- Privacy Policy link

---

# Component Behaviour

Navigation

- Sticky while scrolling

Buttons

- Background color transition
- Pointer cursor
- Shadow on hover

Cards

- Slight elevation on hover

Carousel

- Auto-slide
- Manual navigation

Search Button

- Opens search interface

Cookie Banner

- Remains visible until accepted

---

# Responsive Behaviour

Desktop
- Full navigation visible

Tablet

- Reduced spacing
- Components resized

Mobile

- Hamburger navigation
- Single-column layout
- Full-width buttons
- Responsive typography

---

# Navigation Flow

```
Home
 │
 ├── Products
 │
 ├── Industry
 │
 ├── Solutions
 │
 ├── Crop Knowledge Grid
 │
 ├── Resources
 │
 ├── Company
 │
 └── Schedule Demo
```

---

# Accessibility

- High color contrast
- Keyboard-accessible navigation
- Visible focus states
- Responsive text scaling
- Alt text for images
- Large clickable buttons

---

# Design Constraints

- Maintain consistent spacing using an 8px grid.
- Preserve the visual hierarchy across all screen sizes.
- Use reusable UI components.
- Ensure responsive behaviour on desktop, tablet, and mobile devices.
- Keep branding consistent using the defined color palette and typography.
- Follow a clean, modern enterprise dashboard aesthetic.