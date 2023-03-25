require 'faker'

puts 'Resetting database...'
InternetSpeed.delete_all
Place.delete_all
puts 'Database is clear!'

puts 'Seeding places'
5.times do
    Place.create(
        name: Faker::Company.name,
        address: Faker::Address.street_address,
        city: Faker::Address.city
    )
end
puts 'Places are created'

puts 'Seeding internet speeds'
5.times do
    InternetSpeed.create(
        place_id: Place.all.ids.sample,
        download_speed: Faker::Number.decimal(l_digits:2, r_digits:2),
        download_units: 'mbps'
    )
end
puts 'Internet speeds created!'