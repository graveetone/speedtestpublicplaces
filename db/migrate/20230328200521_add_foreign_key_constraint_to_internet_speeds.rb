class AddForeignKeyConstraintToInternetSpeeds < ActiveRecord::Migration[7.0]
  def change
      change_table :internet_speeds do |t|
        t.remove_foreign_key :places
        t.foreign_key :places, on_delete: :cascade
      end
  end
end
