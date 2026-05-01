Okay this is the setup text file used for the backend side of things, I will be writing for both linux and window user in this text file on how to setup the environment 
First of all: I assume everyone is using VSCODE IDE so it's easier 

For Linux:
- On your host machine, make sure you have python3 installed along with pipenv 
- Once you're done, for management, create a folder to store all the project work within in. Then download the stuff from github and put it in there
- CD or go into the directory and open a terminal in there and type in 
    python3 -m venv venv (the last argument can be replaced with any names you want but I am using "venv" for now)
- Go to your vscode IDE and install python on it as well.
- Next ctrl + shift + p and use "select interpreter"
- Go into /venv/bin/python to start using the environment
- your terminal should look like  (venv) host@host:...... (host is the name of your machine)
- If you have the (venv) it means it's working
- There will be a requirement.txt that shows all the packages you need to install 
- you can install it by using pip install -r requirement.txt (the last argument is the location of the requirement text file)
- Once you have all the needed packages you can start hosting the server using  
    python3 manage.py runserver 9000 (the port 9000 can be swapped to any other port to your liking)
- ctrl + click on the local host link to go to the site to see if it's working
- A list of API should be given to you 

For window:
- On your host machine, make sure you have python3 installed along with pipenv, however for window there's a thing called pipex, please do research on that 
- Once you're done, for management, create a folder to store all the project work within in. Then download the stuff from github and put it in there
- CD or go into the directory and open a terminal in there and type in 
    python3 -m venv venv (the last argument can be replaced with any names you want but I am using "venv" for now)
- Go to your vscode IDE and install python on it as well.
- Next ctrl + shift + p and use "select interpreter"
- Go into /venv/script/python to start using the environment (THE ONLY DIFFERENT BETWEEN WINDOW AND LINUX)
- your terminal should look like  (venv) host@host:...... (host is the name of your machine)
- If you have the (venv) it means it's working
- There will be a requirement.txt that shows all the packages you need to install 
- you can install it by using pip install -r requirement.txt (the last argument is the location of the requirement text file)
- Once you have all the needed packages you can start hosting the server using  
    python3 manage.py runserver 9000 (the port 9000 can be swapped to any other port to your liking)
- ctrl + click on the local host link to go to the site to see if it's working
- A list of API should be given to you 