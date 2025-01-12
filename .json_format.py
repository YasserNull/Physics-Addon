# python3 .json_format.py /sdcard/folder
import os
import json
import sys

def format_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        try:
            data = json.load(file)
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=4, ensure_ascii=False)
            print(f"Formatted: {file_path}")
        except json.JSONDecodeError:
            print(f"Error: Invalid JSON in {file_path}")

def format_json_files_in_folder(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith('.json'):
                file_path = os.path.join(root, file)
                format_json(file_path)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Please provide the folder path as an argument.")
    else:
        folder_path = sys.argv[1]
        format_json_files_in_folder(folder_path)
