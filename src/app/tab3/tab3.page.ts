import {Component, Input, OnInit} from '@angular/core';
import {HealthService} from '../api/health.service';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

    status: string;

    constructor(private healthService: HealthService) {
    }

    ngOnInit(): void {
        this.healthService.status().subscribe(
            (status) => this.status = status
        );
    }
}
