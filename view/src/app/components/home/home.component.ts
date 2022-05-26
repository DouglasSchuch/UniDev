import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { GeneralService } from 'src/app/services/general.service';
import { RouteService } from 'src/app/services/route.service';
import { DBResult } from '../../../../../Common/models/DBResult';
import { Marathon } from '../../../../../Common/models/Marathon';
import { Problem } from '../../../../../Common/models/Problem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  problemsResolved: any[] = [];
  marathonsResolved: any[] = [];

  allProblems: Problem[] = [];
  problems: Problem[] = [];

  allMarathons: Marathon[] = [];
  marathons: Marathon[] = [];

  onlyProblemResolved: boolean = false
  onlyMarathonResolved: boolean = false

  avatarName: string = '?';

  constructor(
    private routeService: RouteService
    , private cdRef: ChangeDetectorRef
    , public app: AppComponent
    , private route: Router
    , public general: GeneralService) { }

  ngOnInit(): void {
    this.initialLoad();
  }

  ngOnDestroy(): void {
    
  }

  initialLoad() {
    this.loadAvatar();
    this.loadProblemsResolveds();
    this.loadMarathonsResolveds();
  }

  loadAvatar() { 
    if (this.general.user) {
      const names: string[] = this.general.user.name.split(' ');
      if (names.length) {
        this.avatarName = names[0][0].toUpperCase();
        if (names.length > 1) {
          this.avatarName += names[names.length - 1][0].toUpperCase();
        }
      }
    }
  }

  loadProblemsResolveds() {
    this.routeService.getProblemsResolvedByUserId(1).subscribe((resultDb: DBResult) => {
      this.problemsResolved = resultDb.data;
      this.loadTime(this.problemsResolved);
      this.loadProblems();
    });
  }

  loadMarathonsResolveds() {
    this.routeService.getMarathonsResolvedByUserId(1).subscribe((resultDb: DBResult) => {
      this.marathonsResolved = resultDb.data;
      this.loadTime(this.marathonsResolved);
      this.loadMarathons();
    });
  }

  loadTime(datas: any) {
    if (datas.length) {
      datas.forEach((data: any) => {
        let minutes = null;
        let seconds = null;
        if (data.time > 59) {
          const calc = data.time / 60;
          minutes = Math.floor(calc);
          seconds = data.time - (minutes * 60);
        } else {
          seconds = data.time;
        }
        const min = this.convertTimePlural(minutes, 'minuto');
        data.__time = min ? `${min} e ${this.convertTimePlural(seconds, 'segundo')}` : `${this.convertTimePlural(seconds, 'segundo')}`;
      });
    }
  }

  convertTimePlural(value: number | null, text: string) {
    return value ? (value === 1 ? `${value} ${text}` : `${value} ${text}s`) : null;
  }

  loadProblems() {
    this.routeService.getProblems().subscribe((resultDb: DBResult) => {
      this.allProblems = resultDb.data;
      this.onProblemToggle(false);
    });
  }

  loadMarathons() {
    this.routeService.getMarathons().subscribe((resultDb: DBResult) => {
      this.allMarathons = resultDb.data;
      this.onMarathonToggle(false);
    });
  }

  clickProblem(problemId: number) {
    this.route.navigateByUrl(`problem/${problemId}`);
  }

  clickMarathon(marathonId: number) {
    this.route.navigateByUrl(`marathon/${marathonId}`);
  }

  onProblemToggle(checked: boolean) {
    this.onlyProblemResolved = checked;
    this.problems = [];
    if (checked) {
      for (let i = 0; i < this.problemsResolved.length; i++) {
        const problem: Problem | undefined = this.allProblems.find((p: Problem) => p.id === this.problemsResolved[i].problemId);
        if (problem) {
          problem.__time = this.problemsResolved[i].__time;
          this.problems.push(problem);
        }
      }
    } else {
      for (let i = 0; i < this.allProblems.length; i++) {
        const problem: any = this.problemsResolved.find((p: any) => p.problemId === this.allProblems[i].id);
        if (!problem) {
          this.problems.push(this.allProblems[i]);
        }
      }
    }
    this.cdRef.detectChanges();
  }

  onMarathonToggle(checked: boolean) {
    this.onlyMarathonResolved = checked;
    this.marathons = [];
    if (checked) {
      for (let i = 0; i < this.marathonsResolved.length; i++) {
        const marathon: Marathon | undefined = this.allMarathons.find((p: Marathon) => p.id === this.marathonsResolved[i].marathonId);
        if (marathon) {
          marathon.__time = this.marathonsResolved[i].__time;
          this.marathons.push(marathon);
        }
      }
    } else {
      for (let i = 0; i < this.allMarathons.length; i++) {
        const marathon: any = this.marathonsResolved.find((p: any) => p.marathonId === this.allMarathons[i].id);
        if (!marathon) {
          this.marathons.push(this.allMarathons[i]);
        }
      }
    }
    this.cdRef.detectChanges();
  }
}