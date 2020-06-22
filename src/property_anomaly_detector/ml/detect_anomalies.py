import pandas as pd
import numpy as np
from sklearn.neighbors.lof import LocalOutlierFactor
from sklearn.ensemble import IsolationForest

from pyod.models.knn import KNN
from pyod.models.hbos import HBOS
from pyod.models.cof import COF
from pyod.models.cblof import CBLOF

from property_anomaly_detector.features import read_df
from property_anomaly_detector.features.reduce_dimensionality import reduce


def preprocess(df: pd.DataFrame):
    return df


# def detect(contamination=0.1, n_neighbors=20):
#     df = read_df.read_df()
#     df, data = preprocess(df)
#
#     lf = LocalOutlierFactor(novelty=False, contamination=contamination, n_neighbors=n_neighbors)
#
#     # print(data.columns)
#     predictions = lf.fit_predict(data)
#     outliers = df[(predictions == -1)]
#
#     postcode_median_price = df.groupby("postcode")['monthly_rental_price'].apply(np.median)
#     district_median_price = df.groupby("district")['monthly_rental_price'].apply(np.median)
#
#     outliers = outliers.merge(postcode_median_price, left_on="postcode", right_index=True)
#     outliers.rename({'monthly_rental_price_y': "postcode_median_price"}, axis=1, inplace=True)
#
#     outliers = outliers.merge(district_median_price, left_on="district", right_index=True)
#     outliers.rename({'monthly_rental_price': "district_median_price"}, axis=1, inplace=True)
#
#     return outliers, df

def detect(contamination=0.1, n_neighbors=20):
    df = read_df.read_df()
    df = preprocess(df)

    # df = df.query("(shared_occupancy == 'Y') ")
    df['shared_occupancy'] = df['shared_occupancy'].map({'Y': 1, 'N': 0})

    cum_sum = df['district'].value_counts(normalize=True).cumsum()
    mask = cum_sum < 0.99

    df = df[df['district'].isin(cum_sum[mask].index.values)]

    cum_sum = df['property_type'].value_counts(normalize=True).cumsum()
    mask = cum_sum < 0.99

    df = df[df['property_type'].isin(cum_sum[mask].index.values)]

    # postcode_median_price = df.groupby("postcode")['monthly_rental_price'].apply(np.median)
    # district_median_price = df.groupby("district")['monthly_rental_price'].apply(np.median)
    #
    # df.rename({'monthly_rental_price': 'price'}, inplace=True, axis=1)
    #
    # df = df.merge(postcode_median_price, left_on="postcode", right_index=True, )
    # df.rename({'monthly_rental_price': "postcode_median_price"}, axis=1, inplace=True)
    #
    # df = df.merge(district_median_price, left_on="district", right_index=True)
    # df.rename({'monthly_rental_price': "district_median_price"}, axis=1, inplace=True)
    #
    # df['diff_postcode'] = np.abs(df['price'] - df['postcode_median_price'])
    # df['diff_district'] = np.abs(df['price'] - df['district_median_price'])
    #
    # diff = df['price'] - df['postcode_median_price']
    # diff = [-5 * value if value < 0 else value for value in diff]
    #
    # df['lower_power'] = diff
    #
    # df['diff_avg'] = (df['diff_postcode'] + df['diff_district']) / 2

    print(df.columns)

    data = df.drop(
        [
            # 'diff_postcode', 'diff_district',
            # 'postcode_median_price',
            # 'district_median_price',
            # 'latitude',
            # 'longitude',
            'num_bathrooms',
            'num_bedrooms',
            'num_recepts',
            'num_floors',
            'property_type',
            # 'monthly_rental_price',
            # 'price',
            'furnished_state',
            'category',
            'area_name',
            'postcode',
            'district',
            # 'shared_occupancy',
            'details_url'
        ], axis=1, errors="ignore"
    )

    data[['latitude', 'longitude', 'monthly_rental_price']] = data[
        ['latitude', 'longitude', 'monthly_rental_price']].apply(
        lambda x: (x - np.min(x)) / (np.max(x) - np.min(x)), axis=1)

    # print(len(data))
    data = pd.get_dummies(data)

    print(data.columns)

    # lf = LocalOutlierFactor(novelty=False, contamination=contamination, n_neighbors=n_neighbors)
    #
    # # print(data.columns)
    # predictions = lf.fit_predict(data)

    clf = KNN(n_neighbors=50, contamination=0.03, method="mean")
    clf.fit(data)

    df['decision_scores'] = clf.decision_scores_
    outliers = df[(clf.labels_ == 1)]

    return outliers
