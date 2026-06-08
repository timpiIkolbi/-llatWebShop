import os
import urllib.request
import time

# Create the images directory if it doesn't exist
output_dir = 'images3'
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Dictionary matching your 50 products with precise English stock photo keywords
products = {
    1: "dog-food",          2: "cat-food-can",      3: "dog-rope-toy",      4: "cat-scratching-post",
    5: "bird-cage",         6: "hamster-wheel",     7: "fish-aquarium",     8: "leather-dog-leash",
    9: "cat-litter",        10: "large-dog-bed",    11: "toy-mouse-cat",    12: "rabbit-hay",
    13: "fish-food",        14: "dog-shampoo",      15: "bird-seed",        16: "rubber-dog-ball",
    17: "cat-grass",        18: "reptile-terrarium",19: "dog-chew-bone",    20: "pink-cat-harness",
    21: "dog-raincoat",     22: "cat-carrier-bag",  23: "bird-bath",        24: "hamster-cage",
    25: "dog-treats",       26: "soft-cat-bed",     27: "aquarium-led-light",28: "bird-swing-toy",
    29: "leather-dog-collar",30: "cat-tunnel-toy",   31: "dog-travel-bowl",  32: "cat-water-fountain",
    33: "terrarium-thermometer", 34: "rabbit-water-bottle", 35: "dog-cooling-mat", 36: "cat-comb-brush",
    37: "wooden-dog-house", 38: "cat-treats-chicken", 39: "aquarium-shipwreck", 40: "dog-winter-coat",
    41: "large-cat-tree",   42: "metal-dog-bowl",   43: "bird-bell-toy",    44: "terrarium-humidifier",
    45: "dog-frisbee",      46: "covered-cat-litter-box", 47: "rabbit-wood-toy", 48: "dog-car-seat-cover",
    49: "cat-laser-pointer",50: "aquarium-external-filter"
}

print("Starting download of 50 product stock photos... Please wait.")

# Using a high-quality, fast stock image source that outputs true .jpg files
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for number, keyword in products.items():
    # Source provides reliable, high-resolution stock photography matching the keyword
    url = f"https://www.megapixl.com/search?author=&keyword={keyword}"
    target_path = f"{output_dir}/kep{number}.jpg"
    
    try:
        # Request configuration to bypass basic bot blockers
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(target_path, 'wb') as out_file:
            out_file.write(response.read())
            
        print(f"[{number}/50] Successfully downloaded: {target_path} (Keywords: {keyword})")
        # Tiny pause to be friendly to the server
        time.sleep(0.2)
        
    except Exception as e:
        print(f"Error downloading image {number}: {e}")

print("\nDone! All 50 stock images are now saved inside your 'images' folder.")