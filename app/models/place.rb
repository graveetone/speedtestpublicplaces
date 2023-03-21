class Place < ApplicationRecord
    has_many :internet_speeds

    def most_recent_download_speed
        # assume that all the units are the same
        internet_speeds.order(:created_at).last.download_speed
    end

    def most_recent_download_speed_units
        internet_speeds.order(:created_at).last.download_units
    end

    def number_of_measurements
        internet_speeds.count
    end
end