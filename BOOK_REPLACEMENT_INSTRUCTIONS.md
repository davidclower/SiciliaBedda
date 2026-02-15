# Instructions for Replacing Book in Heritage Collection_Village.png

## Option 1: Using Photoshop (Recommended for Best Results)

### Step 1: Extract the Book from Artisan Image
1. Open `Heritage Collection_Artisan.png` in Photoshop
2. Use the **Pen Tool** or **Polygonal Lasso Tool** to carefully select the book
   - The book is in the lower right quadrant
   - Include the entire book including any visible shadow
3. Copy the selection (Ctrl+C / Cmd+C)
4. Create a new document and paste (Ctrl+V / Cmd+V)
5. Save this as `book_extracted.psd` for reference

### Step 2: Prepare the Village Image
1. Open `Heritage Collection_Village.png` in Photoshop
2. Create a new layer above the background
3. Use the **Pen Tool** or **Polygonal Lasso Tool** to select the existing book in the Village image
4. Delete or mask out the old book (keep the selection active)

### Step 3: Paste and Transform the New Book
1. Paste the book from the Artisan image into the Village image
2. Use **Edit > Transform > Perspective** or **Edit > Transform > Distort** to match:
   - The angle and perspective of the original book position
   - The scale relative to other objects (tiles, prints)
3. Use **Edit > Transform > Rotate** if needed for fine angle adjustment
4. Use **Edit > Transform > Scale** to match the size

### Step 4: Match Lighting and Color
1. With the book layer selected, go to **Image > Adjustments > Match Color**
   - Source: Select the Village image
   - Layer: Select the background layer (or a reference area)
   - Adjust Luminance, Color Intensity, and Fade as needed
2. Alternatively, use **Image > Adjustments > Curves** or **Levels** to match brightness
3. Use **Image > Adjustments > Color Balance** to match color temperature

### Step 5: Match Shadows
1. Create a new layer below the book layer for the shadow
2. Use the **Brush Tool** with black color and low opacity (20-30%)
3. Paint a shadow matching the direction and softness of shadows in the Village image
4. Apply **Filter > Blur > Gaussian Blur** to soften the shadow
5. Set layer opacity to 50-70%

### Step 6: Final Adjustments
1. Use **Filter > Noise > Add Noise** (very subtle) to match texture
2. Use **Layer > Layer Style > Drop Shadow** if needed for additional depth
3. Fine-tune with **Image > Adjustments > Brightness/Contrast**
4. Check that the book appears to sit naturally on the wooden surface

### Step 7: Save
1. Flatten image or save as PSD with layers
2. Export as PNG: **File > Export > Export As** > PNG format

## Option 2: Using GIMP (Free Alternative)

### Similar Steps:
1. **Extract Book**: Use **Free Select Tool** or **Paths Tool** to select book from Artisan image
2. **Copy** and paste into Village image
3. **Transform**: Use **Tools > Transform Tools > Perspective** or **Scale** to match position
4. **Color Match**: Use **Colors > Color Balance** and **Colors > Levels** to match lighting
5. **Shadow**: Create new layer, paint shadow with **Paintbrush Tool**, apply **Filters > Blur > Gaussian Blur**
6. **Export**: **File > Export As** > PNG

## Option 3: Using Python Script (Basic Framework)

The script `replace_book.py` provides a basic framework but will likely need manual coordinate adjustment:

1. Install required packages:
   ```bash
   pip install Pillow numpy
   ```

2. Run the script:
   ```bash
   python replace_book.py
   ```

3. **Important**: You'll need to manually adjust the coordinates in the script:
   - Open both images in an image viewer
   - Note the exact pixel coordinates of the book in both images
   - Update the coordinates in `extract_book_from_artisan()` and `find_book_in_village()`

4. The script will create `Heritage Collection_Village_updated.png`

## Key Points for Perfect Matching:

1. **Perspective**: The book in Village image may be at a slightly different angle - use Perspective Transform
2. **Lighting**: Match the direction and intensity of light (appears to come from top-left)
3. **Shadows**: Ensure shadow direction and softness match surrounding objects
4. **Color Temperature**: The Village image has warmer tones - adjust accordingly
5. **Scale**: Ensure the book size is proportional to the tiles and prints
6. **Texture**: Match the surface texture and any reflections on the book cover

## Expected Result:

The book "Matteo Orlando, Le Madonie attraverso i miei occhi" from the Artisan image should appear in the Village image with:
- Same dark cover with high contrast portrait
- Same stone background texture on the cover
- Matching perspective, lighting, and scale
- Natural shadow that matches the scene
- Seamless integration with the wooden surface and other objects
