import requests
from bs4 import BeautifulSoup
import pandas as pd

# Step 1: Set the URL for CNN's Tech section
url = 'https://edition.cnn.com/tech'

# Step 2: Send a request to fetch the HTML content of the webpage
response = requests.get(url)

# Step 3: Parse the page content using BeautifulSoup
soup = BeautifulSoup(response.text, 'html.parser')
tech_section = soup.find('div', {'data-uri': 'cms.cnn.com/_components/zone/instances/cl8ak0wox00155iqicy9s4rb5@published'})  # Replace with the actual section ID or class

# Step 4: Find all headline elements
# Look for both <h3> and <span> tags that contain headline text
headlines = tech_section.find_all(['h3', 'span'], class_='container__headline-text')

# Step 5: Extract and clean the headlines
extracted_headlines = []
for headline in headlines:
    extracted_headlines.append(headline.get_text(strip=True))

# Step 6: Check if headlines were found
if not extracted_headlines:
    print("No headlines found. Check the website structure or class names.")
else:
    print("Latest Tech Headlines from CNN:")
    for index, headline in enumerate(extracted_headlines, 1):
        print(f"{index}. {headline}")

    # Step 7: Save the headlines to a CSV file
    df = pd.DataFrame(extracted_headlines, columns=["Headlines"])
    df.to_csv('Day 4 - Web Scraper/tech_headlines.csv', index=False)
    df.to_html('Day 4 - Web Scraper/headlines.html')
    print("\nHeadlines saved to 'tech_headlines.csv'.")
