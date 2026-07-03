import os
import re

file_path = r"c:\web\khadlaj-perfumes (1).jsx"

replacements = {
    # Island
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/1.jpg?v=1724330180": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3.jpg?v=1724330325",
    
    # Cream Velvet
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet01_4f0dfae6-16ce-4ced-b61a-8fdb2671d6ba.jpg?v=1736149414": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cream_Velvet_03.jpg?v=1736149481",
    
    # Island Dreams
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IslandDreams-1.jpg?v=1754913255": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island_Dreams-3.jpg?v=1754913321",
    
    # Ria
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ria-1.jpg?v=1760188171": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ria-3.jpg?v=1760188227",
    
    # Pure Musk
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MUSK_PURE_MUSK_BLEND_CREATION_OF_IQBAL_60_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965448.jpg?v=1722411175": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MUSK_PURE_MUSK_BLEND_CREATION_OF_IQBAL_60_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965450.jpg?v=1722411181",
    
    # Musk Ice
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MuskIce01.jpg?v=1752062427": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Musk_Ice_03.jpg?v=1771398752",
    
    # Karus Oud Fire
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KARUS_OUD_FIRE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964840.jpg?v=1722409976": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KARUS_OUD_FIRE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964843.jpg?v=1722409981",
    
    # Shiyaaka
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.1.jpg?v=1782717568": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.2.jpg?v=1771043858",
    
    # Onyx Gold
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ONYX-01_b085642f-9033-4997-a1fd-4e97be2a8575.jpg?v=1762324228": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ONYX-03.jpg?v=1762324228",
    
    # Icon
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.2.jpg?v=1773206615": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Icon.1.jpg?v=1773206615",
    
    # Sawaar
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SAWAAR-01.jpg?v=1764151092": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SAWAAR-03.jpg?v=1764151207",
    
    # Panache
    "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Panache_2_jpg_0bc7a1f3-8af9-4188-98f1-c58151159f55.jpg?v=1771333283": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Panache_1_jpg_c97c705a-aebf-4bf9-a621-f11b565e765d.jpg?v=1771333282",
}

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

for old_img, new_img in replacements.items():
    content = content.replace(old_img, new_img)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Images replaced with bottle-only packshots.")
