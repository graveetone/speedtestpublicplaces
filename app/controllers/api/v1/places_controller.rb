class Api::V1::PlacesController < Api::V1::BaseController
    def index
        places = if strong_params[:search_term]
            Place.search(strong_params[:search_term])
        else
            Place.all
        end
        
        places = places.map do |place|
                {
                    name: place.name,
                    city: place.city,
                    address: place.address,
                    most_recent_download_speed: place.most_recent_download_speed,
                    most_recent_download_speed_units: place.most_recent_download_speed_units,
                    number_of_measurements: place.number_of_measurements
                }
        end

        render json: { places: places }
    end

    def strong_params
        params.permit(:search_term)
    end
end
