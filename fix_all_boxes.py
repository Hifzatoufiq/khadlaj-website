import os

file_path = r"c:\web\khadlaj-perfumes (1).jsx"

url_replacements = {
    # Gift sets -> standalone bottles
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-1.jpg?v=1779352739": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NAFAIS-3.jpg?v=1751435171",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-1.jpg?v=1779352383": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cream_Velvet_03.jpg?v=1736149481",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island2.jpg?v=1767168643": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3.jpg?v=1724330325",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy3.jpg?v=1767169755": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cloud_Candy-3.jpg?v=1746078194",
    
    # Packshots -> Bottles
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.1.jpg?v=1773206615": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.3.jpg?v=1773206615",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ShiyaakaShadow-1.jpg?v=1751436581": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka_Shadow-3.jpg?v=1751436642",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SAWAAR-01.jpg?v=1771151092": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SAWAAR-03.jpg?v=1764151207",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SAWAAR-01.jpg?v=1764151092": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SAWAAR-03.jpg?v=1764151207"
}

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace URLs
for old_url, new_url in url_replacements.items():
    content = content.replace(old_url, new_url)

# Apply CSS filter to "Just Dropped" section images (around line 852)
old_just_dropped = """<img src={item.src} alt={item.name} loading="lazy" 
                     style={{width:"85%",height:"85%",objectFit:"contain",transition:"transform .5s cubic-bezier(0.25, 0.8, 0.25, 1)"}}/>"""
new_just_dropped = """<img src={item.src} alt={item.name} loading="lazy" 
                     style={{width:"85%",height:"85%",objectFit:"contain", mixBlendMode:"multiply", filter:"contrast(1.05) brightness(1.04)", transition:"transform .5s cubic-bezier(0.25, 0.8, 0.25, 1)"}}/>"""
content = content.replace(old_just_dropped, new_just_dropped)

# Apply CSS filter to Featured category section images (around line 451)
old_featured = """<img src={t.img} alt="" style={{width:"100%", height:"100%", objectFit:"contain", mixBlendMode:"multiply"}}/>"""
new_featured = """<img src={t.img} alt="" style={{width:"100%", height:"100%", objectFit:"contain", mixBlendMode:"multiply", filter:"contrast(1.05) brightness(1.04)"}}/>"""
content = content.replace(old_featured, new_featured)


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Mass replacement complete!")
