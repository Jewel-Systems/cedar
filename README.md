# Cedar UI

## Installation

To get this interface to work, you will need to setup [server](https://github.com/Jewel-Systems/server). The guide to set that up should be in that repo, if not you may contact the owner or me. The [link-server](https://github.com/Jewel-Systems/link-server) will be needed to host my files. The setup instructions are in the `README.md` file of that repo.

To install my repo, cd into the `link-server`, remove the `web` folder, then type the following command:

    git clone https://github.com/Jewel-Systems/front web

after that type:

    npm install

which should install all the dependencies for if you want to make changes. Next you will need to tell the `link-server` where the `public` folder is in my repo by setting the settings using the file I have provided `config_link.json`. To check what the settings are currently on the `link-server`, run the `gradle daemon` in the `link-server` and type in `localhost:200/link/config`.

Change the `config_link.js` file accordingly, such as the details for the main server and also where the `public` folder is located. Then run the script using `nodejs`.

## Simpler Installation

**You won't have the source files included with it.**

Setup the `server` and the `link-server`, then download the zip file or clone the repo. When that is done, just copy the files inside the `public` folder into the web folder in `link-server`.

## Usage

Files locations have been changed to accommodate the [link-server](https://github.com/Jewel-Systems/link-server). I will make sure to maybe make a separate repo or something to accommodate those who want to test the code out.

The repo does not work with XAMPP anymore, you will need to use the [link-server](https://github.com/Jewel-Systems/link-server).

### Watch for changes

After you have installed all dependencies, just type:

    gulp

### Compile code

To manually compile the code, I have created a custom command in `gulp` to do this for you:

    gulp all

## License
This project is developed under the [MIT license](LICENSE)
