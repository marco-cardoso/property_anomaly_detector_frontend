from os import path

import pandas as pd


def download_postcodes():
    uk_cities_postcodes = "https://en.wikipedia.org/wiki/List_of_postcode_areas_in_the_United_Kingdom"

    postcodes_tables = pd.read_html(uk_cities_postcodes)
    postcode_table = postcodes_tables[0]

    print("Saving the postcodes....")
    output_path = path.join("..", "datasets", "uk_postcodes", f"postcodes.csv")
    postcode_table.to_csv(output_path)
    print("Saving the postcodes....DONE")

    cities_postcodes = postcode_table.iloc[:, 0]
    cities_postcodes.apply(download_postcode_districts)


def download_postcode_districts(postcode: str):
    uk_postcode_districts = f"https://en.wikipedia.org/wiki/{postcode}_postcode_area"
    postcode_districts = pd.read_html(uk_postcode_districts)[1]

    print(f"Saving {postcode} district codes...")
    output_path = path.join("..", "datasets", "uk_postcodes", f"{postcode}.csv")
    postcode_districts.to_csv(output_path)
    print(f"Saving {postcode} district codes...DONE")


if __name__ == "__main__":
    download_postcodes()
