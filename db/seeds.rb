social_network = SocialNetwork.first || SocialNetwork.create({name: "DCC"})

Family.delete_all
families = []
families_params = [
  { name: "Student", color: "#1f77b4", kind: "Actor" },
  { name: "Academic", color: "#ff7f0e", kind: "Actor" },
  { name: "Graduated", color: "#2ca02c", kind: "Actor" },
  { name: "Thesis Project", color: "#d62728", kind: "Relation" },
  { name: "Publication", color: "#9467bd", kind: "Relation" },
]
families_params.each do |family|
  families << social_network.families.create(family)
end

Node.delete_all
actors = []
actors_params = [
  { name: "Miguel Campusano", x: 396, y: 101, kind: "Actor" },
  { name: "Camilo Garrido", x: 851, y: 379, kind: "Actor" },
  { name: "Felipe Espinoza", x: 640, y: 194, kind: "Actor" },
  { name: "Pablo Estefo", x: 178, y: 332, kind: "Actor" },
  { name: "Mauricio Quezada", x: 501, y: 329, kind: "Actor" },
  { name: "Claudio Gutierrez", x: 1113, y: 105, kind: "Actor" },
  { name: "Johan Fabry", x: 152, y: 74, kind: "Actor" },
  { name: "Camilo Garrido", x: 738, y: 26, kind: "Actor" },
]
actors_params.each do |actor|
  actors << social_network.nodes.create(actor)
end

actors[0].families = [families[0], families[2]]
actors[1].families = [families[0], families[2]]
actors[2].families = [families[0]]
actors[3].families = [families[0]]
actors[4].families = [families[0], families[2]]
actors[5].families = [families[1]]
actors[6].families = [families[1]]
actors[7].families = [families[0], families[2]]
