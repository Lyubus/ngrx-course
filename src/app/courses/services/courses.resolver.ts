import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { CourseEntityService } from './course-entity.service';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

	constructor(
		private courseEntityService: CourseEntityService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

		return this.courseEntityService.loaded$.pipe(
			tap(loaded => {
				if (!loaded) {
					this.courseEntityService.getAll();
				}
			}),
			filter(loaded => !!loaded),
			first()
		);
	}
}
