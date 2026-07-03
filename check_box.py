import cv2
import numpy as np
import urllib.request
from io import BytesIO

def check_for_box(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla'})
        resp = urllib.request.urlopen(req).read()
        nparr = np.frombuffer(resp, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Convert to grayscale and threshold
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
        
        # Find contours
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        # Filter noise
        valid_cnts = [c for c in contours if cv2.contourArea(c) > 5000]
        
        if not valid_cnts:
            return f"{url.split('/')[-1].split('?')[0]}: No objects found"
            
        # Find the largest contour
        largest = max(valid_cnts, key=cv2.contourArea)
        largest_area = cv2.contourArea(largest)
        img_area = img.shape[0] * img.shape[1]
        area_ratio = largest_area / img_area
        
        # Check if largest contour is very "solid" / rectangular (like a box)
        x, y, w, h = cv2.boundingRect(largest)
        rect_area = w * h
        solidity = largest_area / rect_area if rect_area > 0 else 0
        
        return f"{url.split('/')[-1].split('?')[0]}: Contours={len(valid_cnts)}, Max Area Ratio={area_ratio:.3f}, Max Solidity={solidity:.3f}, Max H/W={h/w:.2f}"
    except Exception as e:
        return f"{url}: Error {e}"

urls = [
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island1.jpg?v=1767168752',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island2.jpg?v=1767168643',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island3.jpg?v=1767168724',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island4.jpg?v=1767168723',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-1.jpg?v=1779352383',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-2.jpg?v=1779352384',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-3.jpg?v=1779352383',
    'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-4.jpg?v=1779352383'
]

for u in urls:
    print(check_for_box(u))
