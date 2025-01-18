import pandas as pd

# Input dictionary in the provided format
data = [
    "{AnyCompany Financial Services, LLC.ORGANIZATION}",
    "{July 31st,DA Wei,PERSON}",
    "{24.53,QUANTITY}",
    "{XXXXX0000,OTHER}",
    "{John,PE 00-1111-0008,OTHER}",
    "{XXXXXX1111,OTHER}",
    "{niketan,firstname}",
    "{mayuresh,firstname}",
    "{john,lastname}"
]

# Function to parse the input data
def parse_data(data_list):
    parsed_data = {}
    for entry in data_list:
        # Remove curly braces and split by commas
        cleaned_entry = entry.strip("{}")
        values = cleaned_entry.split(",")
        
        # Last item is the key, the rest are values
        key = values[-1]
        value = values[:-1]
        
        # Add the values to the corresponding key
        if key not in parsed_data:
            parsed_data[key] = []
        parsed_data[key].extend(value)
    
    return parsed_data

# Parse the input data
parsed_dict = parse_data(data)

# Find the maximum length of the columns to ensure even length in rows
max_length = max(len(values) for values in parsed_dict.values())

# Fill in missing values with empty strings to match the maximum length
for key in parsed_dict:
    while len(parsed_dict[key]) < max_length:
        parsed_dict[key].append('')

# Convert the parsed dictionary into a pandas DataFrame
df = pd.DataFrame(parsed_dict)
print(parsed_dict)
# Save the DataFrame to an Excel file
output_file = "output.xlsx"
df.to_excel(output_file, index=False)

print(f"Data has been successfully written to {output_file}")
