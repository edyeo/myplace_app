class CreateContents < ActiveRecord::Migration
  def change
    create_table :contents do |t|
      t.integer :user_id
      t.integer :place_id
      t.text :story
      t.timestamps
    end

  end
end
