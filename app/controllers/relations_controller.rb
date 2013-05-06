class RelationsController < ApplicationController
  respond_to :json

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
    params[:relation][:actors] = Actor.find(params[:relation][:actors].map {|a| a[:id] })
    respond_with Relation.create(params[:relation])
  end

  def update
    respond_with Relation.update(params[:id], params[:relation])
  end

  def destroy
    respond_with Relation.destroy(params[:id])
  end
end
