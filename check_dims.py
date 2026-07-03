import urllib.request
from PIL import Image
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

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            img = Image.open(BytesIO(resp.read()))
            print(f'{url.split("/")[-1].split("?")[0]}: {img.size[0]}x{img.size[1]}')
    except Exception as e:
        print(f'{url.split("/")[-1].split("?")[0]}: Error {e}')
