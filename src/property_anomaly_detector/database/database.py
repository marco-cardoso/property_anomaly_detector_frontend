from property_anomaly_detector.database.configs import database_host, database_port

from pymongo import MongoClient


class Database:
    DEFAULT_PROPS_PROJ = {
        'title': 1,
        'price': 1,
        'stations': 1,
        'district': 1,
        'latitude': 1,
        'longitude': 1
    }

    def __init__(self, database_name: str) -> None:
        """
        Database constructor
        :param database_name: A string with the database_name
        """
        self.client = MongoClient(database_host, database_port)

        database = self.client[database_name]

        self.properties = database['properties']
        self.links = database['links']
        self.districts = database['districts']
        self.errors = database["errors"]

    def insert_property(self, property: dict):
        self.properties.insert(property)

    def save_error(self, link: str):
        self.errors.insert({
            'link': link
        })

    def insert_district(self, district: dict):
        self.districts.insert(district)

    def remove_districts(self):
        self.districts.remove({})

    def get_properties(self, default_projection=DEFAULT_PROPS_PROJ):
        return list(self.properties.find({}, default_projection))
