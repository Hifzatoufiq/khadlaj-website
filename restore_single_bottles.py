import os

file_path = r"c:\web\khadlaj-perfumes (1).jsx"

url_replacements = {
    # Fix single bottles that were accidentally replaced with Gift Set images
    # Island (id: 13, 100ml Extrait)
    'img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island1.jpg?v=1767168752" },': 'img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/1.jpg?v=1724330180" },',
    
    # Cream Velvet (id: 14, standalone)
    'img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-3.jpg?v=1779352383" },': 'img:"https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cream_Velvet_03.jpg?v=1736149481" },'
}

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

for old_str, new_str in url_replacements.items():
    content = content.replace(old_str, new_str)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Restored single bottles for Island and Cream Velvet.")
