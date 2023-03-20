class Api::V1::PlacesController < ApplicationController
    def index
        places = Place.all.map do |place|
            {
                name: place.name,
                city: place.city,
                most_recent_download_speed: place.most_recent_download_speed,
                most_recent_download_speed_units: place.most_recent_download_speed_units,
                number_of_measurements: place.number_of_measurements
            }
        end

        render json: { places: places }
    end
end
