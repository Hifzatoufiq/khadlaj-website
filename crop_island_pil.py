import urllib.request
from PIL import Image, ImageChops
from io import BytesIO

url = 'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/1.jpg?v=1724330180'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    img = Image.open(BytesIO(resp.read())).convert('RGB')
    
    # Create a mask of non-white pixels (thresholding)
    bg = Image.new('RGB', img.size, (255, 255, 255))
    diff = ImageChops.difference(img, bg)
    diff = ImageChops.add(diff, diff, 2.0, -50)
    
    # Convert to grayscale to evaluate column intensity
    gray = diff.convert('L')
    
    w, h = gray.size
    col_sums = []
    
    for x in range(w):
        col_sum = sum(gray.getpixel((x, y)) for y in range(h))
        col_sums.append(col_sum)
        
    # We expect two large peaks in col_sums separated by a valley.
    # Let's find the valley in the middle 30% of the image
    mid_start = int(w * 0.35)
    mid_end = int(w * 0.65)
    
    valley_idx = mid_start + col_sums[mid_start:mid_end].index(min(col_sums[mid_start:mid_end]))
    
    # Crop from valley_idx to the end
    right = w
    top = 0
    bottom = h
    
    cropped = img.crop((valley_idx, top, right, bottom))
    
    # Save the cropped image
    save_path = r"c:\web\assets\images\products\island_bottle_perfect.jpg"
    cropped.save(save_path, "JPEG", quality=95)
    print("Cropped using PIL column valley method!")
