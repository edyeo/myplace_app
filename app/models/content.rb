class Content < ActiveRecord::Base
  attr_accessible :place_id, :story, :user_id, :photo, :photo_file_name
  
  #paperclip
  has_attached_file :photo,:styles => {:thumb=> "100x100#",:small  => "200x135>" },
   :path => ":rails_root/assets/images/attachments/place_id/:place_id/resources/:basename_:style.:extension",
   :url => "/attachments/place_id/:place_id/resources/:basename_:style.:extension"
  
  belongs_to :user
  belongs_to :place
  
  validates :user_id, presence: true
  validates :place_id, presence: true
  validates :story, presence: true
 
  default_scope order: 'contents.created_at DESC'
end
