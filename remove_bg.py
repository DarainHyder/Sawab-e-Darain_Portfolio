import sys
try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

def remove_background(input_path, output_path, tolerance=25):
    img = Image.open(input_path).convert("RGBA")
    
    data = img.getdata()
    bg_color = data[0] # assume top-left is bg color
    
    new_data = []
    for item in data:
        dist = ((item[0] - bg_color[0])**2 + (item[1] - bg_color[1])**2 + (item[2] - bg_color[2])**2)**0.5
        
        if dist <= tolerance:
            new_data.append((item[0], item[1], item[2], 0))
        elif dist <= tolerance * 2:
            alpha = int(((dist - tolerance) / tolerance) * 255)
            new_data.append((item[0], item[1], item[2], alpha))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print("Successfully removed background and saved to:", output_path)

if __name__ == "__main__":
    remove_background(r"src\assets\image.png", r"src\assets\image_nobg.png")
