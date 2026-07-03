import urllib.request
from PIL import Image, ImageChops
from io import BytesIO

def crop_box(url, keep_side, save_path):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        img = Image.open(BytesIO(resp.read())).convert('RGB')
        
        # Create a mask of non-white pixels
        bg = Image.new('RGB', img.size, (255, 255, 255))
        diff = ImageChops.difference(img, bg)
        diff = ImageChops.add(diff, diff, 2.0, -20)
        gray = diff.convert('L')
        
        w, h = gray.size
        col_sums = []
        for x in range(w):
            col_sums.append(sum(gray.getpixel((x, y)) for y in range(h)))
            
        # Find valley in the middle 40%
        mid_start = int(w * 0.30)
        mid_end = int(w * 0.70)
        
        valley_idx = mid_start + col_sums[mid_start:mid_end].index(min(col_sums[mid_start:mid_end]))
        
        if keep_side == 'left':
            cropped = img.crop((0, 0, valley_idx, h))
        else:
            cropped = img.crop((valley_idx, 0, w, h))
            
        # Make background pure white
        cropped = cropped.convert("RGBA")
        data = cropped.getdata()
        new_data = []
        for item in data:
            if item[0] > 230 and item[1] > 230 and item[2] > 230:
                new_data.append((255, 255, 255, 255))
            else:
                new_data.append(item)
        cropped.putdata(new_data)
        
        cropped.convert("RGB").save(save_path, "JPEG", quality=95)
        print(f"Cropped {url.split('/')[-1]} keeping {keep_side} side!")

# Island3.jpg - box is on the right, keep LEFT
crop_box('https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island3.jpg?v=1767168724', 'left', r'c:\web\assets\images\products\island_gift_set_nobox.jpg')

# CreamVelvet-3.jpg - box is on the left, keep RIGHT
crop_box('https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-3.jpg?v=1779352383', 'right', r'c:\web\assets\images\products\creamvelvet_gift_set_nobox.jpg')
