class ContentsController < ApplicationController
  # GET /contents
  # GET /contents.json
  def index
    @contents = Content.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @contents }
    end
  end

  # GET /contents/1
  # GET /contents/1.json
  def show
    @content = Content.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @content }
      format.js {
        @place = Place.find(params[:place_id])
        @contents = @place.contents
      }
    end
  end

  # GET /contents/new
  # GET /contents/new.json
  def new
    @content = Content.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @content }
      format.js {
        @place = Place.find(params[:place_id]);
        @place_id = params[:place_id];
        @place_name = @place.place
      }
    end
  end

  # GET /contents/1/edit
  def edit
    @content = Content.find(params[:id])
  end

  # POST /contents
  # POST /contents.json
  def create
    @content = current_user.contents.build(params[:content])
    if @content.save
      flash[:success] = "Content created!"
      redirect_to root_path
    else
      @content_items = []
      render 'static_pages/home'
    end
  end

  # PUT /contents/1
  # PUT /contents/1.json
  def update
    @content = Content.find(params[:id])

    respond_to do |format|
      if @content.update_attributes(params[:content])
        format.html { redirect_to @content, notice: 'Content was successfully updated.' }
        format.json { head :no_content }
        format.js
      else
        format.html { render action: "edit" }
        format.json { render json: @content.errors, status: :unprocessable_entity }
        format.js
      end
    end
  end

  # DELETE /contents/1
  # DELETE /contents/1.json
  def destroy
    @content = Content.find(params[:id])
    @content.destroy

    respond_to do |format|
      format.html { redirect_to contents_url }
      format.json { head :no_content }
      format.js
    end
  end

  def modal
    respond_to do |format|
      format.js {
        @users = User.all;
        @place = Place.find(params[:place_id]);
        @place_id = params[:place_id];
        @place_name = @place.place
        @contents = @place.contents.limit(14);
      }
    end
  end
end
