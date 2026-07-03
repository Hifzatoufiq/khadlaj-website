from PIL import Image

img_path = r"c:\web\assets\images\products\island_bottle_perfect.jpg"
img = Image.open(img_path).convert("RGBA")

data = img.getdata()
new_data = []

# Find the background color from the top-left pixel
bg_color = data[0]

for item in data:
    # If the pixel is close to the background color (light gray/white)
    # The bottle is dark green/gold, so thresholding is safe
    if item[0] > 220 and item[1] > 220 and item[2] > 220:
        new_data.append((255, 255, 255, 255)) # Pure white
    else:
        new_data.append(item)

img.putdata(new_data)
img.convert("RGB").save(img_path, "JPEG", quality=95)
print("Made background pure white!")
