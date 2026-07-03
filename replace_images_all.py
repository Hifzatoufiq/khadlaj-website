import os

file_path = r"c:\web\khadlaj-perfumes (1).jsx"

replacements = {
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ZayanSilver-1.jpg?v=1776430327": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Zayan_Silver-3.jpg?v=1776430400",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-1.jpg?v=1775635386": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1775636549",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qarar-1.jpg?v=1775636739": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qarar-3.jpg?v=1775637258",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.1.png?v=1772518099": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.3.png?v=1772518819",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OnyxSilver1.jpg?v=1769502676": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OnyxSilver3.jpg?v=1769502676",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NUHABONBON-01.jpg?v=1768477611": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NUHA_BON_BON-03.jpg?v=1768477660",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NafaisMagrib-1.jpg?v=1761115734": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nafais_Magrib-3.jpg?v=1761115886",
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka_Shadow-3_bef3b7fa-b2c9-4ec5-adcc-0b3f9ac42034.jpg?v=1761113212": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ShiyaakaShadow-1.jpg?v=1751436581",
    "./assets/images/products/cloud-candy-front-box.png": "./assets/images/products/cloud-candy-lineup.png"
}

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

for old_img, new_img in replacements.items():
    content = content.replace(old_img, new_img)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("All remaining box images replaced.")
