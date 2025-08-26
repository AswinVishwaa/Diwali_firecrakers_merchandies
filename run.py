import csv

def convert_txt_to_csv(input_file, output_file):
    """
    Convert a comma-separated text file to a proper CSV file
    
    Args:
        input_file (str): Path to the input .txt file
        output_file (str): Path to the output .csv file
    """
    try:
        with open(input_file, 'r', encoding='utf-8') as txt_file:
            # Read all lines from the text file
            lines = txt_file.readlines()
        
        with open(output_file, 'w', newline='', encoding='utf-8') as csv_file:
            writer = csv.writer(csv_file)
            
            for line in lines:
                # Strip whitespace and split by comma
                row = [field.strip() for field in line.strip().split(',')]
                writer.writerow(row)
        
        print(f"Successfully converted {input_file} to {output_file}")
        print(f"Total rows processed: {len(lines)}")
        
    except FileNotFoundError:
        print(f"Error: File '{input_file}' not found.")
    except Exception as e:
        print(f"Error occurred: {str(e)}")

# Usage
if __name__ == "__main__":
    # Replace these with your actual file paths
    input_txt_file = "firecracker_csv.txt"  # Your downloaded txt file
    output_csv_file = "firecracker_products.csv"  # Output CSV file
    
    convert_txt_to_csv(input_txt_file, output_csv_file)