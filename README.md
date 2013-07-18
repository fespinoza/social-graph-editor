# Social Graph Editor

This it is my thesis project as Computer Science Engineer at the University of Chile. It is an open source project, so feel free to use, extend and learn from this code.

It is a social network graphs modeling tool to assits researchers that uses the study of social networks in their
respective disciplines and allows them generate this data with a nice interfaces and export it in RDF/N3 format.

Also it has the capability of join social network data from two different users, giving users of this
application a way of interacting with each other and complement their information.

The application is currently running on http://social-graph-editor.herokuapp.com and this is a video explaining how
the app works

<iframe width="560" height="315" src="//www.youtube.com/embed/djEWuTyqOjQ" frameborder="0" allowfullscreen></iframe>

## Development

### Installation for the Development Environment

I have provided a vagrant box with chef recipes to speed up the setup for development, so, 
first you need to install chef in your machine which can be found on [the official vagrant site](http://vagrantup.com),
so the first time you use vagrant and install this project you have to use the following terminal
commands from the vagrant directory of this project

    vagrant up
    vagrant ssh
    cd /sge
    ruby global 1.9.3-p327
    bundle install
    rbenv rehash
    rake db:create; rake db:migrate
    
After that you can run the server with the command

    rails s
    
Which will run the rails server, so you can access the app through the url `http://33.33.33.10:3000`

Now on, every time you want to launch the development enviroment just execute the following commands from
the project's vagrant directory:

    vagrant up
    vagrant ssh
    cd /sge
    rails s

## Notes

* the RDF-N3 gem fail with ruby 2.0 specifically in the RDF::N3::Reader that
  returns nil
