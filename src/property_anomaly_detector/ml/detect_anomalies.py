import numpy as np
from property_anomaly_detector.features import read_df
from pyod.models.knn import KNN


def detect(contamination=0.03, n_neighbors=50):
    df = read_df()

    df['shared_occupancy'] = df['shared_occupancy'].map({'Y': 1, 'N': 0})

    cum_sum = df['district'].value_counts(normalize=True).cumsum()
    mask = cum_sum < 0.99

    df = df[df['district'].isin(cum_sum[mask].index.values)]

    cum_sum = df['property_type'].value_counts(normalize=True).cumsum()
    mask = cum_sum < 0.99

    df = df[df['property_type'].isin(cum_sum[mask].index.values)]

    data = df[['latitude', 'longitude', 'monthly_rental_price']].copy()

    data[['latitude', 'longitude', 'monthly_rental_price']] = data[
        ['latitude', 'longitude', 'monthly_rental_price']].apply(
        lambda x: (x - np.min(x)) / (np.max(x) - np.min(x)), axis=1)

    clf = KNN(n_neighbors=n_neighbors, contamination=contamination, method="mean")
    clf.fit(data)

    df['decision_scores'] = clf.decision_scores_
    outliers = df[(clf.labels_ == 1)]

    return outliers
