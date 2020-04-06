from configs import database_name, database_host, database_port

from pymongo import MongoClient


class Database():
    
    def __init__(self):
        self.client = MongoClient(database_host, database_port)
        self.database = self.client[database_name]
        self.properties = self.database['properties']
        
    def get_properties(self):
        return list(self.properties.find({},
                                         {
                                             'title' : 1,
                                             'letting.Furnishing:' : 1,
                                             'price' : 1, 
                                             'latitude' : 1,
                                             'longitude' : 1,
                                             'url' : 1,
                                             'stations' : 1
                                         }
                                        ))
          
database = Database()
