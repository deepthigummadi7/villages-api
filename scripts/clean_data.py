import pandas as pd
import os

folder_path = "data-processing/raw-data"
all_data = []

# Read all Excel files (.xls and .xlsx)
for file in os.listdir(folder_path):
    if file.endswith(".xls") or file.endswith(".xlsx"):
        file_path = os.path.join(folder_path, file)
        print("Reading:", file)
        df = pd.read_excel(file_path)
        all_data.append(df)

# Combine all files
df = pd.concat(all_data, ignore_index=True)
print(f"\nOriginal rows: {len(df)}")

# Check nulls BEFORE dropping
print("\nNull values per column:")
print(df.isnull().sum())

# Drop duplicates
df = df.drop_duplicates()

# Drop rows with missing key name fields
df = df.dropna(subset=[
    "STATE NAME",
    "DISTRICT NAME",
    "SUB-DISTRICT NAME",
    "Area Name"
])

print(f"\nAfter cleaning: {len(df)} rows")

# Check duplicate village codes
dupe_codes = df["MDDS PLCN"].duplicated().sum()
print(f"Duplicate village codes: {dupe_codes}")

# Normalize name columns
df["STATE NAME"]        = df["STATE NAME"].str.title().str.strip()
df["DISTRICT NAME"]     = df["DISTRICT NAME"].str.title().str.strip()
df["SUB-DISTRICT NAME"] = df["SUB-DISTRICT NAME"].str.title().str.strip()
df["Area Name"]         = df["Area Name"].str.title().str.strip()

# Clean code columns
df["MDDS STC"]    = df["MDDS STC"].astype(str).str.strip()
df["MDDS DTC"]    = df["MDDS DTC"].astype(str).str.strip()
df["MDDS Sub_DT"] = df["MDDS Sub_DT"].astype(str).str.strip()
df["MDDS PLCN"]   = df["MDDS PLCN"].astype(str).str.strip()

# Save output
df.to_csv("cleaned_villages.csv", index=False)
print("\nCleaned data saved to cleaned_villages.csv")

# Final summary
print("\n=== Summary ===")
print(f"Total rows:       {len(df):,}")
print(f"Unique states:    {df['MDDS STC'].nunique()}")
print(f"Unique districts: {df['MDDS DTC'].nunique()}")
print(f"Unique sub-dists: {df['MDDS Sub_DT'].nunique()}")
print(f"Unique villages:  {df['MDDS PLCN'].nunique()}")