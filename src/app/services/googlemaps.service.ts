import { Injectable } from '@angular/core';
import { ConnectivityService } from './connectivity.service';

declare var google: any;

@Injectable({
  providedIn: 'root'
})

export class GooglemapsService {
  online: any;

  mapElement: any;
  pleaseConnect: any;
  map: any;
  marker: any;
  lat = 1.290270;
  lng = 103.851959;
  markertitle: string;
  mapInitialised = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey = 'AIzaSyDhLHwGT1wuZ7aKVGMQJWiTkmStxG8-CjQ';

  constructor(public connectivityService: ConnectivityService) {
   this.connectivityService.isOnline.subscribe((status) => {
     this.online = status;
     if(status) {this.enableMap();}
     else this.disableMap();
    });
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    console.log('INIT');

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }

  async loadGoogleMaps(): Promise<any> {
    console.log('LOADMAPS');
 
    return new Promise((resolve) => {

      if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
 
        console.log('Google maps JavaScript needs to be loaded.');
        console.log('This online ' + this.online);
  //      this.disableMap();

        if (this.online) {
 
        console.log(this.online);
        window['mapInit'] = () => {
 
            this.initMap(this.lat, this.lng, this.markertitle).then(() => {
              resolve(true);
            });
 
            this.enableMap();

          }
        let script = document.createElement("script");
        script.id = "googleMaps";

        if(this.apiKey){
            script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&&libraries=places&callback=mapInit';
          } else {
            script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
          }

          // <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>

        document.body.appendChild(script);
        }
      } else {

        if(this.online) {
        //   this.initMap(this.lat, this.lng, this.markertitle);
         this.enableMap();
        }
        else {
          console.log('isOnline() returns OFFLINE');
        }
 
        resolve(true);
 
      }
 
     // this.addConnectivityListeners();
 
    });
 
  }

  initMap(lat, lng, markertitle): Promise<any> {
    console.log("INITMAP");
    this.lat = lat || this.lat;
    this.lng = lng || this.lng;
    this.mapInitialised = true;
 
    return new Promise((resolve) => {
 
  //    this.geolocation.getCurrentPosition().then((position) => {
      
      let latLng = new google.maps.LatLng(this.lat, this.lng);
 
      let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
      if (this.mapElement) {

          const head: any = document.getElementsByTagName('head')[0];
          const insertBefore = head.insertBefore;
          head.insertBefore = function(newElement: any, referenceElement: any) {
            if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') > -1) {
            console.info('Prevented Roboto from loading!');
            return null;
            }
            insertBefore.call(head, newElement, referenceElement);
            };


          this.map = new google.maps.Map(this.mapElement, mapOptions);
          this.marker = new google.maps.Marker({
              position: latLng,
              map: this.map,
              title: markertitle
            });
        }
      resolve(true);
 
   //   }); 
 
    }); 
 
  }
 
  disableMap(): void {
    console.log('DISABLEMAPS');
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = 'block';
    }
 
  }
 
  enableMap(): void {
    console.log('ENABLEMAPS');
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = 'none';
    }
 
  }

  editLoc(){
    this.marker.setMap(null);
    this.marker = null;
    this.marker = new google.maps.Marker({
      position: {lat: this.lat, lng: this.lng},
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });
  }

  doneEdit(){
    const newLoc = this.marker.getPosition();
    // this.marker.setDraggable(false);
    return newLoc;
  }
}
