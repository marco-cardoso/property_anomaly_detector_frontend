import concurrent.futures as cf
import time
from functools import partial

from requests import exceptions
from property_anomaly_detector.database import Database
from property_anomaly_detector.scraper.req import Requests

database = Database()
requests = Requests()


def save_properties_informations(paths: list, district: str):
    with cf.ThreadPoolExecutor(max_workers=50) as executor:
        f = partial(requests.get_property_information, district, )
        results = executor.map(f, paths)

        outputs = []
        try:
            for i in results:
                outputs.append(i)
        except cf._base.TimeoutError:
            print("TIMEOUT")


def scrap():
    database.remove_districts()
    for district_nb in range(2414, 3000):

        # Get the first page properties
        amt_properties_per_page = 24
        index = 0

        soup = requests.get_properties(district_nb, index)

        anchors = soup.find_all("a", {"class": "propertyCard-link"})
        unique_links = set([a.attrs['href'] for a in anchors])

        try:
            district = soup.find("h1", {"data-test": "header-title"}).text.split(",")[0].split()[-1]
        except AttributeError:
            print(f"{district_nb} has no districts ! Skipping ... ")
            continue

        amt_district_properties = soup.find("span", {"class": "searchHeader-resultCount"}).text.replace(",", "")

        # save the district properties
        database.insert_district({
            'district_number': district_nb,
            'district_code': district,
            'district_properties_amt': amt_district_properties
        })

        if int(amt_district_properties) == 0:
            continue

        print(f" DISTRICT {district_nb} - {district} | {amt_district_properties} properties available")

        # iterate through the other pages
        idxs = range(
            index + amt_properties_per_page,
            int(amt_district_properties) + amt_properties_per_page,
            amt_properties_per_page
        )

        for idx in idxs:

            soup = requests.get_properties(district_nb, idx)

            anchors = soup.find_all("a", {"class": "propertyCard-link"})
            links = set([a.attrs['href'] for a in anchors])
            unique_links = unique_links.union(links)

        # Remove null values
        try:
            unique_links.remove("")
        except KeyError:
            # It means the set has no null values
            pass

        print(f" DISTRICT {district_nb} - {district} | {len(unique_links)} urls")

        print(f"{district_nb} - {district} - Downloading the properties details...")
        save_properties_informations(list(unique_links), district)
        print(f"{district_nb} - {district} - Downloading the properties details...DONE")


if __name__ == "__main__":
    scrap()
