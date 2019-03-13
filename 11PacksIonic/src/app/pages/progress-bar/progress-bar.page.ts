import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.page.html',
  styleUrls: ['./progress-bar.page.scss'],
})
export class ProgressBarPage implements OnInit {

  @Input("progress") progress;

 // progress: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
//    this.progress = +this.route.snapshot.paramMap.get('progress');
  }

}
