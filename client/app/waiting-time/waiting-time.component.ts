import { Component, Input, OnInit } from "@angular/core";
import { timer } from 'rxjs';

@Component({
  selector: 'app-waiting-time',
  templateUrl: './waiting-time.component.html',
  styleUrls: ['./waiting-time.component.css']
})
export class WaitingTimeComponent implements OnInit {

    /**
     * Time elapsed since created time
     */
    waitingTime: string;

    /**
     * Flags whether more than 15 minutes have passed since created time
     */
    excessiveWaitingTime: boolean = false;

    /**
     * Timestamp of created time
     */
    @Input() createdTime: string;

    /**
     * Creates and subscribes to an Observable timer to update waiting time
     * every second
     */
    ngOnInit(){
        timer(0,1000).subscribe(() => this.getWaitingTime());
    }

    /**
     * Calculates time difference between current time and created time
     */
    getWaitingTime(){
        let createdTime = new Date(this.createdTime).getTime();
        let currentTime = new Date().getTime();

        let diff = (currentTime - createdTime) / 1000;

        //check if time is over 15 minutes
        if(diff > 900) {
            this.excessiveWaitingTime = true;
        }
        
        let minutes = ('0' + Math.floor(diff / 60)).slice(-2);
        let second = ('0' + Math.floor(diff % 60)).slice(-2);

        //format time to mm:ss
        this.waitingTime = `${minutes}:${second}`;
    }

}
