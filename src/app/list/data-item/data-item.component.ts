import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-data-item',
  templateUrl: './data-item.component.html',
  styleUrls: ['./data-item.component.scss'],
})
export class DataItemComponent implements OnInit {

  id: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('id ####', this.id)
      this.dataService.getData().subscribe(data => {
        console.log('data ####', data)
        let idx = data.findIndex(elem => elem.key === this.id);
        if (idx > -1) {
          console.log('idx > -1')
        } else {
          console.log('go to 404 page.')
          this.router.navigate(['404']);
        }
      });
    });
  }


}
