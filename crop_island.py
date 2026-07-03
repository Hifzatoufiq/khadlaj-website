import urllib.request
from PIL import Image
from io import BytesIO

url = 'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/1.jpg?v=1724330180'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    img = Image.open(BytesIO(resp.read())).convert('RGB')
    
    w, h = img.size
    
    # In 1.jpg, box is on left, bottle is on right.
    # We crop the right 45% of the image.
    left = int(w * 0.50)
    right = w
    top = 0
    bottom = h
    
    cropped = img.crop((left, top, right, bottom))
    
    # Save to assets
    save_path = r"c:\web\assets\images\products\island_single.jpg"
    cropped.save(save_path, "JPEG", quality=95)
    
print("Cropped Island single bottle successfully!")
