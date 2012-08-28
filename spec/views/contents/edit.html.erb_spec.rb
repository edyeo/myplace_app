require 'spec_helper'

describe "contents/edit" do
  before(:each) do
    @content = assign(:content, stub_model(Content,
      :user_id => 1,
      :place_id => 1,
      :picture => "MyString",
      :story => "MyText"
    ))
  end

  it "renders the edit content form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => contents_path(@content), :method => "post" do
      assert_select "input#content_user_id", :name => "content[user_id]"
      assert_select "input#content_place_id", :name => "content[place_id]"
      assert_select "input#content_picture", :name => "content[picture]"
      assert_select "textarea#content_story", :name => "content[story]"
    end
  end
end
