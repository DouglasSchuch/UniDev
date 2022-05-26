import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from 'src/app/services/route.service';
import { ShareService } from 'src/app/services/share.service';
import { Marathon } from '../../../../../Common/models/Marathon';
import { DBResult } from '../../../../../Common/models/DBResult';
import { Problem } from '../../../../../Common/models/Problem';
import { GeneralService } from 'src/app/services/general.service';
import { RunMarathon } from '../../../../../Common/models/Run';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-marathon',
  templateUrl: './marathon.component.html',
  styleUrls: ['./marathon.component.scss']
})
export class MarathonComponent implements OnInit, OnDestroy, AfterViewInit {
  marathon: Marathon | null = null
  resolved: Problem[] = [];
  notResolved: Problem[] = [];

  constructor(
    private app: AppComponent
    , private share: ShareService
    , private cdRef: ChangeDetectorRef
    , private routeService: RouteService
    , private activatedRoute: ActivatedRoute
    , private general: GeneralService
    , private route: Router
    ) { }

  ngOnInit(): void {
    this.share.onBackPage.subscribe((page: string) => {
      console.log('page ===> ', page);
    });
  }
  
  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        console.log('NÃO EXISTE ID, ERRO')
        return;
      }
      this.routeService.getMarathonById(id).subscribe((resultDb: DBResult) => {
        if (!resultDb.data) {
          console.log('ID NÃO ENCONTRADO, ERRO');
          return;
        }
        this.convertMarathonData(resultDb.data);
        console.log('marathons -> ', this.marathon);
      })
    });
  }

  ngOnDestroy(): void {
    
  }

  convertMarathonData(data: any) {
    this.marathon = null;
    this.marathon = new Marathon(data.id, data.name, data.description, data.createdUserId, data.duration, data.password, data.isActive);
    this.marathon.createdUser = data.createdUser || null;
    if (this.general.user) {
      this.routeService.getMarathonByUserProblemsStatus(data.id, this.general.user.id).subscribe((resultDb: DBResult) => {
        if (!resultDb.data?.length) {
          // não encontrado
        }
        this.resolved = resultDb.data[0].resolved;
        this.notResolved = resultDb.data[0].notResolved;
        this.cdRef.detectChanges();
      });
    }
    // if (data.marathonProblems?.length) {
    //   data.marathonProblems.forEach((mp: any) => {
    //     if (mp.problem) {
    //       this.marathon?.problems.push(<Problem>mp.problem);

    //     }
    //   });
    // }
  }

  selectProblem(problemId: number) {
    this.route.navigateByUrl(`marathon/${this.marathon?.id}/problem/${problemId}`);
  }

  confirm() {
    if (!this.notResolved.length && this.marathon) {
      this.routeService.confirmMarathon(new RunMarathon(1, this.marathon.id)).subscribe((resultDb: DBResult) => {
        if (!resultDb.validated) {
          console.log('ERRO');
          return;
        }
        this.app.onBackPage();
      });
    }
  }
}