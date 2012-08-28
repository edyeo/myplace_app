require 'spec_helper'

describe "contents/index" do
  before(:each) do
    assign(:contents, [
      stub_model(Content,
        :user_id => 1,
        :place_id => 2,
        :picture => "Picture",
        :story => "MyText"
      ),
      stub_model(Content,
        :user_id => 1,
        :place_id => 2,
        :picture => "Picture",
        :story => "MyText"
      )
    ])
  end

  it "renders a list of contents" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => "Picture".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
