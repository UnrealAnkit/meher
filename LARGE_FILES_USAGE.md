# Large Image Files Usage Report

This document identifies where the 5 large image files are being used in the codebase.

## File Size Summary
1. **background.png**: 19.06 MB
2. **rectangle.png**: 19.03 MB  
3. **rectangle-3.png**: 16.51 MB
4. **img-8041-1.png**: 7.47 MB
5. **rectangle-2.png**: 6.31 MB

---

## 1. background.png (19.06 MB)
**Status**: ❌ **NOT FOUND IN CODEBASE**
- This file exists in `/public/background.png` but is **NOT currently being used** anywhere in the code
- **Recommendation**: This file can be safely removed or optimized if needed in the future

---

## 2. rectangle.png (19.03 MB)
**Status**: ✅ **FOUND - Used in LaunchSection**
- **Location**: `src/screens/Mehr/sections/LaunchSection/LaunchSection.tsx`
- **Line**: 11
- **Usage**: Used as an image for the "STAY OPTIONS" card
- **Current Status**: ⚠️ **LaunchSection is NOT currently imported/used in the main Mehr component**
- **Code Reference**:
  ```tsx
  {
    title: "STAY OPTIONS",
    description: "...",
    image: "/rectangle.png",  // Line 11
    imageClasses: "rounded-t-[15px] object-cover",
    path: "/book-your-stay",
  }
  ```
- **Recommendation**: 
  - Add lazy loading if LaunchSection is used
  - Consider optimizing/compressing this 19MB file
  - Convert to WebP format for better compression

---

## 3. rectangle-3.png (16.51 MB)
**Status**: ✅ **FOUND - Used in Mehr.tsx (Homepage)**
- **Location**: `src/screens/Mehr/Mehr.tsx`
- **Line**: 294
- **Usage**: Used in the "What makes MEHR unique" section
- **Source**: Loaded from CDN: `https://meher.b-cdn.net/Rectangle%203.png`
- **Current Status**: ✅ Already has `loading="lazy"` attribute
- **Code Reference**:
  ```tsx
  <img
    className="w-full sm:w-4/5 lg:w-4/5 h-auto lg:h-[120%] max-h-[300px] sm:max-h-[400px] lg:max-h-none object-cover rounded-tl-[12px] rounded-tr-[12px] lg:shadow-lg lg:translate-y-[-8%]"
    alt="Wellness Session"
    src="https://meher.b-cdn.net/Rectangle%203.png"  // Line 294
    loading="lazy"
    style={{ marginBottom: '0' }}
  />
  ```
- **Recommendation**: 
  - ✅ Already optimized with lazy loading
  - Consider optimizing the source file on CDN (compress/convert to WebP)

---

## 4. img-8041-1.png (7.47 MB)
**Status**: ❌ **NOT FOUND IN CODEBASE**
- This file exists in `/public/img-8041-1.png` but is **NOT currently being used** anywhere in the code
- **Recommendation**: This file can be safely removed or optimized if needed in the future

---

## 5. rectangle-2.png (6.31 MB)
**Status**: ✅ **FOUND - Used in AboutUsSection**
- **Location**: `src/screens/Mehr/sections/AboutUsSection/AboutUsSection.tsx`
- **Line**: 30
- **Usage**: Background image for the "Therapies & Programs" section
- **Current Status**: ✅ Already has `loading="lazy"` and `decoding="async"` attributes
- **Code Reference**:
  ```tsx
  <img
    className="absolute inset-0 w-full h-full object-cover"
    alt="Therapies and programs background"
    src="/rectangle-2.png"  // Line 30
    loading="lazy"
    decoding="async"
  />
  ```
- **Recommendation**: 
  - ✅ Already optimized with lazy loading
  - Consider compressing/optimizing the source file

---

## Summary

### Files Currently in Use:
1. ✅ **rectangle.png** (19.03 MB) - Used in LaunchSection (but LaunchSection not currently active)
2. ✅ **rectangle-3.png** (16.51 MB) - Used in Mehr.tsx homepage (already optimized)
3. ✅ **rectangle-2.png** (6.31 MB) - Used in AboutUsSection (already optimized)

### Files NOT in Use:
1. ❌ **background.png** (19.06 MB) - Unused, can be removed
2. ❌ **img-8041-1.png** (7.47 MB) - Unused, can be removed

### Total Unused File Size: 26.53 MB (can be safely removed)

### Recommendations:
1. **Remove unused files**: Delete `background.png` and `img-8041-1.png` to save 26.53 MB
2. **Optimize rectangle.png**: If LaunchSection is used, compress this 19MB file
3. **Consider WebP conversion**: Convert all large PNG files to WebP format for better compression (typically 25-35% smaller)
4. **CDN optimization**: Optimize rectangle-3.png on the CDN (meher.b-cdn.net)

