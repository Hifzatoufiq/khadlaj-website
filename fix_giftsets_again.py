import os

file_path = r"c:\web\khadlaj-perfumes (1).jsx"

url_replacements = {
    # Cloud Candy (Current: CloudCandy3.jpg)
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy3.jpg?v=1767169755": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy1.jpg?v=1767169755",
    
    # Island (Current: Island3.jpg)
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island3.jpg?v=1767168724": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island1.jpg?v=1767168752",
    
    # Cream Velvet (Current: CreamVelvet-1.jpg)
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-1.jpg?v=1779352383": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-2.jpg?v=1779352384",
    
    # Nafais Sharq (Current: Nafais-Sharq-1.jpg)
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-1.jpg?v=1779352739": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-2.jpg?v=1779352739",
}

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

for old_url, new_url in url_replacements.items():
    content = content.replace(old_url, new_url)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Gift Sets updated to variation 1/2.")
