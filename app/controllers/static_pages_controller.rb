class StaticPagesController < ApplicationController
  def home
    if signed_in?
      @micropost = current_user.microposts.build if signed_in?
      @feed_items = current_user.feed.paginate(page: params[:page])
      @my_places_contents = current_user.contents
      @my_places_group_by_place_id = current_user.contents.group(:place_id)
      @places = Place.all
    end
  end

  def help
  end

  def about
  end

  def contact
  end

end
