class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper

  #for modal
  layout Proc.new { |controller| controller.request.xhr? ? nil : 'application' }
end
