from flask import Flask, request, jsonify

from property_anomaly_detector.database import Database

app = Flask(__name__)
db = Database("zoopla")


@app.route("/properties", methods=['GET'])
def get_properties():
    default_projection = {
        '_id': False,
        'rental_prices.shared_occupancy': 1,
        'num_floors': 1,
        'num_bedrooms': 1,
        'num_bathrooms': 1,
        'furnished_state': 1,
        'category': 1,
        'property_type': 1,
        'num_recepts': 1,
        'latitude': 1,
        'longitude': 1,
        'rental_prices.per_month': 1,
        'outcode': 1,
        'details_url': 1

    }

    # TODO remove the slicing below
    properties = db.get_properties(default_projection=default_projection)[:1000]
    return jsonify(properties)


@app.route("/anomalies", methods=['GET'])
def get_anomalies():
    pass


if __name__ == "__main__":
    app.run(
        host='0.0.0.0',
        debug=True
    )
