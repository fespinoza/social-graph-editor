SocialNetwork.delete_all

social_networks = [
  SocialNetwork.create(name: "Githubbers"),
  SocialNetwork.create(name: "Politicos Chilenos"),
  SocialNetwork.create(name: "Herald Beyer"),
  SocialNetwork.create(name: "Amigos")
]

Actor.delete_all
actors = [
  social_networks[0].actors.create({name: "Tom Preston-Werner", x: 100, y: 200}),
  social_networks[0].actors.create({name: "Scott Chacon", x: 500, y: 200}),
  social_networks[0].actors.create({name: "Zach Holmann", x: 300, y: 350}),
]

Relation.delete_all
social_networks[0].relations.create({name: "Hired", actors: [actors[0], actors[1]] })
social_networks[0].relations.create({name: "Hired", actors: [actors[0], actors[2]] })
