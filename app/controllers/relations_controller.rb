class RelationsController < ApplicationController
  respond_to :json
  before_filter :get_actors, only: [:create, :update]

  def index
    # TODO: check security of this
    relations = if params[:ids]
                  Relation.find(params[:ids])
                else
                  Relation.all
                end
    respond_with relations
  end

  def show
    respond_with Relation.find(params[:id])
  end

  def create
    respond_with Relation.create(params[:relation])
  end

  def update
    respond_with Relation.update(params[:id], params[:relation])
  end

  def destroy
    respond_with Relation.destroy(params[:id])
  end

  private

  def get_actors
    if ids = params[:relation].delete(:actor_ids)
      params[:relation][:actors] = Actor.find(ids)
    end
  end
end
