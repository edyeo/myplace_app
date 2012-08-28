class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :place_name
      t.string :location

      t.timestamps
    end
    add_index :places, [:place_name, :created_at]
  end
end
