import cv2
import numpy as np
import urllib.request
from io import BytesIO

url = 'https://cdn.shopify.com/s/files/1/0626/6119/8023/files/1.jpg?v=1724330180'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
resp = urllib.request.urlopen(req).read()

# Load image from bytes
nparr = np.frombuffer(resp, np.uint8)
img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

# Convert to grayscale and threshold to find non-white objects
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)

# Find contours
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Find bounding boxes for large contours
bboxes = []
for cnt in contours:
    x, y, w, h = cv2.boundingRect(cnt)
    if w > 100 and h > 100:  # ignore noise
        bboxes.append((x, y, w, h))

# The bottle is the object on the right. Sort by x-coordinate.
bboxes.sort(key=lambda b: b[0])

if len(bboxes) >= 2:
    # Get the rightmost large object (the bottle)
    x, y, w, h = bboxes[-1]
    
    # Add a little padding
    pad = 20
    x_start = max(0, x - pad)
    y_start = max(0, y - pad)
    x_end = min(img.shape[1], x + w + pad)
    y_end = min(img.shape[0], y + h + pad)
    
    bottle_crop = img[y_start:y_end, x_start:x_end]
    
    # Save the cropped image
    save_path = r"c:\web\assets\images\products\island_bottle_perfect.jpg"
    cv2.imwrite(save_path, bottle_crop)
    print("Cropped perfectly using OpenCV!")
else:
    print("Could not find two distinct objects.")
