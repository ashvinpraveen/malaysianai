# Andrew Gostishchev portrait prompt

Generated with the built-in image-generation tool, real transparency requested. The reference photo, hibiscus pixel art and original push-up sprite were inspected before generation and supplied as references.

The 1254px output came back with an uneven grid (cells of roughly 12-16px), not the requested 64x64. It was snapped to a 120x120 grid, to match the rest of the resident portraits, by taking the median colour of the middle half of each cell, with alpha thresholded at 128, and saved to `public/images/residents/andrew-gostishchev.png`. The profile page scales it back up 2x with `image-rendering: pixelated`. The raw PNG is kept beside this note.

## andrew-gostishchev-raw.png

Use case: stylized portrait. Generate one square pixel-art avatar, head and shoulders, of the person in the reference photo, on real alpha transparency. Strong likeness: short dark brown wavy hair with volume on top and shorter sides, light skin with warm sunlit tones, light brown eyes, straight dark eyebrows, slight closed-mouth smile, head turned very slightly to the viewer's right, pale sky-blue crew-neck t-shirt. Match the reference pixel art: chunky visible square pixels on an exact 64x64 logical grid enlarged crisply 16x to 1024x1024, rich multi-tone shading, warm highlights, saturated natural colours, crisp stepped edges, no blur, no antialiasing, no dithering noise, no glow. Light from upper left. Face centred horizontally, head occupying the upper two-thirds, shoulders cut off cleanly by the bottom edge of the canvas. No background scenery, no text, letters, logos, watermark, border, frame, outline glow or shadow plate. Background pixels must be alpha 0. If real transparency is impossible, use pure flat #FF00FF magenta for the background.

Input images: Image 1 is the reference photo and the only source for the person's identity and likeness. Image 2 is the site's hibiscus pixel art, a style reference only. Image 3 is the site's push-up pixel sprite at its original small resolution, a style reference only. Generate only the portrait of the person in Image 1.
