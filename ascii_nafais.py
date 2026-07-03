import urllib.request
from PIL import Image, ImageChops
from io import BytesIO

urls = [
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-2.jpg?v=1779352739',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-3.jpg?v=1779352739',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-4.jpg?v=1779352739'
]

for url in urls:
    try:
        print(f"\n--- {url.split('/')[-1].split('?')[0]} ---")
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla'})
        with urllib.request.urlopen(req) as resp:
            img = Image.open(BytesIO(resp.read())).convert('RGB')
            bg = Image.new(img.mode, img.size, (255,255,255))
            diff = ImageChops.difference(img, bg)
            diff = ImageChops.add(diff, diff, 2.0, -20)
            bbox = diff.getbbox()
            if not bbox: continue
            cropped = img.crop(bbox)
            small = cropped.resize((50, 20), Image.NEAREST)
            gray = small.convert('L')
            for y in range(20):
                row = ""
                for x in range(50):
                    px = gray.getpixel((x, y))
                    row += "#" if px < 240 else "."
                print(row)
    except Exception as e:
        print("Error:", e)
