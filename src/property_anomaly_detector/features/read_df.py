import pandas as pd
from property_anomaly_detector.database import Database
from property_anomaly_detector.features import feature_engineer

database = Database("zoopla")


def read_df():
    properties = database.get_properties(
        default_projection={
            '_id': -1,
            'latitude': 1,
            'longitude': 1,
            'rental_prices.per_month': 1,
            'outcode': 1

        }
    )

    df = pd.DataFrame(properties, columns=['latitude', 'longitude', 'rental_prices', 'outcode'])
    df['rental_prices'] = pd.to_numeric(df['rental_prices'].apply(lambda x: x['per_month']))

    df.rename(columns={
        'rental_prices': 'monthly_rental_price',
        'outcode': 'district'
    }, inplace=True)

    df = feature_engineer.get_districts_city(df)
    return df



