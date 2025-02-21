import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TrackerService } from 'app/core/tracker/tracker.service';
import { TrackerActivity } from 'app/core/tracker/tracker-activity.model';
import SharedModule from 'app/shared/shared.module';

@Component({
  standalone: true,
  selector: 'jhi-tracker',
  imports: [SharedModule],
  templateUrl: './tracker.component.html',
  styleUrls: ['./fading-table.component.css'],
})
export default class TrackerComponent implements OnInit, OnDestroy {
  activities: TrackerActivity[] = [];
  subscription?: Subscription;

  private trackerService = inject(TrackerService);

  showActivity(activity: TrackerActivity): void {
    let existingActivity = false;

    for (let index = 0; index < this.activities.length; index++) {
      if (this.activities[index].sessionId === activity.sessionId) {
        existingActivity = true;
        if (activity.page === 'logout') {
          this.activities.splice(index, 1);
        } else {
          this.makeMeRedIfWeDifferent(index, activity);
          this.activities[index] = activity;
        }
      }
    }

    if (!existingActivity && activity.page !== 'logout') {
      this.activities.push(activity);
    }
  }

  ngOnInit(): void {
    this.subscription = this.trackerService.subscribe({
      next: (activity: TrackerActivity) => {
        this.showActivity(activity);
      },
    });
    this.trackerService.sendActivity();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  makeMeRedIfWeDifferent(index: number, activity: TrackerActivity) {
    if (!(this.activities[index].userLogin === activity.userLogin)) {
      this.fadeOutCell(activity.sessionId, 0);
    }
    if (!(this.activities[index].ipAddress === activity.ipAddress)) {
      this.fadeOutCell(activity.sessionId, 1);
    }
    if (!(this.activities[index].page === activity.page)) {
      this.fadeOutCell(activity.sessionId, 2);
    }
    if (!(this.activities[index].time === activity.time)) {
      this.fadeOutCell(activity.sessionId, 3);
    }
  }

  fadeOutCell(sessionId: string, cellIndex: number) {
    const cellId = `cell-${sessionId}-${cellIndex}`;
    const cell = document.getElementById(cellId);
    if (cell) {
      cell.classList.remove('fade-out');
      void cell.offsetWidth;
      cell.classList.add('fade-out');
    }
  }
}
