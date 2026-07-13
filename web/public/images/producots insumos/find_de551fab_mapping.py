import os
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

log_path = r"C:\Users\MARCE\.gemini\antigravity\brain\de551fab-d672-4b96-bbe2-e19578caf719\.system_generated\logs\transcript.jsonl"
if os.path.exists(log_path):
    with open(log_path, "r", encoding="utf-8", errors="ignore") as f:
        for line_num, line in enumerate(f, 1):
            if "insumo_" in line and ("rename" in line.lower() or "copy" in line.lower() or "move" in line.lower() or "shutil" in line.lower() or "img_" in line.lower() or "mockdata" in line.lower()):
                print(f"Line {line_num}: {line[:250]}...")
else:
    print("Log not found")
