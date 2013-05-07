FactoryGirl.define do
  factory :relation do
    sequence(:name) {|n| "Awesome Relation #{n}"}
    association :social_network
  end
end
