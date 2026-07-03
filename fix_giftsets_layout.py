import os

file_path = r"c:\web\khadlaj-perfumes (1).jsx"

url_replacements = {
    # Cloud Candy
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cloud_Candy-3.jpg?v=1746078194": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy3.jpg?v=1767169755",
    
    # Island
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3.jpg?v=1724330325": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island3.jpg?v=1767168724",
    
    # Cream Velvet
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cream_Velvet_03.jpg?v=1736149481": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-1.jpg?v=1779352383",
    
    # Nafais Sharq
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NAFAIS-3.jpg?v=1751435171": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-1.jpg?v=1779352739",
}

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

for old_url, new_url in url_replacements.items():
    content = content.replace(old_url, new_url)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Gift Sets updated to 3-bottle layout images.")
