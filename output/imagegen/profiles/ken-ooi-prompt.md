# Ken Ooi portrait prompt

Generated with the built-in image-generation tool, real transparency requested. The reference photo, hibiscus pixel art, original push-up sprite and earlier Andrew Gostishchev portrait were inspected before generation and supplied as references. Andrew's portrait was used for framing, scale and rendering only.

The 1254px output came back on an uneven grid of roughly 12-13px cells, not the requested 64x64. It was snapped to a 120x120 grid by taking the median colour of the middle half of each cell, with alpha thresholded at 128, and saved to `public/images/residents/ken-ooi.png`. The profile page scales it back up 2x with `image-rendering: pixelated`. The raw PNG is kept beside this note.

## ken-ooi-raw.png

Use case: stylized portrait. Generate one square pixel-art avatar, head and shoulders, of the person in the reference photo, on real alpha transparency. Strong likeness: short black hair with faded short sides and a longer top swept back and to the side, light skin, dark eyes, calm serious closed-mouth expression, head in a three-quarter view turned towards the viewer's left as in the photo, black tailored suit jacket over a crisp white open-collared shirt. Match the reference pixel art: chunky visible square pixels on an exact 64x64 logical grid enlarged crisply 16x to 1024x1024, rich multi-tone shading, warm highlights, saturated natural colours, crisp stepped edges, no blur, no antialiasing, no dithering noise, no glow. Light from upper left. Face centred horizontally, head occupying the upper two-thirds, shoulders cut off cleanly by the bottom edge of the canvas. No background scenery, no text, letters, logos, watermark, border, frame, outline glow or shadow plate. Background pixels must be alpha 0. If real transparency is impossible, use pure flat #FF00FF magenta for the background.

Input images: Image 1 is the reference photo and the only source for the person's identity and likeness. Image 2 is the site's hibiscus pixel art, a style reference only. Image 3 is the site's push-up pixel sprite at its original small resolution, a style reference only. Image 4 is an earlier portrait from this series, a reference for framing, scale and rendering only; take nothing from that man's face, hair or clothing. Generate only the portrait of the person in Image 1.

