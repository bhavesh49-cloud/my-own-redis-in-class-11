data = {}

def set_data(key, value, expiry_seconds=0):
    data[key] = value
    print(f"Saved {key} - will auto delete after {expiry_seconds}s if set")

def get_data(key):
    if key in data:
        print(f"Found in RAM (FAST) - {data[key]}")
        return data[key]
    else:
        print("Not in RAM (MISS) - Go to main Database (SLOW)")
        return None

# Your examples from notes
set_data("product:all", "[{}, {}]")
set_data("otp:98989898", "342324", 180)
set_data("session:abcd123", "userid 4")

get_data("product:all")
