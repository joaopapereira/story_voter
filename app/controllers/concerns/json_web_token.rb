require 'active_support/concern'

module JsonWebToken
  extend ActiveSupport::Concern
  included do

  end
  module ClassMethods
    def jwtEncode(payload, exp = 24.hours.from_now)
      payload[:exp] = exp.to_i
      JWT.encode(payload, Rails.application.secrets.secret_key_base)
    end

    def jwtDecode(token)
      body = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
      HashWithIndifferentAccess.new body
    rescue
      # we don't need to trow errors, just return nil if JWT is invalid or expired
      nil
    end
  end
end
