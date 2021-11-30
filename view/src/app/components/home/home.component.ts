import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private share: ShareService, private cdRef: ChangeDetectorRef, public app: AppComponent) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }
}