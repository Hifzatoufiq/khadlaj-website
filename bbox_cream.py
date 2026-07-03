import urllib.request
from PIL import Image, ImageChops
from io import BytesIO

urls = [
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet01_4f0dfae6-16ce-4ced-b61a-8fdb2671d6ba.jpg?v=1736149414',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cream_Velvet_03.jpg?v=1736149481',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet02.jpg?v=1736149095',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cream_Velvet_04.jpg?v=1736149548'
]

def get_bbox_ratio(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            img = Image.open(BytesIO(resp.read())).convert('RGB')
            bg = Image.new(img.mode, img.size, img.getpixel((0,0)))
            diff = ImageChops.difference(img, bg)
            diff = ImageChops.add(diff, diff, 2.0, -10)
            bbox = diff.getbbox()
            if bbox:
                w = bbox[2] - bbox[0]
                h = bbox[3] - bbox[1]
                ratio = h / w if w > 0 else 0
                fill_ratio = (w * h) / (img.size[0] * img.size[1])
                return f'{url.split("/")[-1].split("?")[0]}: W={w}, H={h}, Ratio H/W={ratio:.2f}, Fill={fill_ratio:.2f}'
            return f'{url.split("/")[-1].split("?")[0]}: No bounding box'
    except Exception as e:
        return f'{url}: Error {e}'

for url in urls:
    print(get_bbox_ratio(url))
