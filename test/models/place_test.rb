require "test_helper"

class PlaceTest < ActiveSupport::TestCase
    test 'recent upload speed, units and number of measurements are correct' do
        place = FactoryBot.create(:place)
        internet_speeds = FactoryBot.create_list(:internet_speed, 3, place: place)

        assert_equal internet_speeds.last.download_speed, place.most_recent_download_speed
        assert_equal internet_speeds.last.download_units, place.most_recent_download_speed_units
        assert_equal place.internet_speeds.count, place.number_of_measurements
    end
end
