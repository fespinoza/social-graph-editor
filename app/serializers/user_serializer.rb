class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :token
end
