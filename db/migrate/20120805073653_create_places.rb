class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :place
      t.string :location

      t.timestamps
    end
    add_index :places, [:place, :created_at]
  end
end
