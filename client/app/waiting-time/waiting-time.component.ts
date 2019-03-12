import { Component, Input, OnInit } from "@angular/core";
import { timer } from 'rxjs';

@Component({
  selector: 'app-waiting-time',
  templateUrl: './waiting-time.component.html',
  styleUrls: ['./waiting-time.component.css']
})
export class WaitingTimeComponent implements OnInit {

    waitingTime: string;
    excessiveWaitingTime: boolean = false;

    @Input() createdTime: string;

    ngOnInit(){
        //timer set to call get waiting time every second
        timer(0,1000).subscribe(() => this.getWaitingTime());
    }

    /**
     * Calculates time difference between current time and created time
     */
    getWaitingTime(){
        let createdTime = new Date(this.createdTime).getTime();
        let currentTime = new Date().getTime();

        let secondsDifference = (currentTime - createdTime) / 1000;

        //check if time is over 15 minutes
        if(secondsDifference > 900) {
            this.excessiveWaitingTime = true;
        }

        let date = new Date(null);
        date.setSeconds(secondsDifference);

        //format time to mm:ss
        this.waitingTime = date.toISOString().substr(14, 5);
    }

}
