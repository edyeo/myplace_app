class Place < ActiveRecord::Base
  attr_accessible :location, :place
  
  has_many :contents, foreign_key: "place_id", dependent: :destroy
  
  validates :location, presence: true
  validates :place, presence: true
  
    default_scope order: 'places.created_at DESC'
end
