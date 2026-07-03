import os

file_path = r"c:\web\khadlaj-perfumes (1).jsx"

url_replacements = {
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-2.jpg?v=1779352384": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-4.jpg?v=1779352383",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-2.jpg?v=1779352739": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais-Sharq-4.jpg?v=1779352739"
}

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

for old_url, new_url in url_replacements.items():
    content = content.replace(old_url, new_url)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Cream Velvet and Nafais Sharq updated to variant 4.")
