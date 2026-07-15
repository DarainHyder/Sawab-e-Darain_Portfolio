import sys
try:
    from PIL import Image, ImageOps
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image, ImageOps

def invert_logo(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # Split the image into its bands
    r, g, b, a = img.split()
    
    # Recombine RGB, invert it, and put the alpha back
    rgb = Image.merge('RGB', (r, g, b))
    inverted_rgb = ImageOps.invert(rgb)
    
    # Merge the inverted RGB with the original Alpha
    inverted_img = inverted_rgb.convert("RGBA")
    inverted_img.putalpha(a)
    
    inverted_img.save(output_path, "PNG")
    print("Inverted logo saved to:", output_path)

if __name__ == "__main__":
    invert_logo(r"src\assets\image_nobg.png", r"src\assets\image_nobg_white.png")
