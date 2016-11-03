# Cedar UI

## Installation
Make sure that you have `nodejs` installed, then type:

    npm install

## Usage
~~You won't need to install nodejs if you only want to use it. Just place these files in the location that you want your server to load the files from, such as htdocs for XAMPP.~~

~~If you are having trouble loading the css, js, and images then it could be because of the path. You can change the base tags to fix that issue in the pug files and some redirects might not work, those will need to be fixed in the js files.~~

Files locations have been changed to accommodate the [link-server](https://github.com/Jewel-Systems/link-server). I will make sure to maybe make a separate repo or something to accommodate those who want to test the code out.

The repo does not work with XAMPP anymore, you will need to use the [link-server](https://github.com/Jewel-Systems/link-server).

## Things that have been done and still needs to be done:
### General User:
- [x] User Login with Email Address and Password
- [x] Login with QR Code and Password
- [x] Logout

### Admin:
- [x] Display Users
- [x] Add Users
- [x] Delete Users
- [ ] Edit Users (Partially)
- [x] Add Device
- [x] Remove Device
- [x] Edit Device
- [x] Create Cards
- [ ] Add a class
- [ ] Removing a class
- [ ] Getting all classes

### Teacher:
- [x] Reserve Devices
- [x] Loan Device
- [x] Return Device
- [ ] View Lateness Register

### Student:
- [ ] Sign Lateness Register
- [x] Loan Device
- [x] Return Device

## License
This project is developed under the [MIT license](LICENSE)
