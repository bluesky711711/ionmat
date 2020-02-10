import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})

export class GooglemapsService {
  online: any;

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey = 'AIzaSyDhLHwGT1wuZ7aKVGMQJWiTkmStxG8-CjQ';

  constructor() {
   // this.connectivityService.isOnline.subscribe((status) => {
   //   this.online = status;});
   this.online = true;
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
 
            this.initMap().then(() => {
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
          this.initMap();
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

  initMap(): Promise<any> {
    console.log("INITMAP");
 
    this.mapInitialised = true;
 
     return new Promise((resolve) => {
 
  //    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(1.290270, 103.851959);
 
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        this.map = new google.maps.Map(this.mapElement, mapOptions);
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
