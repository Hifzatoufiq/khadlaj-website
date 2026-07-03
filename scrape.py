import urllib.request, json

targets = [
    "Island",
    "Island Dreams",
    "Onyx",
    "Icon",
    "Cream Velvet",
    "Sawaar",
    "Panache",
    "Ria",
    "Pure musk pure blend",
    "Musk Ice",
    "Shiyaaka",
    "Karus"
]

def fetch_products():
    products = []
    page = 1
    while True:
        url = f"https://khadlaj-perfumes.com/products.json?limit=250&page={page}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        data = json.loads(res.read())
        prods = data.get("products", [])
        if not prods:
            break
        products.extend(prods)
        page += 1
    return products

products = fetch_products()
print(f"Total products fetched: {len(products)}")

found = []

for target in targets:
    t_lower = target.lower()
    matches = []
    for p in products:
        title = p["title"].lower()
        if t_lower in title:
            matches.append(p)
    
    if not matches:
        # Maybe split words or try slightly different names if not found
        # pure musk pure blend -> pure musk
        print(f"NOT FOUND: {target}")
        continue
    
    # Try to pick the best match (shortest title usually means exact product vs gift set)
    # Also prioritize EDP/Extrait over gift sets unless the user explicitly wants the gift set.
    matches.sort(key=lambda x: len(x['title']))
    best = matches[0]
    
    img = best["images"][0]["src"] if best.get("images") else ""
    price = best["variants"][0]["price"] if best.get("variants") else "0"
    
    found.append({
        "target": target,
        "title": best["title"],
        "price": price,
        "img": img,
        "tags": best.get("tags", [])
    })

for f in found:
    print(f"{f['target']} -> {f['title']} | ${f['price']} | {f['img']}")
