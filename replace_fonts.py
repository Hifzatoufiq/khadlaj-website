import os

file_path = r"c:\web\khadlaj-perfumes (1).jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace body font
content = content.replace("'Outfit',sans-serif", "'Montserrat',sans-serif")
content = content.replace("\"'Outfit',sans-serif\"", "\"'Montserrat',sans-serif\"")

# Replace header font
content = content.replace("'Cormorant Garamond',serif", "'Cinzel',serif")
content = content.replace("\"'Cormorant Garamond',serif\"", "\"'Cinzel',serif\"")

# Adjust navbar font size
# We are searching for the exact style block for the navbar:
nav_target = 'className="hide-mob" style={{display:"flex",justifyContent:"center",gap:40,paddingBottom:16,fontSize:"8.5px",letterSpacing:"3px",textTransform:"uppercase",color:"#111",fontFamily:"\'Montserrat\',sans-serif",fontWeight:600}}'
nav_replacement = 'className="hide-mob" style={{display:"flex",justifyContent:"center",gap:40,paddingBottom:16,fontSize:"12px",letterSpacing:"1.5px",textTransform:"uppercase",color:"#111",fontFamily:"\'Montserrat\',sans-serif",fontWeight:600}}'

if nav_target in content:
    content = content.replace(nav_target, nav_replacement)
else:
    print("Navbar target not found! Check formatting.")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Font replacements applied successfully.")
