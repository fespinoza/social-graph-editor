FactoryGirl.define do
  factory :actor do
    sequence(:name) {|n| "Awesome Actor #{n}"}
    x 100
    y 200
    association :social_network
  end
end
