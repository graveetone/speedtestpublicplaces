class AddInternetSpeedsTable < ActiveRecord::Migration[7.0]
  def change
    create_table :internet_speeds, id: :uuid do |t|
      t.decimal :download_speed, precision: 15, scale: 2, null: false
      t.string :download_units, null: false, index: true
      t.references :place, null: false, foreign_key: true, type: :uuid
    end
  end
end
