class Place < ApplicationRecord
    has_many :internet_speeds, dependent: :destroy

    def most_recent_download_speed
        # assume that all the units are the same
        internet_speeds.order(:created_at).last&.download_speed
    end

    def most_recent_download_speed_units
        internet_speeds.order(:created_at).last&.download_units
    end

    def number_of_measurements
        internet_speeds.count
    end

    def self.search(search_term)
        Place.where("name LIKE :search_term OR city LIKE :search_term", search_term: "%#{search_term}%")
    end
end