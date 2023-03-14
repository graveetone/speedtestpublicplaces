# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts 'Resetting database...'
InternetSpeed.delete_all
Place.delete_all
puts 'Database is clear!'

puts 'Seeding places'

Place.create(
    [
        {
            name: 'Starbucks',
            address: '123 Jump Street',
            city: 'Los Angeles'
        },
        {
            name: 'Aroma Kava',
            address: 'Naukova Street',
            city: 'Lviv'
        }
    ]
)
puts 'Places are created'

puts 'Seeding internet speeds'

InternetSpeed.create(
    [
        {
            place_id: Place.first.id,
            download_speed: 28.45,
            download_units: 'mbps'
        },
        {
            place_id: Place.first.id,
            download_speed: 19.94,
            download_units: 'mbps'
        },
        {
            place_id: Place.last.id,
            download_speed: 29.67,
            download_units: 'mbps'
        }
    ]
)
puts 'Internet speeds created!'