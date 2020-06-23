from os import path

import numpy as np
import pandas as pd
import geopandas as gpd

import matplotlib.pyplot as plt

import property_anomaly_detector


def get_london_geojson() -> gpd.GeoDataFrame:
    root_path = path.dirname(property_anomaly_detector.__file__)
    geojson_path = path.join(root_path, "datasets", "london.geojson")
    london = gpd.read_file(geojson_path)
    return london


def get_properties_gdf(df: pd.DataFrame) -> gpd.GeoDataFrame:
    properties_gpd = gpd.GeoDataFrame(
        df[['latitude', 'longitude', 'monthly_rental_price']],
        geometry=gpd.points_from_xy(df['longitude'], df['latitude'])
    )

    return properties_gpd


def plot_london_layer():
    ax = london.plot()
    ax.set_axis_off()
    return ax


def plot_properties_layer(df: pd.DataFrame, axis):
    properties_gpd = get_properties_gdf(df)
    properties_gpd.plot(ax=axis, color='red', marker=1)
    plt.show()


def plot_median_district_layer(df: pd.DataFrame):
    properties_gdf = get_properties_gdf(df)

    join = gpd.sjoin(london, properties_gdf, how="inner")

    district_median_price = join.groupby(['name'], as_index=False).agg(
        {'monthly_rental_price': np.median, 'geometry': 'first'})

    district_median_price = gpd.GeoDataFrame(
        district_median_price[['name', 'monthly_rental_price']],
        geometry=district_median_price['geometry']
    )

    # ax = district_median_price.plot( alpha=0.5, edgecolor='k')
    ax = district_median_price.plot(
        "monthly_rental_price", figsize=(20, 7), alpha=0.8,
        edgecolor='k',
        legend=True,
        legend_kwds={
            "label": "Monthly median rental price"
        },
        cmap="plasma"
    )
    ax.set_axis_off()


london = get_london_geojson()
