import sys
from rembg import remove
from PIL import Image

input_path = "src/assets/darain-professional.jpg"
output_path = "src/assets/darain-professional-nobg.png"

try:
    input_image = Image.open(input_path)
    output_image = remove(input_image)
    output_image.save(output_path)
    print("Successfully removed background!")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
