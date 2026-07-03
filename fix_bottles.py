import os

file_path = r"c:\web\khadlaj-perfumes (1).jsx"

url_replacements = {
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.3.jpg?v=1773206615": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.4.jpg?v=1773206615",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.3.jpg?v=1771043797": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.4.jpg?v=1771043858",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_2.png?v=1781332291": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_1.png?v=1781332291"
}

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

for old_url, new_url in url_replacements.items():
    content = content.replace(old_url, new_url)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Icon, Shiyaaka, and Saraya changed to standalone bottles (.4 / _1 variants).")
