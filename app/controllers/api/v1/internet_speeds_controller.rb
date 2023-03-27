class Api::V1::InternetSpeedsController < Api::V1::BaseController
    def create
        place = Place.create!(
            name: params[:place_name],
            address: params[:place_address],
            city: params[:place_city],
        )

        internet_speed = InternetSpeed.create!(
            download_speed: params[:download_speed],
            download_units: params[:download_units],
            place: place
        )
        render json: {}, status: :created
    end
end
