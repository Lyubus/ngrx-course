import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {Observable, of} from 'rxjs';
import {Lesson} from '../model/lesson';
import {concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import { LessonEntityService } from '../services/lessson-entity.dervice';
import { CourseEntityService } from '../services/course-entity.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;

  loading$: Observable<boolean>;

  lessons$: Observable<Lesson[]>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  constructor(
    private lessonEntityService: LessonEntityService,
    private courseEntityService: CourseEntityService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {

    const courseUrl = this.route.snapshot.paramMap.get("courseUrl");

    this.course$ = this.courseEntityService.entities$.pipe(
      map(cources => cources.find(course => course.url === courseUrl))
    );

    this.lessons$ = of([]);
  }


  loadLessonsPage(course: Course) {

  }

}
