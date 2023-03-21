require "test_helper"

class Api::V1::PlacesControllerTest < ActionDispatch::IntegrationTest
  test "returns filtered places if search term is empty" do
    
    place = FactoryBot.create(:place)

    get '/api/v1/places?search_term='
    parsed_body = JSON.parse(response.body)
    
    expected_body = (
      {
        places: [
          {
            name: place.name,
            address: place.address,
            city: place.city,
            most_recent_download_speed: place.most_recent_download_speed,
            most_recent_download_speed_units: place.most_recent_download_speed_units,
            number_of_measurements: place.number_of_measurements
          }.stringify_keys
        ]
      }.stringify_keys
    )
    
    assert_equal expected_body, parsed_body
  end

  test "returns filtered places if search term is present" do
    
    place1 = FactoryBot.create(:place, name: 'Starbucks')
    place2 = FactoryBot.create(:place, name: 'Local Coffee Shop')

    get '/api/v1/places?search_term=Star'
    parsed_body = JSON.parse(response.body)
    
    expected_body = (
      {
        places: [
          {
            name: place1.name,
            address: place1.address,
            city: place1.city,
            most_recent_download_speed: place1.most_recent_download_speed,
            most_recent_download_speed_units: place1.most_recent_download_speed_units,
            number_of_measurements: place1.number_of_measurements
          }.stringify_keys
        ]
      }.stringify_keys
    )
    
    assert_equal expected_body, parsed_body
  end

  test "returns no places if search term is present but does not match any place" do
    
    FactoryBot.create(:place, name: 'Starbucks')

    get '/api/v1/places?search_term=Aro'
    parsed_body = JSON.parse(response.body)
    
    expected_body = (
      {
        places: []
      }.stringify_keys
    )

    assert_equal expected_body, parsed_body
  end
end
