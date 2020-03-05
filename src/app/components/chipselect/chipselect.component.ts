import { Component, ViewChild, ChangeDetectorRef, Input, EventEmitter, Output, OnInit, ViewChildren, QueryList, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';

import { ChipautocompleteComponent } from './autocomplete/chipautocomplete.component';

import { ChipserviceService } from './chipservice.service';

@Component({
  selector: 'app-chipselect',
  providers: [ChipserviceService],
  templateUrl: './chipselect.component.html',
  styleUrls: ['./chipselect.component.scss']
})
export class ChipselectComponent implements OnInit {

  @Input() chipoptions: Array<string>;

  @Input() maxNumber: number;

  @Input() config;

  @Output() selectedOption = new EventEmitter<any>();

  @Output() trackSelected = new EventEmitter<any>();

  @Output() addTrackClicked = new EventEmitter<any>();

  @ViewChild(ChipautocompleteComponent, {static: false }) child;

  trackAutoCompleteInput: MatAutocompleteTrigger;

  public hasOptions = false;
  public showChild = false;
  public removeAvailable = true;
  public selectedOptions = [];
  public currentItem: any;

  public label: string;
  public editlabel: string;
  public options: Array<any>;

  focus: boolean;

  constructor(public chipservice: ChipserviceService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {

    // Parse config

    this.label = this.config.label;
    this.editlabel = this.config.editlabel;
    const optionsArray = [];
    this.chipoptions.forEach(chip => {
      optionsArray.push(chip[this.config.display_field]);
    });

    this.options = optionsArray;

    this.chipservice.newSelectedOptions.next(this.selectedOptions);
    this.chipservice.newSelectedOptions.subscribe(selectedoptions => {
      this.selectedOptions = selectedoptions;
      if (this.child) {
        // timeout to wait until all DOM events finish execution
        setTimeout(
          () => this.child.updatePosition(), 
          50);
      }
    });
    this.focus = false;
  }

  ionViewWillLeave() {
    this.child.close();
  }
  selectPrediction(prediction) {
   this.selectedOption.emit(prediction);
  }

  open() {
    this.trackAutoCompleteInput.openPanel();
  }

  addTrack(i) {
    this.addTrackClicked.emit();
    this.trackSelected.emit(i);
  }

  emitAddTrack() {
   this.addTrackClicked.emit();
  }

  searchOptions(ev:any) {
    ev.stopPropagation();
    this.triggerAutocomplete();
  }

  triggerAutocomplete() {
     this.child.open();
  }

  optionSelected(ev: any) {

    if(this.maxNumber === 1){
      if(this.selectedOptions.length > 0){
        console.log('current item', this.selectedOptions[0]);
        this.currentItem = this.selectedOptions[0];
      }
      this.selectedOptions.pop();
      this.removeAvailable = true;
      this.selectedOptions.push(ev);
      this.hasOptions = true;
      this.chipservice.newSelectedOptions.next(this.selectedOptions);

    } else if(this.selectedOptions.length === this.maxNumber){
      this.removeAvailable = false;
      return;
    } else {
      this.removeAvailable = true;
      this.selectedOptions.push(ev);
      this.hasOptions = true;
      this.chipservice.newSelectedOptions.next(this.selectedOptions);
    }
  }

  optionRemoved( i:any, item:any ) {
    this.options.push(item); 
    this.selectedOptions.splice(i, 1);
    if(this.selectedOptions.length === 0){
      this.hasOptions = false;
    }
    this.chipservice.newSelectedOptions.next(this.selectedOptions);
  }
  addOptionClicked(){
    this.addTrackClicked.emit();
  }
  removeSelection(ev:any){

    if(!this.removeAvailable){
      return;
    }
    // remove object
    let removeIndex = this.options.map(function(item:any) { return item.id; }).indexOf(ev.id);
    if(this.maxNumber == 1){
      this.options.splice(removeIndex, 1);
      if(this.currentItem){
        this.options.push(this.currentItem);
        this.currentItem  = null;
      }

    } else {
      this.options.splice(removeIndex, 1);
    }
  }

  toggleFocus() {
    this.showChild = !this.showChild;
  }

  openCloseOptions(event) {
    event.stopPropagation();
    if (this.showChild) {
      this.child.close();
    } else {
      this.child.open();
    }
  }

  openCloseChild(b: boolean) {
    if (b == false) {
      window.setTimeout(()=> {
        this.showChild = false;
        this.changeDetector.detectChanges();
      }, 100)

    } else {
      this.showChild = b;
    }

    this.changeDetector.detectChanges();
  }

}
