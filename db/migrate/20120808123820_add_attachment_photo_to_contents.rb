class AddAttachmentPhotoToContents < ActiveRecord::Migration

  #add_column :contents, :photo_file_name, :string
  #add_column :contents, :photo_content_type, :string
  #add_column :contents, :photo_file_size, :integer

  def self.up
    change_table :contents do |t|
      t.has_attached_file :photo
    end
  end

  def self.down
    drop_attached_file :contents, :photo
  end
end
