# LondonMap

LondonMap is a responsive web application that helps people discover places around [City, University of London](https://en.wikipedia.org/wiki/City,_University_of_London). A live version of the application can be found at [londonmap.tk](http://www.londonmap.tk)

img

This project is part of Udacity's Full Stack Web Developer Nanodegree Program. [Knockout JavaScript framework](http://www.knockoutjs.com) is used as an implementation of the Model-View-ViewModel pattern. [Google Maps APIs](https://developers.google.com/maps/) are used to get and view information about several places on map. Additionally, [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) is used to get articles relevant to these places.

# Documentation

The information included in this documentation is as follows:

- [Tested Browsers](#tested-browsers)
- [Tested Devices](#tested-devices)
- [Quick Start](#quick-start)
- [Create your own XMap](#create-your-own-xmap)
- [What is included](#what-is-included)
- [License](#license)


## Tested Browsers

LondonMap was tested on Chrome 61.0.3163.31 beta (64-bit) and Opera 46.0.2597.57 (64-bit).

Kindly report any browser incompatibilities by sending [me](mailto:ahmadnagib@fci-cu.edu.eg) an email.

## Tested Devices

This web application was tested on Google Nexus 6p, Nexus 5, HUAWEI MediaPad M3, iPad, Samsung Galaxy S Duos 2 and Toshiba Satellite L855-B511.

Kindly report any device incompatibilities by sending [me](mailto:ahmadnagib@fci-cu.edu.eg) an email.

## Quick start

1. The [project's files](https://github.com/ahmadnagib/LondonMap) should be downloaded and extracted together in one folder.
2. It is recommended to add this folder as a website on a local host server. Internet Information Services (IIS) Manager on Windows can be used to do so for instance. This will simulate the application's behaviour in a more realistic way. 
3. The default LondonMap application can also be viewed by simply openning the `index.html` file using any web browser.
4. To check the responsiveness of the page, it is recommended to use DevTools of the Google Chrome Web Browser.

## Create your own XMap

+ The application can simply be switched to another neighbourhood by editing the locations list found in the `model.js` file. The longitude and latitude of a certain place can be found with the help of the [Google Maps API Geocoder Tool](https://google-developers.appspot.com/maps/documentation/utils/geocoder/).

+ Additionally, The style to be used in creating the Google Map can be changed by editing the `mapStyles` object found in the `mapview.js` file. The one already there was created on my own with the help of the great [Google Maps APIs Styling Wizard](https://mapstyle.withgoogle.com/).

+ You would probably need to set a new center for the `map` object and that's all. By that time you will have a totally new application for a new neighbourhood of interest.

+ All the used icons where downloaded from the great [icons8 website](https://icons8.com). In case you want to change the used icons you will have to change the url of `defaultIcon` and the `highlightedIcon` in the `mapview.js` file.

+ Additionally, you will probably have to replace the `src` in the `img` tag found in the `index.html` file. This will facilitate the customization of the Navigation Menu Icon.

## What is included

Within the download you will find the following files:

```
LondonMap-master/
├── img/
    ├── default.png
    ├── highlighted.png
    ├── nav_icon.png
├── js/
    ├── lib
        ├── jquery.min.js
        ├── knockout-3.4.2.js
    ├── mapview.js
    ├── model.js
    ├── viewmodel.js
├── styles/
    ├── main.css
├── index.html
├── LICENSE
├── README.md
```

## License

LondonMap is Copyright © 2017 Ahmad Nagib. It is free software, and may be redistributed under the terms specified in the [LICENSE](/LICENSE) file.
