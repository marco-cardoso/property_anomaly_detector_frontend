import re
from os import path

from geopy.distance import great_circle
import pandas as pd
import numpy as np


import property_anomaly_detector


def convert_price(x):
    if x['payment_interval'] == 'pw':
        return x['price'] * 4
    else:
        return x['price']


def get_districts_city(df: pd.DataFrame):
    root_path = path.dirname(property_anomaly_detector.__file__)

    maping_df_path = path.join(root_path, "datasets", "uk_postcodes", "postcodes.csv")
    maping_df = pd.read_csv(maping_df_path).iloc[:, 1:3]

    df['district_code'] = df['district'].str.replace("[0-9]", "")

    df = df.merge(maping_df, left_on="district_code", right_on="postcode")

    del df['district_code']
    return df


def convert_df(df: pd.DataFrame):
    regex = r"""
        (flat|
        house|
        farm\sland|
        plot|
        apartment|
        equestrian|
        sheltered\shousing|
        lodge|
        triplex|
        gite|
        private\shalls|
        maisonette|
        finca|
        barn|
        property|
        chalet|
        bungalow|
        Land|
        duplex|
        cottage|
        garage|
        parking|
        private\shalls)
    """
    regex = re.compile(regex, re.VERBOSE)

    df['title'] = df['title'].str.lower()
    df['type'] = df['title'].str.extract(regex)
    df['share'] = df['title'].str.contains(r'share')
    df['bedrooms'] = df['title'].str.extract(r"(\d{1,2})")

    df['nearest_station_distance'] = df['stations'].astype(str).str.extract(r"(\d\.?\d?)").astype(float)
    df['payment_interval'] = df['price'].str.split(" ").str.get(-1)

    # Cleaning the payment interval name, since some values have the ")" character
    df['payment_interval'] = df['payment_interval'].apply(lambda x: x.replace(")", ""))

    df['price'] = df['price'].str.split("£").str.get(1).str.split(" ").str.get(0).str.replace(",", "").astype(
        np.float32)

    # df['furnished'] = df['letting'].astype(str).str.extract(r"(:'.*')")
    # df['furnished'] = df['furnished'].str.replace('\W', '')
    # london_districts = gpd.read_file("london.geojson")
    # london_districts['centroid_x'] = london_districts.geometry.centroid.x
    # london_districts['centroid_y'] = london_districts.geometry.centroid.y
    # properties_geo = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.longitude, df.latitude), crs=london_districts.crs)
    # df = gpd.sjoin(london_districts, properties_geo)

    # df = df.reset_index()

    if ("latitude" in df) and ("longitude" in df):
        df[['latitude', 'longitude']] = df[['latitude', 'longitude']].astype(np.float)

        london = (51.564383, -0.124205)
        manchester = (53.474934, -2.383681)

        df['london_distance'] = df[['latitude', 'longitude']].apply(
            lambda x: great_circle(london, (x.latitude, x.longitude)).kilometers, axis=1)

        df['manchester_distance'] = df[['latitude', 'longitude']].apply(
            lambda x: great_circle(manchester, (x.latitude, x.longitude)).kilometers, axis=1)

    df['monthly_price'] = df.apply(convert_price, axis=1)

    df.drop(['title', 'stations'], axis=1, inplace=True)
    return df
