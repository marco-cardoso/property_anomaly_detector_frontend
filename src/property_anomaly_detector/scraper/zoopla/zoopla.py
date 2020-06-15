"""
    To use it you need to have a ZOOPLA API key.
"""
import logging
import os
from time import sleep

import pandas as pd
import requests as re
from property_anomaly_detector.database import Database

db = Database("zoopla")
API_KEY = os.environ['ZOOPLA_API']

LONDON_DISTRICTS = pd.read_csv(
    "../datasets/london_district_names.csv", usecols=['district_name']
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler("debug.log"),
        logging.StreamHandler()
    ]
)


def main():
    for district in LONDON_DISTRICTS.values:
        logging.info(f"Collecting {district[0]}  properties !")

        for i in range(0, 100):
            url = f"http://api.zoopla.co.uk/api/v1/property_listings.json?" \
                  f"area={district[0]}&listing_status=rent&page_size=100&page_number={i}&api_key={API_KEY}"

            response = re.get(url)
            if response.status_code == 200:

                properties = response.json()['listing']
                db.insert_properties(properties)
                logging.info(f"District : {district[0]}  | Page {i} | {len(properties)} properties successfully saved !")
            elif response.status_code == 400:
                logging.info(f"District : {district[0]}  | Page {i} | Something went wrong !!")
                break

            sleep(1)


if __name__ == "__main__":
    main()
