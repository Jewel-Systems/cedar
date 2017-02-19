# Cedar UI

## Installation
Make sure that you have `nodejs` installed, then type:

    npm install

## Usage

Files locations have been changed to accommodate the [link-server](https://github.com/Jewel-Systems/link-server). I will make sure to maybe make a separate repo or something to accommodate those who want to test the code out.

The repo does not work with XAMPP anymore, you will need to use the [link-server](https://github.com/Jewel-Systems/link-server).

### Watch for changes

After you have installed all dependencies, just type:

    gulp
    
### Compile code

To manually compile the code, I have created a custom command in gulp to do this for you:

    gulp all

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
- [x] Add a class
- [x] Removing a class
- [x] Getting all classes

### Teacher:
- [x] Reserve Devices
- [x] Loan Device
- [x] Return Device
- [ ] ~~View Lateness Register~~

### Student:
- [ ] ~~Sign Lateness Register~~
- [x] Loan Device
- [x] Return Device

## License
This project is developed under the [MIT license](LICENSE)
