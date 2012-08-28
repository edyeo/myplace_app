class Place < ActiveRecord::Base
  attr_accessible :location, :place_name
  
  has_many :contents, foreign_key: "place_name_id", dependent: :destroy
  
  validates :location, presence: true
  validates :place_name, presence: true
  
    default_scope order: 'places.created_at DESC'
end
