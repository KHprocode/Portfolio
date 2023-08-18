import requests
from bs4 import BeautifulSoup

def scrape_featured_article(url):
    # Send a GET request to the URL
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code != 200:
        print("Failed to fetch the webpage")
        return
    
    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Print the HTML content to inspect the structure
    print(soup.prettify())

# URL of Wikipedia's "Today's featured article" page
url = 'https://en.wikipedia.org/wiki/Wikipedia:Today%27s_featured_article'
scrape_featured_article(url)
