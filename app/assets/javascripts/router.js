App.Router.map(function() {
  this.resource("user", function() {
    this.route("edit", { path: '/:user_id/edit' });
  });
  this.resource("social_networks", function () {
    this.route("new");
    this.route("edit", { path: '/:social_network_id/edit' });
    this.route("import");
    this.route("join");
  });
  this.resource("social_network", { path: "social_networks/:social_network_id" }, function () {
    this.resource("families", function () {
      this.route("new"); 
    });
  });
});
