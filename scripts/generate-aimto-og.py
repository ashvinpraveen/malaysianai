#!/usr/bin/env python3
"""Build the static AIMTO social card from real artwork, type, and logos."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "aimto-assets"
SOURCE = ASSETS / "og-background.png"
OUTPUT = ASSETS / "og-image.png"

WIDTH = 1200
HEIGHT = 630
LIME = (215, 255, 54, 255)
WHITE = (255, 255, 255, 255)
MUTED = (204, 204, 216, 255)

MONO_REGULAR = ROOT / "scripts" / "assets" / "JetBrainsMono-Regular.ttf"
MONO_BOLD = ROOT / "scripts" / "assets" / "JetBrainsMono-Bold.ttf"


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size=size)


def fit_cover(image: Image.Image, width: int, height: int) -> Image.Image:
    source_ratio = image.width / image.height
    target_ratio = width / height

    if source_ratio > target_ratio:
        crop_width = round(image.height * target_ratio)
        left = round((image.width - crop_width) / 2)
        box = (left, 0, left + crop_width, image.height)
    else:
        crop_height = round(image.width / target_ratio)
        # Preserve the face and skyline while trimming excess floor/flowers.
        top = min(86, image.height - crop_height)
        box = (0, top, image.width, top + crop_height)

    return image.crop(box).resize((width, height), Image.Resampling.LANCZOS)


def horizontal_overlay() -> Image.Image:
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    pixels = overlay.load()
    for x in range(WIDTH):
        if x <= 560:
            alpha = round(205 - (x / 560) * 45)
        elif x <= 870:
            alpha = round(160 * (1 - ((x - 560) / 310)))
        else:
            alpha = 0
        for y in range(HEIGHT):
            pixels[x, y] = (5, 4, 24, max(0, alpha))
    return overlay


def bottom_overlay() -> Image.Image:
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    pixels = overlay.load()
    start = 382
    for y in range(start, HEIGHT):
        alpha = round(((y - start) / (HEIGHT - start)) * 170)
        for x in range(WIDTH):
            pixels[x, y] = (5, 4, 18, alpha)
    return overlay


def paste_logo(
    canvas: Image.Image,
    filename: str,
    position: tuple[int, int],
    width: int,
) -> None:
    logo = Image.open(ASSETS / filename).convert("RGBA")
    height = round(logo.height * (width / logo.width))
    logo = logo.resize((width, height), Image.Resampling.LANCZOS)
    canvas.alpha_composite(logo, position)


def main() -> None:
    source = Image.open(SOURCE).convert("RGBA")
    canvas = fit_cover(source, WIDTH, HEIGHT)
    canvas = Image.alpha_composite(canvas, horizontal_overlay())
    canvas = Image.alpha_composite(canvas, bottom_overlay())

    draw = ImageDraw.Draw(canvas)

    # Official AIMTO wordmark.
    paste_logo(canvas, "logo-white.png", (54, 118), 570)

    # Date block.
    date_font = font(MONO_BOLD, 52)
    draw.text((54, 430), "11—12", font=date_font, fill=LIME)
    draw.text((54, 488), "AUG 2026", font=date_font, fill=WHITE)

    # Venue block.
    draw.line((348, 434, 348, 550), fill=(255, 255, 255, 150), width=2)
    draw.text((378, 438), "VENUE_", font=font(MONO_REGULAR, 14), fill=MUTED)
    draw.text((378, 478), "THE CAMPUS", font=font(MONO_BOLD, 25), fill=WHITE)
    draw.text((378, 515), "KUALA LUMPUR", font=font(MONO_BOLD, 25), fill=WHITE)

    # Official organiser marks, balanced optically rather than by source canvas.
    draw.text(
        (914, 512),
        "ORGANISED BY_",
        font=font(MONO_REGULAR, 12),
        fill=MUTED,
    )
    paste_logo(canvas, "ludic-logo-white.png", (904, 544), 142)
    paste_logo(canvas, "500-logo-white.png", (1060, 548), 100)

    canvas.convert("RGB").save(
        OUTPUT,
        format="PNG",
        optimize=True,
        compress_level=9,
    )
    print(f"Wrote {OUTPUT} ({WIDTH}x{HEIGHT})")


if __name__ == "__main__":
    main()
