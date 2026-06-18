#!/bin/bash

# Target directory
TARGET_DIR="client/public/niramaya"

if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Directory $TARGET_DIR does not exist. Please place your images there first."
  exit 1
fi

echo "=================================================="
echo "Compressing Niramaya Wellness images using sips..."
echo "=================================================="

for img in "$TARGET_DIR"/*; do
  # Skip if not a file
  [ -f "$img" ] || continue
  
  # Check file extension
  ext="${img##*.}"
  ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
  
  if [[ "$ext_lower" == "jpg" || "$ext_lower" == "jpeg" || "$ext_lower" == "png" ]]; then
    orig_size=$(wc -c < "$img")
    orig_kb=$((orig_size / 1024))
    
    echo "Processing: $(basename "$img") (${orig_kb} KB)"
    
    # Compress image: resize maximum dimension to 1000px and compress quality to 75%
    sips -Z 1000 -s formatOptions 75 "$img" --out "$img.tmp" &>/dev/null
    
    if [ -f "$img.tmp" ]; then
      mv "$img.tmp" "$img"
      new_size=$(wc -c < "$img")
      new_kb=$((new_size / 1024))
      saved=$((orig_kb - new_kb))
      echo "  -> Done! New size: ${new_kb} KB (Saved ${saved} KB)"
    else
      echo "  -> Failed to compress $(basename "$img")"
    fi
  fi
done

echo "=================================================="
echo "Compression complete!"
echo "=================================================="
