"""
    To use it you need to have a ZOOPLA API key.
"""
import os
from time import sleep

import pandas as pd
import requests as re

API_KEY = os.environ['ZOOPLA_API']
LONDON_DISTRICTS = pd.read_csv(
    "../datasets/london_district_names.csv", usecols=['district_name']
)

print(LONDON_DISTRICTS)


def main():
    for district in LONDON_DISTRICTS:
        print(district)

        for i in range(1, 100):
            url = f"http://api.zoopla.co.uk/api/v1/property_listings.json?" \
                  f"area={district}&listing_status=rent&page_size=100&page_number={i}&api_key={API_KEY}"

            response = re.get(url)
            property = response.json()

            sleep(1)
    pass


if __name__ == "__main__":
    main()
