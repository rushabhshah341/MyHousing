# PropertyPortal
Property Listing portal

# MyHousing (https://github.com/rushabhshah341/MyHousing)

MyHousing is build on top of meanjs(meanjs.org) the propertyportal for TEAM project for Software Engineering Class.


### Prerequisites ###

* MongoDB 3.2
ds155634.mlab.com:55634
User:admin
pass:admin


# both version
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org
```

* Node.js 6.x LTS

note: please use the following way to install node.js into ubuntu  


# Update npm
$ sudo npm install -g npm

# Install build essentials
$ sudo apt-get install -y build-essential

```
* Git

```shell
$ sudo apt-get install -y git
```

### Install ###

1. Install Development Tools (yo, bower, and grunt)
```shell
$ npm install --global yo bower grunt-cli phantomjs-prebuilt
```

2. Download MyHousing from git  
```shell
$ git clone https://github.com/rushabhshah341/MyHousing.git
```

3. Install Server-side Packages
```shell
$ npm install
```

4. Install Client-side Packages  
```shell
$ bower install
```
5. Configure server settings (v6.10+)

  Version 6.10 introduces (temporarily) a settings.js file controlling mandatory and non mandatory settings such as username case sensibility for login. See settings.sample.js for an example file. 

### Run ###

1. run mongodb
```shell
$ sudo service mongod start
you can use ROBOMOngo as well for that
```

2. run MyHousing server  
```shell
$ node server.js

```sh
$ npm install --save multer
```


