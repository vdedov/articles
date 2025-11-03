#!/usr/bin/env python3
"""
Скрипт для генерации favicon файлов из SVG.

Требования:
  pip install cairosvg pillow

Использование:
  python generate_favicons.py
"""

import os
from pathlib import Path

try:
    import cairosvg
    from PIL import Image
    import io
except ImportError as e:
    print("Ошибка: не установлены необходимые библиотеки.")
    print("Установите их командой:")
    print("  pip install cairosvg pillow")
    exit(1)


def generate_png(svg_path, output_path, size):
    """Генерирует PNG файл указанного размера из SVG."""
    print(f"Генерация {output_path} ({size}x{size})...")

    # Конвертация SVG в PNG через cairosvg
    png_data = cairosvg.svg2png(
        url=str(svg_path),
        output_width=size,
        output_height=size
    )

    # Сохранение PNG
    with open(output_path, 'wb') as f:
        f.write(png_data)

    print(f"✓ {output_path} создан")


def generate_ico(svg_path, output_path):
    """Генерирует ICO файл из SVG с несколькими размерами."""
    print(f"Генерация {output_path}...")

    sizes = [16, 32, 48]
    images = []

    for size in sizes:
        png_data = cairosvg.svg2png(
            url=str(svg_path),
            output_width=size,
            output_height=size
        )
        img = Image.open(io.BytesIO(png_data))
        images.append(img)

    # Сохранение ICO с несколькими размерами
    images[0].save(
        output_path,
        format='ICO',
        sizes=[(img.width, img.height) for img in images],
        append_images=images[1:]
    )

    print(f"✓ {output_path} создан")


def generate_og_image(svg_path, output_path):
    """Генерирует Open Graph изображение (1200x630)."""
    print(f"Генерация {output_path} (1200x630)...")

    # Создаем PNG с размером 512x512 для центрирования
    icon_size = 512
    icon_data = cairosvg.svg2png(
        url=str(svg_path),
        output_width=icon_size,
        output_height=icon_size
    )
    icon = Image.open(io.BytesIO(icon_data))

    # Создаем фон 1200x630 с темным цветом (как в SVG)
    og_width, og_height = 1200, 630
    bg = Image.new('RGB', (og_width, og_height), color='#0d1117')

    # Центрируем иконку
    x = (og_width - icon_size) // 2
    y = (og_height - icon_size) // 2
    bg.paste(icon, (x, y), icon if icon.mode == 'RGBA' else None)

    # Сохраняем
    bg.save(output_path, 'PNG', optimize=True)

    print(f"✓ {output_path} создан")


def main():
    # Пути
    svg_path = Path('public/favicon.svg')
    public_dir = Path('public')

    if not svg_path.exists():
        print(f"Ошибка: файл {svg_path} не найден!")
        exit(1)

    print("Генерация favicon файлов из SVG...\n")

    # Генерация PNG иконок
    generate_png(svg_path, public_dir / 'favicon-16x16.png', 16)
    generate_png(svg_path, public_dir / 'favicon-32x32.png', 32)
    generate_png(svg_path, public_dir / 'apple-touch-icon.png', 180)
    generate_png(svg_path, public_dir / 'android-chrome-192x192.png', 192)
    generate_png(svg_path, public_dir / 'android-chrome-512x512.png', 512)

    print()

    # Генерация ICO
    generate_ico(svg_path, public_dir / 'favicon.ico')

    print()

    # Генерация Open Graph изображения
    generate_og_image(svg_path, public_dir / 'og-image.png')

    print("\n✓ Все иконки успешно сгенерированы!")
    print("\nСозданные файлы:")
    print("  - favicon.ico (16x16, 32x32, 48x48)")
    print("  - favicon-16x16.png")
    print("  - favicon-32x32.png")
    print("  - apple-touch-icon.png (180x180)")
    print("  - android-chrome-192x192.png")
    print("  - android-chrome-512x512.png")
    print("  - og-image.png (1200x630)")


if __name__ == '__main__':
    main()
