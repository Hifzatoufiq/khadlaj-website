import os

file_path = r"c:\web\khadlaj-perfumes (1).jsx"

replacements = {
    "./assets/images/products/uno-intimo-single.png": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/UNO_INTIMO_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1966036.jpg?v=1722412332",
    "./assets/images/products/shahi-oud-single.png": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SHAHI_OUD_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965925.jpg?v=1722412108",
    "./assets/images/products/biscotti-date-toffee-single.png": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Biscotti_Date_Toffee-3.jpg?v=1776407655",
    "./assets/images/products/strawberry-shake-single.png": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/STRAWBERRY_SHAKE-03.jpg?v=1764228432",
    "./assets/images/products/cloud-candy-lineup.png": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cloud_Candy-3.jpg?v=1746078194",
    "./assets/images/products/blue-glace-single-2.png": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Bleu_Glace_02.jpg?v=1738325363",
    "./assets/images/products/blue-glace-single-1.png": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Bleu_Glace_02.jpg?v=1738325363",
    "./assets/images/products/island-packshot.png": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3.jpg?v=1724330325",
    "./assets/images/products/cream-velvet-front-box.png": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cream_Velvet_03.jpg?v=1736149481"
}

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

for old_img, new_img in replacements.items():
    content = content.replace(old_img, new_img)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Local mock images replaced with official Shopify bottle images.")
