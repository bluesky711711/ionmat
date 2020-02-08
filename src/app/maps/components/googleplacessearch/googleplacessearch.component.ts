import { Component, OnInit, ElementRef, ViewChild, NgZone, Input, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { GooglemapsService } from '../../../services/googlemaps.service';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';

declare var google: any;

@Component({
  selector: 'app-googleplacessearch',
  templateUrl: './googleplacessearch.component.html',
  styleUrls: ['./googleplacessearch.component.scss'],
})
export class GoogleplacessearchComponent implements OnInit, AfterViewInit {

  @Input() searchForm: FormGroup;
  @Input() predictions: Array<any>;

  @ViewChild('addresstext', {static: false}) addresstext: ElementRef;
  @ViewChild('pleaseConnect', {static: false}) pleaseConnect: ElementRef;
  @ViewChild(AutocompleteComponent, {static: false}) child;

  triggerAutocomplete() {
    this.child.open('autoCompleteInput');
 }


  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  geocoderService: any;
  query: string;
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean = false;
  location: any;
  address_components: any = [];
  geocoded_address: any;
  showsearch: boolean;

  constructor(public maps: GooglemapsService,
              public zone: NgZone
              ) { }

  ngOnInit() {}


ngAfterViewInit() {
 const mapLoaded = this.maps.init(this.addresstext.nativeElement, this.pleaseConnect.nativeElement).then(() => {

    this.autocompleteService = new google.maps.places.AutocompleteService();
    this.placesService = new google.maps.places.PlacesService(this.maps.map);
    this.geocoderService = new google.maps.Geocoder();
    this.searchDisabled = false;
  });

}
  searchPlace() {
    this.saveDisabled = true;

    this.searchForm.controls.locSearch.valueChanges.subscribe(query => {
    console.log(query);
    if (query.length > 1 && !this.searchDisabled) {

      const config = {
                types: ['geocode'],
                input: query
            };

      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

                if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                    this.places = [];

                    predictions.forEach((prediction) => {
                        this.places.push(prediction);
                        console.log(this.places);
                        this.triggerAutocomplete();
                    });
                        this.triggerAutocomplete();
                } else {

                }

            });

        } else {
        this.places = [];
    }
    });
}

}


/*

selectPlace(place) {
  console.log(place);

  const location = {
        lat: null,
        lng: null,
        name: place.name,
        street_number: '',
        route: '',
        address: '',
        faddress: '',
        address_components: [],
        geocoded_address: '',
        city: '',
        region: '',
        postal_code: '',
        country: '',
        neighborhood: '',
        sublocality_level_1: '',
        sublocality_level_2: '',
        sublocality_level_3: '',
        first_address2: '',
        last_address2: '',
        address2: '',
    };

  this.placesService.getDetails({placeId: place.place_id},  (details) => {

        this.zone.run(() => {

            location.address_components = details.address_components;
            location.name = details.name;
            location.lat = details.geometry.location.lat();
            location.lng = details.geometry.location.lng();

            this.saveDisabled = false;

            });

        details.address_components.map(addressObject => {

                if (addressObject['types'][0] === 'postal_code') {
                    location.postal_code = addressObject.long_name;
                }

                if (addressObject['types'][0] === 'country') {
                    location.country = addressObject.long_name;
                }

                if ((addressObject['types'][0] === 'locality') || (addressObject['types'][0] === 'postal_town')) {
                    location.city = addressObject.long_name;
                }

                if (addressObject['types'][0] === 'street_number') {
                    location.street_number = addressObject.long_name;
                }

                if (addressObject['types'][0] === 'route') {
                    location.route = addressObject.long_name;
                }

                if (addressObject['types'][0] === 'administrative_area_level_1') {
                    location.region = addressObject.long_name;
                }

                if (addressObject['types'][0] === 'sublocality_level_1') {
                    location.sublocality_level_1 = addressObject.long_name;
                }

                if (addressObject['types'][0] === 'sublocality_level_2') {
                    location.sublocality_level_2 = addressObject.long_name;
                }

                if (addressObject['types'][0] === 'sublocality_level_3') {
                    location.sublocality_level_3 = addressObject.long_name;
                }

                if (addressObject['types'][0] === 'neighborhood') {
                    location.neighborhood = addressObject.long_name;
                }

            });

        const address2Array = [];

        if ((location.neighborhood !== '')) {
                    address2Array.push(location.neighborhood);
                }

        if ((location.sublocality_level_3 !== '')) {
                    address2Array.push(location.sublocality_level_3);
                }

        if ((location.sublocality_level_2 !== '')) {
                    address2Array.push(location.sublocality_level_2);
                }

        if ((location.sublocality_level_1 !== '')) {
                    address2Array.push(location.sublocality_level_1);
                }

        location.address2 = address2Array.join(', ').trim();

        this.location = location;

            // Clear search bar

        this.searchForm.controls.locSearch.setValue('');
        this.searchForm.controls.locSearch.updateValueAndValidity();

            // Write value to controls


/*
        this.addressForm.controls.location_name.setValue(location.name);
        this.addressForm.controls.street_address.setValue(location.street_number + ' ' + location.route);
        this.addressForm.controls.address2.setValue(location.address2);
        this.addressForm.controls.city.setValue(location.city);
        this.addressForm.controls.region.setValue(location.region);
        this.addressForm.controls.postal_code.setValue(location.postal_code);
        this.addressForm.controls.country.setValue(location.country); */
   //     });
// }
