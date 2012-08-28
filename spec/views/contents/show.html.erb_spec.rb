require 'spec_helper'

describe "contents/show" do
  before(:each) do
    @content = assign(:content, stub_model(Content,
      :user_id => 1,
      :place_id => 2,
      :picture => "Picture",
      :story => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    rendered.should match(/2/)
    rendered.should match(/Picture/)
    rendered.should match(/MyText/)
  end
end
