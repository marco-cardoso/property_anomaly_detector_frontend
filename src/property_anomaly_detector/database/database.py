from property_anomaly_detector.database.configs import database_host, database_name, database_port

from pymongo import MongoClient, DESCENDING


class Database():

    def __init__(self) -> None:
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
