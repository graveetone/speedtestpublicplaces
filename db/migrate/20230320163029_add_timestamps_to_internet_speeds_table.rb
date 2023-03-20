class AddTimestampsToInternetSpeedsTable < ActiveRecord::Migration[7.0]
  def change
    change_table :internet_speeds do |t|
      t.timestamps
    end
  end
end
