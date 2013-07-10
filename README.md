# Social Graph Editor

A social network modeling tool, it is my thesis project as Computer Science Engineer at the University of Chile. It is an open source project, so feel free to use, extend and learn from this code.


## Development

### Installation for the Development Environment

I have provided a vagrant box with chef recipes to speed up the setup for development, so, first you need to install chef in your machine which can be found on (the official vagrant site)[http://vagrantup.com], so the first time you use vagrant and install this project you have to use the following terminal commands from the vagrant directory of this project

    vagrant up
    vagrant ssh
    cd /sge
    ruby global 1.9.3-p327
    bundle install
    rbenv rehash
    rake db:create; rake db:migrate
    
After that you can run the server with the command

    rails s
    
Which will run the rails server, so you can access the app through the url `http://localhost:3000`

## Production Enviroment

To create a production environment for this app, once you have installed t

To deploy for the first time you need to execute:

```bash
cap chef:bootstrap
cap chef:solo
cap deploy:setup
cap deploy:cold
```

## Notes

* the RDF-N3 gem fail with ruby 2.0 specifically in the RDF::N3::Reader that
  returns nil
