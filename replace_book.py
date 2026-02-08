"""
Script to replace the book in Heritage Collection_Village.png 
with the book from Heritage Collection_Artisan.png

Note: This script provides a basic framework. Perfect perspective, lighting, 
and scale matching may require manual adjustment in image editing software.
"""

from PIL import Image, ImageEnhance, ImageFilter
import numpy as np

def extract_book_from_artisan(image_path):
    """Extract the book region from the Artisan image"""
    img = Image.open(image_path)
    # Based on the description, the book is in the lower right quadrant
    # These coordinates will need to be adjusted based on actual image dimensions
    width, height = img.size
    
    # Approximate book location (lower right quadrant, adjusted for actual position)
    # You may need to manually adjust these coordinates
    left = int(width * 0.5)   # Start from middle
    top = int(height * 0.6)   # Start from 60% down
    right = int(width * 0.95) # End near right edge
    bottom = int(height * 0.95) # End near bottom edge
    
    book = img.crop((left, top, right, bottom))
    return book, (left, top, right, bottom)

def find_book_in_village(image_path):
    """Find the book region in the Village image that needs to be replaced"""
    img = Image.open(image_path)
    width, height = img.size
    
    # Based on description, book is in bottom right
    # These coordinates will need to be adjusted
    left = int(width * 0.5)
    top = int(height * 0.6)
    right = int(width * 0.95)
    bottom = int(height * 0.95)
    
    return img, (left, top, right, bottom)

def adjust_perspective_and_scale(source_book, target_size, target_angle=0):
    """Adjust the book to match target size and perspective"""
    # Resize to match target size
    resized = source_book.resize(target_size, Image.LANCZOS)
    
    # If rotation is needed (for perspective matching)
    if target_angle != 0:
        resized = resized.rotate(target_angle, expand=True, fillcolor=(0, 0, 0, 0))
    
    return resized

def match_lighting(source_book, reference_region):
    """Attempt to match lighting between source and target"""
    # Convert to numpy arrays for processing
    source_array = np.array(source_book)
    reference_array = np.array(reference_region)
    
    # Calculate average brightness
    source_brightness = np.mean(source_array)
    reference_brightness = np.mean(reference_array)
    
    # Adjust brightness
    brightness_factor = reference_brightness / source_brightness if source_brightness > 0 else 1.0
    
    # Apply brightness adjustment
    enhanced = ImageEnhance.Brightness(source_book)
    adjusted = enhanced.enhance(brightness_factor)
    
    return adjusted

def replace_book():
    """Main function to replace the book"""
    artisan_path = "Heritage Collection_Artisan.png"
    village_path = "Heritage Collection_Village.png"
    output_path = "Heritage Collection_Village_updated.png"
    
    print("Loading images...")
    village_img = Image.open(village_path)
    artisan_img = Image.open(artisan_path)
    
    print("Extracting book from Artisan image...")
    source_book, artisan_coords = extract_book_from_artisan(artisan_path)
    
    print("Finding book location in Village image...")
    village_img, village_coords = find_book_in_village(village_path)
    
    # Get target size from village book location
    target_size = (
        village_coords[2] - village_coords[0],
        village_coords[3] - village_coords[1]
    )
    
    print("Adjusting book size and perspective...")
    adjusted_book = adjust_perspective_and_scale(source_book, target_size)
    
    # Extract reference region for lighting matching
    reference_region = village_img.crop(village_coords)
    
    print("Matching lighting...")
    final_book = match_lighting(adjusted_book, reference_region)
    
    print("Replacing book in Village image...")
    # Create a copy of the village image
    result = village_img.copy()
    
    # Paste the new book
    result.paste(final_book, village_coords[:2], final_book if final_book.mode == 'RGBA' else None)
    
    print(f"Saving result to {output_path}...")
    result.save(output_path, quality=95)
    print("Done!")
    print("\nNote: You may need to manually adjust:")
    print("- Exact position and rotation")
    print("- Perspective transformation")
    print("- Shadow and lighting details")
    print("- Color matching")

if __name__ == "__main__":
    replace_book()
