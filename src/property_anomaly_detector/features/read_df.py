import pandas as pd
from property_anomaly_detector.database import Database
from property_anomaly_detector.features import feature_engineer

database = Database("zoopla")


def read_df():
    properties = database.get_properties(
        default_projection={
            '_id': -1,
            'rental_prices.shared_occupancy' : 1,
            'num_floors' : 1,
            'num_bedrooms' : 1,
            'num_bathrooms' : 1,
            'furnished_state' : 1,
            'category' : 1,
            'property_type' : 1,
            'num_recepts' : 1,
            'latitude': 1,
            'longitude': 1,
            'rental_prices.per_month': 1,
            'outcode': 1

        }
    )

    df = pd.DataFrame(properties)
    del df['_id']

    df['monthly_rental_price'] = df['rental_prices'].apply(lambda x: x['per_month'])
    df['shared_occupancy'] = df['rental_prices'].apply(lambda x: x['shared_occupancy'])

    del df['rental_prices']

    numerical_columns = [
        'monthly_rental_price',
        'num_floors',
        'num_bedrooms',
        'num_bathrooms',
        'num_recepts',
        'latitude',
        'longitude'
    ]

    df[numerical_columns] = df[numerical_columns].astype(float)

    df.rename(columns={
        'rental_prices': 'monthly_rental_price',
        'outcode': 'district'
    }, inplace=True)

    df = feature_engineer.get_districts_city(df)
    return df



