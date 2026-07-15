import sys
try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

def crop_transparent_padding(input_path, output_paths):
    img = Image.open(input_path).convert("RGBA")
    
    # getbbox() finds the bounding box of non-zero alpha pixels
    bbox = img.getbbox()
    
    if bbox:
        # Crop to the exact boundaries of the logo
        cropped_img = img.crop(bbox)
        
        for path in output_paths:
            cropped_img.save(path, "PNG")
            print(f"Cropped image and saved to {path}")
    else:
        print("Image is entirely transparent, cannot crop.")

if __name__ == "__main__":
    input_file = r"src\assets\image_nobg_white.png"
    outputs = [
        r"src\assets\image_nobg_white.png",
        r"public\favicon.png"
    ]
    crop_transparent_padding(input_file, outputs)
