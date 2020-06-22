import pandas as pd
from sklearn.decomposition import TruncatedSVD
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OrdinalEncoder, OneHotEncoder
from sklearn.pipeline import Pipeline


def reduce(data: pd.DataFrame) -> pd.DataFrame:

    df = data.copy()
    df.drop([
        'latitude',
        'longitude',
        'num_bathrooms',
        'num_bedrooms',
        'num_recepts',
        'num_floors',
        'property_type',
        'furnished_state',
        'category',
        'area_name',
        'district',
        'shared_occupancy',
        'details_url'], axis=1, inplace=True)
    print(df.columns)
    # df['shared_occupancy'] = df['shared_occupancy'].map({'N': 0, 'Y': 1})

    # Let's create our pipelines

    cat_columns = ['postcode']
    cat_pipeline = Pipeline(steps=[
        ('encoder', OneHotEncoder(handle_unknown='ignore'))])

    # hier_columns = ['furnished_state']
    # hier_pipeline = Pipeline(steps=[
    #     ('encoder', OrdinalEncoder())])

    # And put all those pipelines inside a ColumnTransformer
    # preprocessor = ColumnTransformer(transformers=[
    #     ('cat', cat_pipeline, cat_columns)])

    model = Pipeline(
        [
            ('encoder', OneHotEncoder(handle_unknown='ignore')),
            # ('pca' , TruncatedSVD(n_components=2, random_state=123))
        ]
    )

    prices = df['monthly_rental_price'].values
    df.drop('monthly_rental_price', axis=1, inplace=True)
    print(df.columns)
    new_df = pd.DataFrame(
        model.fit_transform(df)
    )

    print(new_df)

    new_df['monthly_rental_price'] = prices

    return new_df
