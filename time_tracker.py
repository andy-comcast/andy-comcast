# time_tracker.py

import tkinter as tk
from datetime import datetime
import requests # For Notion API

# Contants
NOTION_API_KEY = "your-api-key"
DATABASE_ID = "your-database-id"

# Basic structure
def setup_api_headers():
    return {
        "Authorization": f"Bearer {NOTION_API_KEY}",
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
    }

def main():
    print("Time Tracker Started")
    setup_api_headers()

if __name__ == "__main__":
    main()