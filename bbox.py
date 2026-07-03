import urllib.request
from PIL import Image, ImageChops
from io import BytesIO

urls = [
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.2.jpg?v=1773206615',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.1.jpg?v=1773206615',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.4.jpg?v=1773206615',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.3.jpg?v=1773206615',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.1.jpg?v=1782717568',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.2.jpg?v=1771043858',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.4.jpg?v=1771043858',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.3.jpg?v=1771043797',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_2.png?v=1781332291',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_3.png?v=1781332291',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_1.png?v=1781332291',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_1.jpg?v=1781332291'
]

def get_bbox_ratio(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            img = Image.open(BytesIO(resp.read())).convert('RGB')
            # Get the top-left pixel color as background
            bg = Image.new(img.mode, img.size, img.getpixel((0,0)))
            diff = ImageChops.difference(img, bg)
            # Add a bit of tolerance
            diff = ImageChops.add(diff, diff, 2.0, -10)
            bbox = diff.getbbox()
            if bbox:
                w = bbox[2] - bbox[0]
                h = bbox[3] - bbox[1]
                ratio = h / w if w > 0 else 0
                return f'{url.split("/")[-1].split("?")[0]}: Content W={w}, H={h}, Ratio H/W={ratio:.2f}'
            return f'{url.split("/")[-1].split("?")[0]}: No bounding box'
    except Exception as e:
        return f'{url}: Error {e}'

for url in urls:
    print(get_bbox_ratio(url))
