import numpy as np
from PIL import Image

files = [
    r'C:\Users\ADMIN\.gemini\antigravity\brain\9dcc7b19-1668-4f3e-9c0c-3f48925daaac\media__1783114808560.png',
    r'C:\Users\ADMIN\.gemini\antigravity\brain\9dcc7b19-1668-4f3e-9c0c-3f48925daaac\media__1783114839630.png',
    r'C:\Users\ADMIN\.gemini\antigravity\brain\9dcc7b19-1668-4f3e-9c0c-3f48925daaac\media__1783114933053.png',
    r'C:\Users\ADMIN\.gemini\antigravity\brain\9dcc7b19-1668-4f3e-9c0c-3f48925daaac\media__1783114959777.png'
]

import shutil
import os

os.makedirs(r'c:\web\assets\images\gifsets', exist_ok=True)

for i, f in enumerate(files):
    try:
        img = Image.open(f).convert('RGB')
        arr = np.array(img)
        mask = (arr[:,:,0] < 240) | (arr[:,:,1] < 240) | (arr[:,:,2] < 240)
        fg = arr[mask]
        if len(fg) > 0:
            avg = fg.mean(axis=0)
            color_str = f"R={avg[0]:.0f}, G={avg[1]:.0f}, B={avg[2]:.0f}"
            print(f"File {i}: {color_str}")
            
            # Identify based on dominant color
            if avg[0] > 180 and avg[1] > 140 and avg[2] < 120:
                name = 'nafais'
            elif avg[1] > avg[0] and avg[1] > avg[2] and avg[2] > 100:
                name = 'island'
            elif avg[0] > 200 and avg[1] > 150 and avg[2] > 150:
                name = 'cloudcandy'
            elif avg[0] > 180 and avg[1] > 160 and avg[2] > 120:
                name = 'creamvelvet'
            else:
                name = f'unknown_{i}'
                
            print(f"  -> Identified as {name}")
            shutil.copy(f, f'c:\\web\\assets\\images\\gifsets\\{name}_gift_user.png')
    except Exception as e:
        print(f"Error on {f}: {e}")
